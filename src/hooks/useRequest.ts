import { ref } from "vue";
import { withDebounce, withThrottle } from "@/utils/index";
interface IOptions<TData, TParams> {
  defaultParams: TParams;
  manual: boolean;
  loadingDelay: number;
  debounceTime: number;
  throttleTime: number;
  retryTimes: number;
  onSuccess: (data: TData | undefined, params: TParams | undefined) => void;
  onError: (err: any, params: TParams | undefined) => void;
  onFinally: (params: TParams | undefined, data?: TData) => void;
}

export function useRequest<TData, TParams extends any[]>(
  request: (...parmas: TParams) => [() => Promise<TData>, () => void],
  options: Partial<IOptions<TData, TParams>> = {}
) {
  const {
    manual,
    defaultParams,
    loadingDelay = 100,
    retryTimes,
    throttleTime,
    debounceTime,
    onSuccess,
    onError,
    onFinally,
  } = options;
  const pendingCount = ref<number>(0);
  const retry = ref<number>(0);
  const timer = ref<NodeJS.Timeout>();
  const loading = ref<boolean>(false);
  const data = ref<TData>();
  let cancelFn: (() => void) | null;
  async function run(...params: TParams) {
    return new Promise(async (resolve, reject) => {
      try {
        if (loadingDelay) {
          timer.value = setInterval(() => {
            pendingCount.value += 1;
            if (pendingCount.value > loadingDelay) loading.value = true;
          });
        } else {
          loading.value = true;
        }
        const [init, stop] = request(...params);
        cancelFn = stop;
        const result = await init();
        data.value = result;
        onSuccess && onSuccess(result, params);
        return resolve(result);
      } catch (error) {
        onError && onError(error, params);
        if (!retryTimes) return reject(error);
        if (retry.value < retryTimes) {
          retry.value += 1;
          run(...params);
        }
      } finally {
        onFinally && onFinally(params, data.value);
        loading.value = false;
        timer.value && clearInterval(timer.value);
      }
    });
  }

  function cancel() {
    cancelFn && cancelFn();
    cancelFn = null;
  }

  if (!manual) {
    run(...((defaultParams || []) as TParams));
  }

  const throttleFn = withThrottle(run, throttleTime);

  const debounceFn = withDebounce(run, debounceTime);

  return { data, run, loading, cancel };
}

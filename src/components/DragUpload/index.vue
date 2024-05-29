<template>
  <div ref="dragUploadRef" class="drag-upload">
    <t-loading :loading="loading" size="small" class="w-100%">
      <div class="drag-upload-content" @click="triggerUpload">
        <template v-if="!modelValue.length">
          <div class="upload-icon mb-8px no-pointer-event">
            <svg-icon local-icon="upload-light" class="text-32px" />
          </div>
          <p class="upload-guidance themed-text text-14px no-pointer-event">
            <template v-if="!isDragOver">
              <span>将文件拖到此处，或&nbsp;</span>
              <span class="trigger-text">点击上传</span>
            </template>
            <template v-else>
              <span>释放文件进行上传</span>
            </template>
          </p>
          <p v-if="extraTip" class="extra-tip no-pointer-event">
            {{ extraTip }}
          </p>
        </template>
        <ul
          v-for="(file, index) in modelValue"
          v-else
          :key="index"
          class="file-list"
        >
          <li class="file-item">
            <span class="file-item-name" :title="file.name">{{
              file.name
            }}</span>
            <span class="delete-icon"
              ><svg-icon
                local-icon="delete"
                class="text-16px"
                @click.stop="deleteFile(file, index)"
            /></span>
          </li>
        </ul>
        <div v-if="progress && progress !== 100" style="width: 80%">
          <t-progress :percentage="progress" />
        </div>
      </div>
    </t-loading>
    <input
      v-show="false"
      ref="uploadRef"
      type="file"
      :accept="accept"
      :multiple="multiple"
      @change="fileChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { message } from "ant-design-vue";
import {
  defineEmits,
  defineProps,
  onBeforeUnmount,
  onMounted,
  ref,
  withDefaults,
} from "vue";
import { FileItem } from "./type";

const isDragOver = ref<boolean>(false);
const loading = ref<boolean>(false);
const uploadRef = ref();
const controllerRef = ref<AbortController | null>();
const progress = ref<number | null>();
const dragUploadRef = ref();
const emit = defineEmits<{
  (event: "update:modelValue", fileList: FileItem[]): void;
  (event: "remove", file: FileItem): void;
}>();
const props = withDefaults(
  defineProps<{
    extraTip?: string;
    action: (
      files: FileList,
      cb?: (val: number) => void,
      setController?: (controller: AbortController) => void
    ) => Promise<any>;
    accept?: string;
    beforeUpload?: (files: FileList) => boolean;
    multiple?: boolean;
    modelValue?: FileItem[];
    offline?: boolean;
  }>(),
  {
    multiple: false,
    accept: "*",
    modelValue: () => [],
    offline: false,
  }
);

onMounted(() => {
  const dragEl = dragUploadRef.value;
  dragEl.addEventListener("dragover", handelDragOver);
  dragEl.addEventListener("dragleave", handelDragleave);
  dragEl.addEventListener("drop", handleDrop);
});

onBeforeUnmount(() => {
  const dragEl = dragUploadRef.value;
  dragEl.removeEventListener("dragover", handelDragOver);
  dragEl.removeEventListener("dragleave", handelDragleave);
  dragEl.removeEventListener("drop", handleDrop);
  if (controllerRef.value) controllerRef.value.abort();
  isDragOver.value = false;
  loading.value = false;
  progress.value = null;
  controllerRef.value = null;
});

function setController(controller: AbortController) {
  controllerRef.value = controller;
}

async function handleDrop(e: DragEvent) {
  e.preventDefault();
  const files = e?.dataTransfer?.files as FileList;
  isDragOver.value = false;
  handelUpload(files);
}

function triggerUpload() {
  uploadRef.value.value = null;
  uploadRef.value.click();
}

function fileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const files = target.files as FileList;
  handelUpload(files);
}

async function handelUpload(files: FileList) {
  if (!files || !files.length) return;

  if (!props.multiple && files.length > 1) {
    message.error("请上传单个文件");
    return;
  }

  // 上传前检查
  if (props.beforeUpload) {
    const result = props.beforeUpload(files);
    if (!result) return;
  }

  function progressCallback(val: number) {
    progress.value = val;
  }

  // 执行上传任务
  try {
    loading.value = true;
    if (!props.action) throw new Error("please set action prop");
    await props.action(files, progressCallback, setController);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
    uploadRef.value.value = null;
    progress.value = null;
  }
}

// 删除文件
function deleteFile(file: FileItem, index: number) {
  const files = [...props.modelValue];
  files.splice(index, 1);
  emit("update:modelValue", files);
  emit("remove", file);
}

function handelDragleave(e: DragEvent) {
  e.preventDefault();
  isDragOver.value = false;
}

function handelDragOver(e: DragEvent) {
  e.stopPropagation();
  e.preventDefault();
  isDragOver.value = true;
}

defineExpose({ triggerUpload });
</script>

<style lang="less" scoped>
.drag-upload {
  user-select: none;
  width: 100%;
  .upload-icon {
    color: var(--td-brand-color);
  }
  .drag-upload-content {
    width: 100%;
    cursor: pointer;
    min-width: 200px;
    min-height: 130px;
    border: 1px dashed var(--td-brand-color);
    &:hover {
      border: 1px dashed var(--td-brand-color-8);
    }
    border-radius: 4px;
    padding: 21.5px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    overflow-y: auto;
  }
  .upload-guidance {
    text-align: center;
  }
  .extra-tip {
    font-size: 11px;
    color: var(--theme-gray-color-2);
    text-align: center;
  }
  .trigger-text {
    color: var(--td-brand-color);
  }
  .no-pointer-event {
    pointer-events: none;
  }
  .file-list {
    width: 80%;
    .file-item {
      padding: 2px 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .file-item-name {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .delete-icon {
        margin-left: 10px;
      }
      &:hover {
        color: var(--td-brand-color);
        .delete-icon {
          color: var(--td-brand-color) !important;
        }
      }
    }
  }
}
</style>

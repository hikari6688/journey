import { request } from "@/utils/axios";
import { IGetCityesParams, TCityesData } from "./app.d";
export function getCityes(id: number) {
  return request<TCityesData, IGetCityesParams>({
    url: "/citymenu",
    method: "get",
    params: { id },
  });
}

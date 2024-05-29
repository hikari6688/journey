export interface IGetCityesParams {
  id: number;
}
interface ICityesData {
  firstchar: string;
  id: string;
  name: string;
}
export type TCityesData = ICityesData[];

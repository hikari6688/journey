import { defineStore } from "pinia";

export interface Bill {
  id: string;
  name: string;
  amount: number;
}
export interface CashbookState {
  bill: Bill[];
}
const useCashbookStore = defineStore("cashbook", {
  state: (): CashbookState => {
    return { bill: [] };
  },
  actions: {
    addBill(data: Bill) {
      this.bill.push(data);
    },
    removeBill(id: string) {
      const index = this.bill.findIndex((item) => item.id === id);
      if (index !== -1) this.bill.splice(index, 1);
    },
  },
});
export default useCashbookStore;

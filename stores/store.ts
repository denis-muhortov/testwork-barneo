import { defineStore } from "pinia";
import { type Post } from "../interface/interface";

export const useAppStore = defineStore("store", {
  state: () => ({
    posts: [] as Array<Post>,
    pagination: {
      page: 1 as number,
      limit: 8 as number,
      pageCount: 5 as number,
      total: 61 as number,
    },
  }),
  getters: {

  },
  actions: {

  },
});
import { defineStore } from "pinia";
import { type Post } from "../interface/interface";

export const useAppStore = defineStore("store", {
  state: () => ({
    posts: [] as Array<Post>,
    pagination: {
      page: 1 as number,
      limit: 20 as number,
    },
  }),
  getters: {

  },
  actions: {

  },
});
// /store/user.js

import axios from "axios";
import { defineStore } from "pinia";
import { useUserStore } from "./user";

const user = useUserStore();

export const useTaskListStore = defineStore("taskList", {
  state: () => ({
    taskList: [],
  }),

  actions: {
    getTaskList() {
      return this.taskList;
    },
    async fetchTaskList() {
      const token = user.getToken();
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      await axios
        .get("https://tasks.googleapis.com/tasks/v1/users/@me/lists", config)
        .then((res) => {
          const items = res.data.items;
          this.taskList = items;
        })
        .catch((err) => {
          return err;
        });
    },
  },
});

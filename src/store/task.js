// /store/user.js

import axios from "axios";
import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { useTaskListStore } from "./taskList";
const user = useUserStore();
const taskList = useTaskListStore();

export const useTaskStore = defineStore("task", {
  state: () => ({
    task: {
      title: "",
      needAction: [],
      completed: [],
    },
  }),

  actions: {
    getTasks() {
      return {
        title: this.task.title,
        completeTasks: this.task.completeTasks,
        needActionTasks: this.task.needActionTasks,
      };
    },
    async fetchTasks(taskListId) {
      this.task = {
        title: "",
        needAction: [],
        completed: [],
      };

      const token = user.getToken();
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      await axios
        .get(
          `https://www.googleapis.com/tasks/v1/users/@me/lists/${taskListId}`,
          config
        )
        .then((res) => {
          const title = res.data.title;
          this.task.title = title;
          return title;
        })
        .catch((err) => {
          return err;
        });

      await axios
        .get(
          `https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/tasks?showHidden=true`,
          config
        )
        .then((res) => {
          const items = res.data.items;

          items.map((x) => {
            const tl = taskList.getTaskList();
            if (x.status === "needsAction") {
              this.task.needAction.push(x);
            }
            if (x.status === "completed") {
              this.task.completed.push(x);
            }
          });

          return items;
        })
        .catch((err) => {
          return err;
        });
    },
  },
});

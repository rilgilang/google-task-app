// /store/user.js

import axios from "axios";
import { defineStore } from "pinia";
import { useUserStore } from "./user";
const user = useUserStore();

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [
      // {
      // id: "",
      //   title: "",
      //   needAction: [],
      //   completed: [],
      // },
    ],
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
      const tasks = {
        id: "",
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
          tasks.title = title;
          tasks.id = taskListId;
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
            if (x.status === "needsAction") {
              tasks.needAction.push(x);
            }
            if (x.status === "completed") {
              tasks.completed.push(x);
            }
          });

          this.tasks.push(tasks);

          return items;
        })
        .catch((err) => {
          return err;
        });
    },

    removeTasksList(taskListId) {
      console.log("masok ke function wir");
      this.tasks.map((x, i) => {
        if (x.id === taskListId) {
          this.tasks.splice(i, 1);
        }
      });
    },
  },
});

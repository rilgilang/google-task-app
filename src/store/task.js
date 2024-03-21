// /store/user.js

import axios from "axios";
import { defineStore } from "pinia";
import { useUserStore } from "./user";
const user = useUserStore();

export const useTaskStore = defineStore("task", {
  state: () => ({
    allTasks: [
      // {
      // id: "",
      //   title: "",
      //   task: [],
      // },
    ],
  }),

  actions: {
    getTasks() {
      // return {
      //   title: this.task.title,
      //   completeTasks: this.task.completeTasks,
      //   needActionTasks: this.task.needActionTasks,
      // };
    },
    async fetchTasks(taskListId) {
      const list = {
        id: "",
        title: "",
        tasks: [],
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
          list.title = title;
          list.id = taskListId;

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

          list.tasks = items;

          this.allTasks.push(list);

          return items;
        })
        .catch((err) => {
          return err;
        });
    },
    async changeTaskStatus(taskListId, taskId, status, currentStatus) {
      const token = user.getToken();
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const body = {
        status: status,
        id: taskId,
      };

      this.allTasks.map((x) => {
        if (x.id === taskListId) {
          x.tasks.map((y) => {
            if (y.id === taskId) {
              y.status = status;
            }
          });
        }
      });

      await axios
        .patch(
          `https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/tasks/${taskId}`,
          body,
          config
        )
        .then((res) => {})
        .catch((err) => {
          // TODO revert status
          return err;
        });
    },

    removeTasksList(taskListId) {
      this.allTasks.map((x, i) => {
        if (x.id === taskListId) {
          this.allTasks.splice(i, 1);
        }
      });
    },
  },
  persist: true,
});

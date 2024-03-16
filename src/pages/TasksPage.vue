<template>
  <div class="q-pa-md">
    <q-scroll-area style="height: 50px; max-width: 100%">
      <q-btn
        rounded
        icon="add"
        color=""
        class="text-black q-mx-sm text-weight-light"
      />
      <q-btn
        flat
        rounded
        v-for="tl in taskList"
        :key="tl.id"
        color=""
        :label="tl.title"
        class="text-black q-px-md text-weight-light q-mr-sm"
        @click="changeTaskList(tl.id)"
      />
    </q-scroll-area>

    <q-card style="border-radius: 25px">
      <q-card-section
        v-if="task.completed.length == 0 && task.needAction.length == 0"
        class="text-center"
      >
        <div class="text-h6 text-weight-light">No taks yet</div>
        <div class="text-body-2">
          Add your to-dos and keep track of them across Google Workspace
        </div>
      </q-card-section>
      <q-card-section
        v-if="task.completed.length != 0 || task.needAction.length != 0"
      >
        <div class="text-h5 q-ml-md text-weight-light">{{ task.title }}</div>
        <q-card-section class="fit row">
          <div class="col-12" v-for="t in task.needAction" :key="t.id">
            <div class="fit row items-start">
              <q-btn size="6px" round outline class="q-mr-sm q-mt-xs"> </q-btn>
              <div
                class="col-11 text-body1 text-weight-light text-weight-light"
              >
                {{ t.title }}
              </div>
              <div
                class="col-1 text-overline rounded-borders bg-accent text-weight-light text-weight-light q-ml-lg text-center"
                v-if="t.due != null"
              >
                {{ calculateDay(t) }}
              </div>
            </div>
          </div>
          <div class="col-12" v-for="t in task.completed" :key="t.id">
            <div class="fit row items-start">
              <q-btn size="6px" round flat class="q-mr-sm q-mt-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="3"
                  stroke="#4284f3"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.2 15.75l6 5 10-13.5"
                  />
                </svg>
              </q-btn>
              <div
                class="col-11 text-body1 text-weight-light text-weight-light"
              >
                {{ t.title }}
              </div>
              <div
                class="col-1 text-overline text-weight-light text-weight-light q-ml-lg text-center"
                style="border: 1.5px solid #d0e0f3; border-radius: 200px"
                v-if="t.due != null"
              >
                {{ calculateDay(t) }}
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useTaskStore } from "../store/task";
import { useTaskListStore } from "../store/taskList";
import { storeToRefs } from "pinia";
import dayjs from "dayjs";

const taskState = useTaskStore();
const taskListState = useTaskListStore();

const { task } = storeToRefs(taskState);

export default {
  setup() {
    onMounted(async () => {
      await taskListState.fetchTaskList();
    });

    const { taskList } = storeToRefs(taskListState);
    const { task } = storeToRefs(taskState);

    return {
      taskList,
      task,
    };
  },
  methods: {
    async changeTaskList(listId) {
      await taskState.fetchTasks(listId);
    },
    calculateDay(t) {
      const day = dayjs(t.due).diff(dayjs(), "day");
      let result = "";
      if (day == 0) {
        result = `Today`;
      } else if (day == -1) {
        result = "Yesterday";
      } else if (day < -1 && day > -7) {
        result = `${day.toString().replace("-", "")} days ago`;
      } else if (day < -7) {
        const week = dayjs(t.due).diff(dayjs(), "week");
        result = `${week.toString().replace("-", "")} week ago`;
      }
      return result;
    },
  },
};
</script>

<style lang="sass" scoped></style>

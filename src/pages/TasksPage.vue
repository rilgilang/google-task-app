<template>
  <div class="q-pa-md">
    <q-scroll-area style="height: 100vh; max-width: 100%">
      <div class="fit row no-wrap justify-start items-start q-gutter-md">
        <q-card
          flat
          bordered
          class="my-card col-4"
          style="border-radius: 25px"
          v-for="list in allTasks"
          :key="list.id"
        >
          <q-card-section>
            <div class="text-h5 q-ml-md text-weight-light">
              {{ list.title }}
            </div>
            <q-card-section class="fit row">
              <q-btn
                size="6px"
                rounded
                outline
                class="col-12 q-mr-sm q-mb-md"
                color="primary"
              >
                <div
                  class="col-11 text-body1 text-weight-light text-weight-light"
                >
                  Add a task
                </div>
              </q-btn>

              <div class="fit row" v-for="t in list.tasks" :key="t.id">
                <div class="col-12" v-if="t.status === 'needsAction'">
                  <div class="fit row items-start">
                    <q-btn
                      size="6px"
                      round
                      outline
                      class="q-mr-sm q-mt-xs"
                      @click="
                        changeTaskStatus(list.id, t.id, 'completed', t.status)
                      "
                    >
                    </q-btn>
                    <div
                      class="col-11 text-body1 text-weight-light text-weight-light"
                    >
                      {{ t.title }}
                    </div>
                    <div
                      class="col-4 text-overline text-weight-light text-weight-light q-ml-lg text-center"
                      style="border: 1.5px solid #d0e0f3; border-radius: 200px"
                      v-if="t.due != null"
                    >
                      {{ calculateDay(t) }}
                    </div>
                  </div>
                </div>
                <div class="col-12" v-if="t.status === 'completed'">
                  <div class="fit row items-start">
                    <q-btn
                      size="6px"
                      round
                      flat
                      class="q-mr-sm q-mt-xs"
                      @click="
                        changeTaskStatus(list.id, t.id, 'needsAction', t.status)
                      "
                    >
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
                      class="col-11 text-body1 text-weight-light text-weight-light text-strike"
                    >
                      {{ t.title }}
                    </div>
                    <div
                      class="col-4 text-overline text-weight-light text-weight-light q-ml-lg text-center"
                      style="border: 1.5px solid #d0e0f3; border-radius: 200px"
                      v-if="t.due != null"
                    >
                      {{ calculateDay(t) }}
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </q-scroll-area>
  </div>
</template>

<script>
import { useTaskStore } from "../store/task";
import { storeToRefs } from "pinia";
import dayjs from "dayjs";

const taskState = useTaskStore();

export default {
  setup() {
    const { allTasks } = storeToRefs(taskState);
    return { allTasks };
  },
  methods: {
    async changeTaskList(listId) {
      await taskState.fetchTasks(listId);
    },
    async changeTaskStatus(listId, taskId, status, currentStatus) {
      await taskState.changeTaskStatus(listId, taskId, status, currentStatus);
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

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> App Icikiwir </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      :width="200"
      :breakpoint="500"
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item class="q-mt-md">
            <q-item-section>
              <q-item-label
                ><q-btn
                  rounded
                  color=""
                  class="text-black q-mx-sm text-weight-light"
                >
                  <q-icon size="md" name="add" color="primary" />
                  Create new
                </q-btn></q-item-label
              >
            </q-item-section>
          </q-item>

          <q-item v-for="tl in taskList" :key="tl.id" tag="label" v-ripple>
            <q-item-section side top>
              <q-checkbox
                v-model="tl.vmodel"
                @click="changeTaskList(tl.vmodel, tl.id)"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ tl.title }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { useTaskListStore } from "../store/taskList";
import { useUserStore } from "../store/user";
import { useTaskStore } from "../store/task";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();
const taskListState = useTaskListStore();
const taskState = useTaskStore();
const userState = useUserStore();

export default defineComponent({
  name: "MainLayout",

  components: {},

  setup() {
    const leftDrawerOpen = ref(false);

    const { taskList } = storeToRefs(taskListState);
    const { tasks } = storeToRefs(taskState);
    onMounted(async () => {
      const res = await userState.fetchUser();

      await taskListState.fetchTaskList();
      if (res.response.status && res.response.status === 401) {
        //TODO FIX THIS
        router.push("/");
      }
    });

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      tasks,
      taskList,
    };
  },

  methods: {
    async changeTaskList(vmodel, listId) {
      if (vmodel) {
        await taskState.fetchTasks(listId);
      } else {
        taskState.removeTasksList(listId);
      }
    },
  },
});
</script>

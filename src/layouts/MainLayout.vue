<template>
  <q-layout view="hHh lpr lFr">
    <q-header elevated class="bg-primary text-white q-pa-sm" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <div class="row fit">
            <q-avatar class="q-mr-md">
              <img
                src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
              />
            </q-avatar>
            <div>App Icikiwir</div>
          </div>
        </q-toolbar-title>
      </q-toolbar>

      <!-- <q-tabs align="left">
        <q-route-tab
          v-for="tl in taskList"
          :key="tl.id"
          :to="`/task/${tl.id}`"
          :label="tl.title"
        />
      </q-tabs> -->
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { useTaskListStore } from "../store/taskList";
import { useUserStore } from "../store/user";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();
const taskListState = useTaskListStore();
const userState = useUserStore();

export default defineComponent({
  name: "MainLayout",

  components: {},

  setup() {
    const { userInfo } = storeToRefs(userState);

    onMounted(async () => {
      const res = await userState.fetchUser();

      if (res.response.status && res.response.status === 401) {
        //TODO FIX THIS
        router.push("/");
      }
    });

    return {
      userInfo,
    };
  },

  methods: {},
});
</script>

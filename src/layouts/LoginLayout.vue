<template>
  <q-layout view="lHr lpr lfr">
    <!-- <q-header elevated>
      <div class="q-px-lg q-pt-xl q-mb-md">
        <div class="text-h3">Google Task</div>
      </div>
    </q-header> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "LoginLayout",

  components: {},

  setup() {
    return {};
  },
});
</script>

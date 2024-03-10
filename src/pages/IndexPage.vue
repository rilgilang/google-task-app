<template>
  <q-page class="flex flex-center">
    <!-- <h1>ICIKIWIR</h1> -->
    <GoogleLogin :callback="callback" />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
});
</script>

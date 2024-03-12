<template>
  <q-page class="flex flex-center rounded-borders">
    <GoogleLogin :callback="callback" />
  </q-page>
</template>

<script setup>
const callback = (response) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  console.log("Handle the response", response);
};
</script>

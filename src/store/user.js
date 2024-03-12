// /store/user.js

import axios from "axios";
import { defineStore } from "pinia";

import { googleTokenLogin } from "vue3-google-login";
export const useUserStore = defineStore("user", {
  state: () => ({
    access_token: localStorage.getItem("access_token"),
    user: null,
  }),

  actions: {
    async fetchUser() {
      axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", config)
        .then((res) => {
          const user = res;
          this.user = user;
          return user;
        })
        .catch((err) => console.error(err));
    },
    async signIn(response) {
      await googleTokenLogin().then((response) => {
        localStorage.setItem("access_token", response.access_token);
      });
    },
  },
});

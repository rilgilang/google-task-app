// /store/user.js

import axios from "axios";
import { defineStore } from "pinia";

import { googleTokenLogin } from "vue3-google-login";
export const useUserStore = defineStore("user", {
  state: () => ({
    access_token: localStorage.getItem("access_token"),
    userInfo: null,
  }),

  actions: {
    getUserInfo() {
      return this.userInfo;
    },
    getToken() {
      return this.access_token;
    },
    async fetchUser() {
      const getData = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: "Bearer " + this.access_token },
        })
        .then((res) => {
          const userInfo = res.data;
          this.userInfo = userInfo;
          return userInfo;
        })
        .catch((err) => {
          localStorage.removeItem("access_token");
          return err;
        });

      return getData;
    },
    async signIn(response) {
      await googleTokenLogin().then((response) => {
        localStorage.setItem("access_token", response.access_token);
      });
    },
  },
});

// /store/user.js

import axios from "axios";
import { defineStore } from "pinia";

import { googleSdkLoaded } from "vue3-google-login";

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
          localStorage.removeItem("taskList");
          localStorage.removeItem("task");
          return err;
        });

      return getData;
    },
    async signIn(response) {
      await googleSdkLoaded((google) => {
        google.accounts.oauth2
          .initCodeClient({
            client_id:
              "479647641827-55ed4nnh9it71o5n9sfgov4pi4kvhtj7.apps.googleusercontent.com",
            scope:
              "https://www.googleapis.com/auth/tasks.readonly https://www.googleapis.com/auth/tasks",
            callback: async (response) => {
              const code = response.code;

              await this.getOauth2AccesToken(code);
            },
          })
          .requestCode();
      });

      // await googleTokenLogin().then((response) => {
      //   localStorage.setItem("access_token", response.access_token);
      // });
    },
    async getOauth2AccesToken(code) {
      let data = new FormData();
      data.append("grant_type", "authorization_code");
      data.append("code", code);
      data.append("client_id", process.env.GOOGLE_CLIENT_ID);
      data.append("client_secret", process.env.GOOGLE_CLIENT_SECRET);
      data.append("redirect_uri", "http://localhost:9000");

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://accounts.google.com/o/oauth2/token",
        data: data,
      };

      await axios
        .request(config)
        .then((response) => {
          localStorage.setItem("access_token", response.data.access_token);
          return response.data;
        })
        .catch((error) => {
          return error;
        });
    },
  },
});

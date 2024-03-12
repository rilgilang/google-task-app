import { boot } from "quasar/wrappers";
import vue3GoogleLogin from "vue3-google-login";

export default boot(({ app }) => {
  app.use(vue3GoogleLogin, {
    clientId: process.env.GOOGLE_CLIENT_ID,
  });
});

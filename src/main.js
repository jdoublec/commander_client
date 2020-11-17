import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";

import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseDialog from './components/ui/BaseDialog.vue';

const app = createApp(App);
app.use(store)
app.use(router)

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-dialog', BaseDialog);
app.mount("#app");

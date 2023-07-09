import { createApp } from 'vue';
import { createPinia } from 'pinia';
import '@/assets/styles/global.scss';

import App from './App.vue';
import router from './router';

import '@galimovdev/fg-ui/css'

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');

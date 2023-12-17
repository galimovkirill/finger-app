import { createApp } from 'vue';
import { createPinia } from 'pinia';
import '@/assets/styles/global.scss';

import App from './App.vue';
import router from './router';

import '@galimovdev/fg-ui/css';
import { useCookies } from '@vueuse/integrations/useCookies';
import { CookiesKeys } from '@/constants/cookies';
import { useUserStore } from '@/stores/user';
import jwtDecode from 'jwt-decode';
import { UserDecodedToken } from '@/types/user/user';
import dayjs from 'dayjs';
import { http } from '@/modules/http';

const app = createApp(App);
const store = createPinia();

app.use(store);

const cookies = useCookies();
const userStore = useUserStore();

const onAppInit = () => {
    const accessToken = cookies.get(CookiesKeys.ACCESS_TOKEN);
    if (!accessToken) {
        return;
    }

    const decodedUser = jwtDecode<UserDecodedToken>(accessToken);
    const accessTokenExpiredAt = decodedUser.exp * 1000;

    const isTokenAlive = dayjs(accessTokenExpiredAt).isAfter(Date.now());

    if (!isTokenAlive) {
        cookies.remove(CookiesKeys.ACCESS_TOKEN);
        return;
    }

    userStore.$patch({ user: decodedUser });
    http.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};

const startServer = async () => {
    await onAppInit();

    app.use(router);
    app.mount('#app');
};

startServer();

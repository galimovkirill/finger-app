import { createApp } from 'vue';
import { createPinia } from 'pinia';
import '@/assets/styles/global.scss';

import App from './App.vue';
import router from './router';

import '@galimovdev/fg-ui/css';
import { useCookies } from '@vueuse/integrations/useCookies';
import { CookiesKeys } from '@/constants/cookies';
import jwtDecode from 'jwt-decode';
import { UserDecodedToken } from '@/types/user/user';
import dayjs from 'dayjs';
import { useAuth } from '@/composables/auth/useAuth';

const app = createApp(App);
const store = createPinia();

app.use(store);

const cookies = useCookies();
const { updateUserByToken } = useAuth();

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

    updateUserByToken(accessToken);
};

const startServer = () => {
    onAppInit();

    app.use(router);
    app.mount('#app');
};

startServer();

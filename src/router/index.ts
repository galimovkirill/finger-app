import { useUserStore } from '@/stores/user';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'Login',
            meta: {
                authRoute: true,
                layout: 'centered'
            },
            component: () => import('@/views/LoginView.vue')
        },
        {
            path: '/register',
            name: 'Register',
            meta: {
                authRoute: true,
                layout: 'centered'
            },
            component: () => import('@/views/RegisterView.vue')
        },
        {
            path: '/',
            name: 'Home',
            component: () => import('@/views/HomeView.vue')
        }
    ]
});

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    const { user } = userStore;

    if (to.matched.some((r) => r.meta.authRoute)) {
        user ? next({ name: 'Home' }) : next();
    } else {
        user ? next() : next({ name: 'Login' });
    }
});

export default router;

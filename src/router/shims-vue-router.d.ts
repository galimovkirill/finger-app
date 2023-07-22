import 'vue-router';

declare module 'vue-router' {
    interface RouteMeta {
        authRoute?: boolean;
        layout?: 'default' | 'centered';
    }
}

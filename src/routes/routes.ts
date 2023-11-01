import { RouteRecordRaw } from 'vue-router';
import Orders from '../views/Orders.vue';
import Payments from '../views/Payments.vue';
import FailPayment from '../views/FailPayment.vue';

const routes: Array<RouteRecordRaw> = [
    { path: '/', redirect: '/orders' },
    { path: '/orders', name: 'orders', component: Orders },
    { path: '/payments', name: 'payments', component: Payments },
    { path: '/failPayment', name: 'failPayment', component: FailPayment },
    // { path: '/user', redirect: 'user' },
];

export default routes
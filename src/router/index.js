import { createWebHistory, createRouter } from "vue-router";

import Home from '@/components/ComHome'
import ThucDon from '@/components/ComThucDon'
import GioiThieu from '@/components/ComGioiThieu'
import LienHe from '@/components/ComLienHe'
import TinTuc from '@/components/ComTinTuc'
import Cart from '@/components/ComCart'
import Register from '@/components/ComRegister'
import Login from '@/components/ComLogin'
import ComBill from '@/components/ComBill.vue'
import ComBillDetails from "@/components/ComBillDetails.vue";
import ComProductDetail from "@/components/ComProductDetail.vue"
import History from '@/components/ComHistory.vue';

//Tạo mảng chứa đường link
const routes = [
    {
        //nếu chọn component nào loat lên đầu tien thì path:"/"
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/thucdon",
        name: "ThucDon",
        component: ThucDon
    },
    {
        path: "/gioithieu",
        name: "GioiThieu",
        component: GioiThieu
    },
    {
        path: "/lienhe",
        name: "LienHe",
        component: LienHe
    },
    {
        path: "/tintuc",
        name: "TinTuc",
        component: TinTuc
    },
    {
        path: "/cart",
        name: "Cart",
        component: Cart
    },
    {
        path: "/register",
        name: "Register",
        component: Register
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: '/bill',
        name: 'ComBill',
        component: ComBill
    },

    { path: "/bill/:id", name: "BillDetails", component: ComBillDetails },
    {
        path: '/product/:productId',
        name: 'ProductDetail',
        component: ComProductDetail,
        props: true, // Để truyền productId qua props
      },
      {
        path: '/history',
        name: 'History',
        component: History
      },
]
//tạo đối tuongej router
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router
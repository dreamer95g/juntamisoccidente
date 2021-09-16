import Vue from 'vue';
import Router from 'vue-router';
import store from "../store";

Vue.use(Router);

import Dashboard from "../views/Dashboard.vue";
//import Forms from "../views/Forms.vue";
import UIElements from "../views/UIElements.vue";
import Login from "../views/Login.vue";
import Modal from "../views/Modal.vue";
import Card from "../views/Card.vue";
import Blank from "../views/Blank.vue";
//import NotFound from "../views/NotFound.vue";
import Curriculum from "../views/juntamisoikos/curriculum/Curriculum.vue";
import CurriculumList from "../views/juntamisoikos/curriculum/CurriculumList.vue";
import Payroll from "../views/juntamisoikos/payroll/Payroll.vue";
import PayrollList from "../views/juntamisoikos/payroll/PayrollList.vue";
import NomenclatorsList from "../views/juntamisoikos/nomenclators/NomenclatorList.vue";
import ThreeMontsContainer from "../views/juntamisoikos/analytica/three_months/ThreeMonthsContainer.vue";

const routes = [
    {
        path: "/",
        name: "Login",
        component: Login,

    },
    {
        path: "/home",
        name: "Home",
        component: Dashboard,

    },
    {
        path: "/curriculum",
        name: "Curriculum",
        component: Curriculum,
    },
    {
        path: "/curricula",
        name: "CurriculumList",
        component: CurriculumList,
    },
    {
        path: "/payroll",
        name: "Payroll",
        component: Payroll,
    },

    {
        path: "/payrolls",
        name: "PayrollList",
        component: PayrollList,
    },
    {
        path: "/nomenclators",
        name: "NomenclatorsList",
        component: NomenclatorsList,
    },
    {
        path: "/threemonths",
        name: "ThreeMontsContainer",
        component: ThreeMontsContainer,
    }
];


const router = new Router({
    mode: "history",
    routes: routes
});

//PROTEGER LAS RUTAS, OK
router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && store.state.token === "") {
        router.push('/');
    }
    next();
});

export default router;






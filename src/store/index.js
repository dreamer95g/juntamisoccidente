import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isOpenSideBar: false,
        authUser: {},
        token: "",
        layout: "empty-layout"
    },
    mutations: {
        set(state, [variable, value]) {
            state[variable] = value
        }
    },
})

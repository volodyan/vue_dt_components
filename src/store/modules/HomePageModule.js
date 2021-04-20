/**
 * VueX模块的例子
 */

import AxiosService from "@/middleware/services/AxiosService";
import VuexModule from "../VuexModule";
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '@/utils/localstorage'
import moment from "moment";
import Bus from "@/utils/bus";

const HomePageModule = new VuexModule({
    getters: {
        ComponentsData: state => state.ComponentsData,

    },
    state: {
        ComponentsData: "demoComponents",

    },
    mutations: {
        set_ComponentsDatafun: (state, data) => state.ComponentsData = data,

    },

    actions: {
        async ComponentsDatafun({ commit }, data) {
            await commit('set_ComponentsDatafun', data);

        },

    },

});

export default HomePageModule;
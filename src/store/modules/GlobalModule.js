/**
 * VueX模块的例子
 */

import AxiosService from "@/middleware/services/AxiosService";
import VuexModule from "../VuexModule";
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '@/utils/localstorage'
import moment from "moment";
import Bus from "@/utils/bus";

const GlobalModule = new VuexModule({
    getters: {
        ThemeData: state => state.ThemeData,

    },
    state: {
        ThemeData: "lighttheme",

    },
    mutations: {
        set_ThemeDatafun: (state, data) => state.ThemeData = data,

    },

    actions: {
        async ThemeDatafun({ commit }, data) {
            await commit('set_ThemeDatafun', data);

        },

    },

});

export default GlobalModule;
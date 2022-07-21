import router from "@/router";
import { AxiosRequestConfig } from "axios";
import ApiService from "@/services/api.service";
import { ssrContextKey } from "vue";

const state = {
    loaded: false,
    responseCode: 0,
    responseMessage: 0,
    responseErrors: [],
    notifications: null,
}

const getters = {
    notifications: (state: { notifications: any }) => {
        return state.notifications;
    },

    responseCode: (state: { responseCode: any }) => {
        return state.responseCode;
    },

    responseMessage: (state: { responseMessage: any }) => {
        return state.responseMessage;
    },

    responseErrors: (state: { responseErrors: any }) => {
        return state.responseErrors;
    },
}

const mutations = {
    setNotifications(state: { notifications: any }, notifications: any) {
        state.notifications = notifications;
    },

    setLoaded() {
        state.loaded = true;
    }
}

const actions = {
    async fetchNotifications(context: any) {
        return new Promise((resolve, reject) => {
            ApiService.get('api/notifications').then(function(response) {
                if (response && response.data && response.data.data) {
                    const notifications = response.data.data;

                    context.commit("setNotifications", notifications);
                    context.commit("setLoaded");

                    resolve(notifications);
                }
            })
                .catch(error => {
                    reject(error)
                })
        })
    },
}

export const notifications = {
    namespaced: true, 
    state,
    getters,
    actions,
    mutations
}
import router from "@/router";
import { AxiosRequestConfig } from "axios";
import ApiService from "@/services/api.service";
import { ssrContextKey } from "vue";

const state = {
    loaded: false,
    responseCode: 0,
    responseMessage: 0,
    responseErrors: [],
    announcements: null,
}

const getters = {
    announcements: (state: { announcements: any }) => {
        return state.announcements;
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
    setAnnouncements(state: { announcements: any }, notifications: any) {
        state.announcements = notifications;
    },

    setLoaded() {
        state.loaded = true;
    }
}

const actions = {
    async fetchAnnouncements(context: any) {
        return new Promise((resolve, reject) => {
            ApiService.get('api/announcements').then(function(response) {
                if (response && response.data && response.data.data) {
                    const announcements = response.data.data;

                    context.commit("setAnnouncements", announcements);
                    context.commit("setLoaded");

                    resolve(announcements);
                }
            })
                .catch(error => {
                    reject(error)
                })
        })
    },
}

export const announcements = {
    namespaced: true, 
    state,
    getters,
    actions,
    mutations
}
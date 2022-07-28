import router from "@/router";
import { AxiosRequestConfig } from "axios";
import ApiService from "@/services/api.service";
import { ssrContextKey } from "vue";

const state = {
    loaded: false,
    responseCode: 0,
    responseMessage: 0,
    responseErrors: [],
    internalReferrals: null,
}

const getters = {
    announcements: (state: { internalReferrals: any }) => {
        return state.internalReferrals;
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
    setInternalReferrals(state: { internalReferrals: any }, internalReferrals: any) {
        state.internalReferrals = internalReferrals;
    },

    setLoaded() {
        state.loaded = true;
    }
}

const actions = {
    async fetchInternalReferrals(context: any) {
        return new Promise((resolve, reject) => {
            ApiService.get('api/internal-referrals').then(function(response) {
                if (response && response.data && response.data.data) {
                    const internalReferrals = response.data.data;

                    context.commit("setInternalReferrals", internalReferrals);
                    context.commit("setLoaded");

                    resolve(internalReferrals);
                }
            })
                .catch(error => {
                    reject(error)
                })
        })
    },
}

export const internalReferrals = {
    namespaced: true, 
    state,
    getters,
    actions,
    mutations
}
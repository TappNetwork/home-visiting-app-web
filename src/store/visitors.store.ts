import router from "@/router";
import { AxiosRequestConfig } from "axios";
import ApiService from "@/services/api.service";
import { ssrContextKey } from "vue";

const state = {
    loaded: false,
    responseCode: 0,
    responseMessage: 0,
    responseErrors: [],
    visitors: null,
    counties: null,
    languages: null,
    agencies: null,
    certifications: null,
    supervisor: null, 
    skills: null,

}

const getters = {
    visitors: (state: { visitors: any }) => {
        return state.visitors;
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
    setVisitors(state: { visitors: any }, visitors: any) {
        state.visitors = visitors;
    },

    setLoaded() {
        state.loaded = true;
    }
}

const actions = {
    async fetchVisitors(context: any) {
        return new Promise((resolve, reject) => {
            ApiService.get('api/visitors').then(function(response) {
                if (response && response.data && response.data.data) {
                    const visitors = response.data.data;

                    context.commit("setVisitors", visitors);
                    context.commit("setLoaded");

                    resolve(visitors);
                }
            })
                .catch(error => {
                    reject(error)
                })
        })
    },
}

export const visitors = {
    namespaced: true, 
    state,
    getters,
    actions,
    mutations
}
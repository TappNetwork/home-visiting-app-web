import ApiService from '@/services/api.service';

const state = {
    loaded: false,
    responseCode: 0,
    responseMessage: 0,
    responseErrors: [],
    externalService: null
}

const getters = {
    externalServices: (state: { externalServices: any }) => {
        return state.externalServices;
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
    setExternalServices(state: { externalServices: any }, externalServices: any) {
        state.externalServices = externalServices;
    },

    setLoaded() {
        state.loaded = true;
    }
}

const actions = {
    async fetchExternalServices(context: any) {
        return new Promise((resolve, reject) => {
            ApiService.get('api/external-services').then(function(response) {
                if (response && response.data && response.data.data) {
                    const externalServices = response.data.data;

                    context.commit("setExternalServices", externalServices);
                    context.commit("setLoaded");

                    resolve(externalServices);
                }
            })
                .catch(error => {
                    reject(error)
                })
        })
    },
}

export const externalServices = {
    namespaced: true, 
    state,
    getters,
    actions,
    mutations
}
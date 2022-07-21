
import { createStore } from 'vuex';
import { auth } from "./auth.store";
import { notifications } from "./notifications.store";

export const store = createStore({
    state: {
        validationErrors: [],
        validationMessage: '',
    },

    mutations: {
        setValidationErrors(state: any, errors: any) {
            state.validationErrors = errors;
        },
        setValidationMessage(state: any, message: any) {
            state.validationMessage = message;
        },
    },

    actions: {},

    modules: {
        auth,
        notifications
    },
})
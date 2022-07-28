
import { createStore } from 'vuex';
import { auth } from "./auth.store";
import { announcements } from "./announcements.store";
import { visitors } from "./visitors.store";
import { internalReferrals } from "./internalReferrals.store";

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
        announcements,
        visitors,
        internalReferrals
    },
})
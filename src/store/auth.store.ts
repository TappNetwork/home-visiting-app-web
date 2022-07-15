import { ResponseError, AuthService } from "@/services/auth.service";
import { TokenService } from "@/services/token.service";
import router from "@/router";
import { AxiosRequestConfig } from "axios";
import ApiService from "@/services/api.service";

const state = {
    authenticating: false,
    accessToken: TokenService.getToken(),
    responseCode: 0,
    responseMessage: "",
    responseErrors: [],
    refreshTokenPromise: null,
    user: null,
};

const getters = {
    currentUser: (state: { user: any }) => {
        return state.user;
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

    authenticating: (state: { authenticating: any }) => {
        return state.authenticating;
    }
};

const actions = {
    async getCurrentUser(context: any) {
        return new Promise((resolve, reject) => {
            AuthService.currentUser().then(function(resp) {
                if (resp && resp.data && resp.data.data) {
                    const user = resp.data.data;

                    context.commit("setUser", user);

                    const course = user.course;

                    if (course) {
                        context.commit("course/setCourse", course, { root: true })
                    }

                    resolve(user)
                }
            })
                .catch(e => {
                    reject(e)
                })
        })
    },

    async ensureUserPopulated(context: any) {
        if (!context.currentUser) {
            await context.dispatch('getCurrentUser')
        }
    },

    async forgotPassword(context: any, data: any) {
        return new Promise((resolve, reject) => {
            const forgetData: AxiosRequestConfig = {
                method: "post",
                headers: { "Content-Type": "application/json" },
                url: "/forgot-password",
                data: data,
            }

            ApiService.customRequest(forgetData).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err.response.data.errors);
            });
        });
    },

    async resetPassword(context: any, data: any) {
        return new Promise((resolve, reject) => {
            ApiService.post('/reset-password', data).then(res => {
                // TODO should this also log you in? or do you still go to login form?
                router.push('/login')
                resolve(res)
            }).catch(err => {
                reject(err.response.data.errors);
            });
        });
    },

    async signIn(context: any, signInData: { email: string, password: string, grant_type: string }) {
        context.commit("signInRequest");
        return new Promise((resolve, reject) => {
            AuthService.signIn(signInData).then(res => {
                context.commit("signInSuccess", res);
                resolve(res);
                // TODO handle intended redirect
                router.push("/dashboard");
            }).catch(err => {
                if (err instanceof ResponseError) {
                    context.commit("signInError", {
                        errorCode: err.errorCode,
                        errorMessage: err.message,
                        errors: err.errors,
                    });
                    reject(err.message);
                }
            });
        });
    },

    signOut(context: any) {
        context.commit("signOutRequest");
        return new Promise<void>((resolve) => {
            context.commit("setUser", false);
            AuthService.signOut()
            router.push("/login");
            resolve();
        });
    },

    refreshToken(context: any, state: { refreshTokenPromise: any }) {
        // added a check for !state because sometimes it is undefined
        if (!state || !state.refreshTokenPromise) {
            const p = AuthService.refreshToken();
            context.commit("refreshTokenPromise", p);

            p.then(
                response => {
                    context.commit("refreshTokenPromise", null);
                    context.commit("signInSuccess", response);
                },
                error => {
                    context.commit("refreshTokenPromise", error);
                }
            );
        }

        return state.refreshTokenPromise;
    },

    setAuthenticatingStatus(context: any, status: any) {
        context.commit("setAuthenticatingStatus", status);
    },
};

const mutations = {
    signInRequest(state: {
        authenticating: boolean;
        responseMessage: string;
        responseCode: number;
        responseErrors: any;
    }) {
        state.authenticating = true;
        state.responseMessage = "";
        state.responseCode = 0;
        state.responseErrors = [];
    },

    signInSuccess(state: {
        accessToken: any;
        authenticating: boolean;
    }, accessToken: any) {
        state.accessToken = accessToken;
        state.authenticating = false;
    },

    signInError(state: {
        authenticating: boolean;
        responseCode: any;
        responseMessage: any;
        responseErrors: any;
    }, { errorCode, errorMessage, errors }: any) {
        state.authenticating = false;
        state.responseCode = errorCode;
        state.responseMessage = errorMessage;
        state.responseErrors = errors;
    },

    signUpSuccess(state: {
        responseCode: any;
    }, { responseCode }: any) {
        state.responseCode = responseCode;
    },

    signOutRequest(state: { authenticating: boolean }) {
        state.authenticating = false;
    },

    refreshTokenPromise(state: { refreshTokenPromise: any }, promise: any) {
        state.refreshTokenPromise = promise;
    },

    processSuccess(state: { authenticating: boolean }) {
        state.authenticating = false;
    },

    setAuthenticatingStatus(state: { authenticating: any }, status: any) {
        state.authenticating = status;
    },

    setUser(state: { user: any }, user: any) {
        state.user = user;
    }
};

export const auth = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
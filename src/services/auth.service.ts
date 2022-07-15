import ApiService from "./api.service";
import { TokenService } from "./token.service";
import { AxiosRequestConfig } from "axios";
import qs from "qs";
import { ErrorCodes } from "vue";

class ResponseError extends Error {
    errorCode: any;
    errorMessage: any;
    errors: any;

    constructor(errorCode: any, message: string | undefined, errors: any) {
        super(message);
        this.name = this.constructor.name;
        if (message != null) {
            this.message = message;
        }
        this.errorCode = errorCode;
        this.errors = errors;
    }
}

const AuthService = {
    signIn: async function(signInData: any) {
        const requestData: AxiosRequestConfig = {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: 'Basic ' + btoa(process.env.VUE_APP_CLIENT_ID + ':' + process.env.VUE_APP_CLIENT_SECRET)
            },
            url: "/oauth/token",
            data: qs.stringify({
                "grant_type": "password",
                username: signInData.email,
                password: signInData.password
            })
        };

        try {
            const response = await ApiService.customRequest(requestData);
            TokenService.saveToken(response.data.access_token);
            TokenService.saveRefreshToken(response.data.refresh_token);
            ApiService.setHeader();

            return response.data.access_token;
        } catch (error) {
            this.catchError(error);
        }
    }, 

    refreshToken: async function() {
        const refreshToken = TokenService.getRefreshToken();

        const requestData: AxiosRequestConfig = {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: 'Basic ' + btoa(process.env.VUE_APP_CLIENT_ID + ':' + process.env.VUE_APP_CLIENT_SECRET)
            },
            url: "/oauth/token",
            data: qs.stringify({
                grant_type: "refresh_token",
                refresh_token: refreshToken
            })
        };

        try {
            const response = await ApiService.customRequest(requestData);

            TokenService.saveToken(response.data.access_token);
            TokenService.saveRefreshToken(response.data.refresh_token);
            ApiService.setHeader();

            return response.data.access_token;
        } catch (error: any) {
            throw new ResponseError(
                error.response.status,
                error.response.data.message,
                error.response.errors
            );
        }
    },

    signOut() {
        TokenService.removeToken();
        TokenService.removeRefreshToken();
        ApiService.removeHeader();
        ApiService.unmount401Interceptor();
    },

    catchError: function(error: any) {
        let status;
        let description;
        let errors;

        if (error.response === undefined) {
            status = error.message;
            description = error.message;
            errors = error.errors;
        } else {
            status = error.response.status;
            description = error.response.data.error_description;
            errors = error.response.data.errors;
        }

        throw new ResponseError(status, description, errors);
    },

    currentUser: async function() {
        try {
            return ApiService.get("api/users/me");
        } catch (error) {
            this.catchError(error);
        }
    }
};

export { AuthService, ResponseError };
import * as React from 'react';
import axios from 'axios';

import * as events from 'events';


export const API = {
	PREFIX: "/api",
};


export const API_AS_JSON = (res: any) => {
	if (res.status >= 500) {
		throw new Error(`Server error ${res.status}: ${res.statusText}. Please try again later or contact developers to fix this problem.`)
	}
	return res.data;
}

export const CATCH = (err: any) => {
	console.error(err);
	if (err.response.status === 403) {
		ApiClient.logout();
		window.location.reload();
	}
	return err.response;
}


const isNullOrUndefined = (value: any) => value === "null" || value === "undefined";

export class ApiClient {
	private static instance: ApiClient;

	private token?: string;
	private user: any;
	private static emitter = new events.EventEmitter();

	public static emitUnauthorized() {
		ApiClient.emitter.emit("unauthorized");
	}

	private constructor() {
		this.token = localStorage.getItem("token") || undefined;
		if (isNullOrUndefined(this.token)) {
			localStorage.removeItem("token");
		}

		this.user = JSON.parse(localStorage.getItem("user") || "{}");
		if (isNullOrUndefined(this.user)) {
			localStorage.removeItem("user");
		}

		if (this.token && this.user) {
			console.log("INITIAL AUTHORIZED");
			ApiClient.emitter.emit("authorized", this);
		} else {
			console.log("INITIAL UNAUTHORIZED");
			ApiClient.emitter.emit("unauthorized", this);
		}
	}

	public static onAuthorized(cb: any) {
		ApiClient.emitter.on("authorized", cb);
	}

	public static onUnauthorized(cb: any) {
		ApiClient.emitter.on("unauthorized", cb);
	}

	public getToken(): string {
		return this.token!;
	}

	public getUser(): string {
		return this.user;
	}

	public static getInstance(): ApiClient {
		if (ApiClient.instance) {

		} else {
			ApiClient.instance = new ApiClient();
		}

		return ApiClient.instance;
	}

	public isAuthorized() {
		return !!this.token;
	}

	async login(email: string, password: string) {
		try {
			const response = await this.POST<any>("/auth/login", { email, password });
			if (response.error) {
				throw response;
			}
			this.token = response.token;
			this.user = response.user;
			localStorage.setItem("token", this.token!);
			localStorage.setItem("user", JSON.stringify(this.user));
			ApiClient.emitter.emit("authorized", this);
			return response;
		} catch(err) {
			throw err;
		}
		return null;
	}

	async logout() {
		this.token = undefined;
		localStorage.removeItem("token");
		ApiClient.emitter.emit("unauthorized", this);
		return true;
	}

	public static login(email: string, password: string) {
		return ApiClient.getInstance().login(email, password);
	}

	public static logout() {
		return ApiClient.getInstance().logout();
	}

	public async POST<T>(url: string, data: any) {
		return axios.post(API.PREFIX + url, data, {
			headers: {
				"Authorization": `Bearer ${this.token}`,
			}
		// }).then(API_AS_JSON) as Promise<T>;
		}).catch(CATCH).then(API_AS_JSON) as Promise<T>;
	}

	public async GET<T>(url: string) {
		return axios.get(API.PREFIX + url, {
			headers: {
				"Authorization": `Bearer ${this.token}`,
			}
		}).catch(CATCH).then(API_AS_JSON) as Promise<T>;
	}
}

(window as any).ApiClient = ApiClient;

// const api = ApiClient.getInstance();
// api.login("yaroslav.nychkalo@gmail.com", "test").then(r => {
// 	api.POST("/schedule/get", {}).then(console.log);
// });
import * as React from 'react';
import axios from 'axios';


export const API_PREFIX = "/api";

export const API_AS_JSON = res => {
	if (res.status >= 500) {
		throw new Error(`Server error ${res.status}: ${res.statusText}. Please try again later or contact developers to fix this problem.`)
	}
	return res.data;
}


export class ApiClient {
	private static instance: ApiClient;

	private token: string;

	private constructor() {
		this.token = localStorage.getItem("token");
		if (this.token === "null") {
			localStorage.removeItem("token");
		}
	}

	public static getInstance(): ApiClient {
		if (!ApiClient.instance) {
			ApiClient.instance = new ApiClient();
		}

		return ApiClient.instance;
	}

	public isAuthorized() {
		return !!this.token;
	}

	public async login(email, password) {
		try {
			const response = await this.POST<any>("/auth/login", { email, password });
			this.token = response.token;
			localStorage.setItem("token", this.token);
			console.log('RESSS', response);
			return response.token
		} catch(err) {
			console.log("ERRR", err);
		}
		return null;
	}

	public async logout() {
		localStorage.removeItem("token");
		return true;
	}

	public async POST<T>(url, data) {
		return axios.post(API_PREFIX + url, data, {
			headers: {
				"Authorization": `Bearer ${this.token}`,
			}
		}).then(API_AS_JSON) as Promise<T>;
	}

	public async GET<T>(url) {
		return axios.get(API_PREFIX + url, {
			headers: {
				"Authorization": `Bearer ${this.token}`,
			}
		}).then(API_AS_JSON) as Promise<T>;
	}
}

// const api = ApiClient.getInstance();
// api.login("yaroslav.nychkalo@gmail.com", "test").then(r => {
// 	api.POST("/schedule/get", {}).then(console.log);
// });
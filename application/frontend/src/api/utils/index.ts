import * as React from 'react';
import axios from 'axios';

import { ApiClient } from './ApiClient';

export * from './useApiRequest';


export interface ResponseAll<T> {
	items: Array<T>;
}

export interface ResponseOne<T> {
	item: T;
}

export interface ResponseAdd<T> {
	success: boolean;
	item: T;
}

export interface ResponseUpdate<T = any> {
	success: boolean;
	item?: T;
}

export interface ResponseDelete {
	success: boolean;
}


export const handleResponseError = (res: any) => {
	if (res.error) {
		throw res;
	}
	return res;
}

export const API_AS_JSON = (res: any) => {
	if (res.status >= 500) {
		throw new Error(`Server error ${res.status}: ${res.statusText}. Please try again later or contact developers to fix this problem.`)
	}
	return res.data;
}

export const API_GET = <T = any>(url: string) => ApiClient.getInstance().GET<T>(url);
export const API_POST = <T = any>(url: string, data?: any) => ApiClient.getInstance().POST<T>(url, data);


// type TT = <T extends (...args: any[]) => any>;
function logDuration<T extends (...args: any[]) => any>(func: T): (...funcArgs: Parameters<T>) => ReturnType<T> {
	const funcName = func.name;

	// Return a new function that tracks how long the original took
	return (...args: Parameters<T>): ReturnType<T> => {
		console.time(funcName);
		const results = func(...args);
		console.timeEnd(funcName);
		return results;
	};
}


export function onlyLastFetchResult<T extends (...args: any[]) => any>(fetcher: T): (...funcArgs: Parameters<T>) => ReturnType<T> {
	let currentTime = 0;

	return (...args: Parameters<T>): ReturnType<T> => {
		const startTime = Date.now();
		currentTime = startTime;
		return fetcher(...args).then((result: any) => {
			if (currentTime !== startTime) return undefined;
			return result;
		});
	}
}

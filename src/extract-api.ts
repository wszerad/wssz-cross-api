import { ApiCaller } from './ApiCaller';
import { Endpoint } from './Endpoint';

type ApiFactory<T> = new() => T;
type Method = (...args: any[]) => any;
type NormalizedMethod<F, R> = F extends (...a: infer P) => any ? (...a: P) => R : never;
type RequestFactory = (uri: string, body: any, endpoint: Endpoint) => Promise<any>;
type PromisifyReturn<T extends Method> = ReturnType<T> extends Promise<any> ? ReturnType<T> : Promise<ReturnType<T>>;
// @ts-ignore
type MethodsDecorator<T> = { [P in keyof T]: NormalizedMethod<T[P], PromisifyReturn<T[P]>> };

export function extractApi<T>(Api: ApiFactory<T>, requestFactory: RequestFactory): MethodsDecorator<T> {
	const apiClone = new ApiCaller(Api);

	Object.getOwnPropertyNames(Api.prototype)
		.forEach(key => {
			if (key === 'constructor') {
				return;
			}

			Object.defineProperty(apiClone, key, {
				value: function (...args: any[]) {
					const endpoint = this.getEndpoint(key);
					const payload = endpoint.call(args);
					return requestFactory(payload.url, payload.body, endpoint);
				},
				enumerable: true,
				writable: false
			})

		});

	return apiClone as any;
}
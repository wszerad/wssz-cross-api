import {Endpoint} from './Endpoint';
import {extractEndpoint} from './utils';

type ApiFactory<T> = new() => T;
type Method = (...args: any[]) => any;
type NormalizedMethod<F, R> = F extends (...a: infer P) => any ? (...a: P) => R : never;
type RequestFactory = (uri: string, body: any, endpoint: Endpoint) => Promise<any>;
type PromisifyReturn<T extends Method> = ReturnType<T> extends Promise<any> ? ReturnType<T> : Promise<ReturnType<T>>;
// @ts-ignore
type MethodsDecorator<T> = {[P in keyof T]: NormalizedMethod<T[P], PromisifyReturn<T[P]>>};

export function apiHandler<T>(Api: ApiFactory<T>, path: string, requestFactory: RequestFactory): MethodsDecorator<T> {
    const apiMap: {[key: string]: Function} = {};

    return Object.getOwnPropertyNames(Api.prototype)
        .reduce((api, key) => {
            if (key === 'constructor') {
                return api;
            }

            api[key] = (...args: any[]) => {
                const endpoint = extractEndpoint(Api.prototype, key);
                if (!endpoint) {
                    throw new Error('Undefined endpoint');
                }

                const payload = endpoint.request(path, args);
                return requestFactory(payload.uri, payload.body, endpoint);
            };
            return api;
        }, apiMap) as any;
}
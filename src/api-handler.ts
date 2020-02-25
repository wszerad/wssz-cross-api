import {Endpoint} from "./Endpoint";

type Con<T> = new() => T;

export function apiHandler<T>(Api: Con<T>): {[P in keyof T]: Endpoint} {
    return Object.keys(Api.prototype) as any;
}
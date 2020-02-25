import {Param} from "./Param";
import {compile, Key, parse} from "path-to-regexp";
import {ApiPatch} from "./decorators";

export enum EndpointMethods {
    Put,
    Delete,
    Patch,
    Options,
    Head,
    All
}

export class Endpoint {
    path: string;
    method: EndpointMethods;
    return: any;
    params: Param[] = [];

    addParam


    props: { [key: string]: any } = {};
    body: { [key: string]: any } = {};
    query: { [key: string]: any } = {};

    parse(data: any) {
        const route = parse(this.path);
        const params = route
            .filter(part => typeof part === 'object')
            .map(part => (part as Key).name)
            .reduce((acc, name) => {
                acc.set(name, null);
                return acc;
            }, new Map<string | number, any>())



        route[0]
        const parsed = this.params.reduce((acc, param) => {
            if (param.param === ApiPatch) {

            }
            return acc;
        }, {});
        return compile(this.path, { encode: encodeURIComponent })();
    }
}
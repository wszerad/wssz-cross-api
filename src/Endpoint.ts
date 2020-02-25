import {Param} from "./Param";
import {compile} from "path-to-regexp";
import {ApiBody, ApiParam, ApiQuery} from "./decorators";

export enum EndpointMethods {
    Put= 'put',
    Delete = 'delete',
    Patch = 'patch',
    Options = 'option',
    Head = 'head',
    All = 'all'
}

type Params = { [key: string]: string | number | (string|number)[] };

interface Payload {
    uri: string;
    body?: any;
}

export class Endpoint {
    path: string;
    method: EndpointMethods;
    return: any;
    params: Param[] = [];

    payload(args: any[]): Payload {
        const patcher = compile(this.path, { encode: encodeURIComponent });
        return {
            uri: patcher(this.generateFormatter(args)) + '?' + this.generateQuerystring(args),
            body: this.extractBody(args)
        };
    }

    private extractBody(args: any[]): any {
        try {
            return this.extractParamType(ApiBody, args);
        } catch (e) {
            throw new Error('Body mismatch!');
        }
    }

    private extractParamType(type: Function, args: any[]) {
        let params: Params = {};
        let hasSingle = false;

        this.params
            .forEach((param, index) => {
                if (param.param === type) {
                    if (param.key) {
                        if (hasSingle) {
                            throw new Error();
                        }

                        params[param.key] = args[index];
                    } else {
                        hasSingle = true;
                        params = args[index];
                    }
                }
            });

        return params;
    }

    private generateQuerystring(args: any[]) {
        try {
            const query = this.extractParamType(ApiQuery, args);
            // ts-ignore
            // TODO secure node usage
            return new URLSearchParams(query as any);
        } catch (e) {
            throw new Error('Query mismatch!');
        }
    }

    private generateFormatter(args: any[]) {
        try {
            return this.extractParamType(ApiParam, args);
        } catch (e) {
            throw new Error('Path mismatch!');
        }
    }
}
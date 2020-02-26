import {Param} from './Param';
import {compile} from 'path-to-regexp';
import {ApiBody, ApiParam, ApiQuery} from './decorators';

export enum EndpointMethods {
    Get = 'get',
    Post = 'post',
    Put = 'put',
    Delete = 'delete',
    Patch = 'patch',
    Options = 'option',
    Head = 'head',
    All = 'all'
}

type Params = { [key: string]: string | number | (string | number)[] };

interface RequestPayload {
    uri: string;
    body?: any;
}

export class Endpoint {
    rawPath: string;
    method: EndpointMethods;
    returnType: any;
    params: Param[] = [];

    request(basePath: string, args: any[]): RequestPayload {
        const fullPath = `${basePath}/${this.rawPath}`.replace('//', '/');
        const patcher = compile(fullPath, {encode: encodeURIComponent});
        const query = this.generateQuerystring(args);
        return {
            uri: patcher(this.generateFormatter(args)) + (Object.keys(query).length ? '?' + this.generateQuerystring(args) : ''),
            body: this.extractBody(args)
        };
    };

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
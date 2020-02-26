import { Body, Param, Query } from '@nestjs/common';
import {Argument} from './Argument';
import {compile} from 'path-to-regexp';

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
    arguments: Argument[] = [];

    request(basePath: string, args: any[]): RequestPayload {
        const fullPath = `${basePath}/${this.rawPath}`.replace('//', '/');
        const patcher = compile(fullPath, {encode: encodeURIComponent});
        const query = this.extractQuerystring(args);
        const body = this.extractBody(args);

        return {
            uri: patcher(this.extractParams(args)) + (query ? '?' + query : ''),
            body: body ? body : undefined
        };
    };

    private extractByParamType(type: Function, args: any[]) {
        let params: Params;
        let hasSingle = false;

        this.arguments
            .forEach((param, index) => {
                if (param.param === type) {
                    if (param.key) {
                        if (hasSingle) {
                            throw new Error();
                        }

						(params = params || {})[param.key] = args[index];
                    } else {
                        hasSingle = true;
                        params = args[index];
                    }
                }
            });

        return params;
    }

	private extractBody(args: any[]): any {
		try {
			return this.extractByParamType(Body, args);
		} catch (e) {
			throw new Error('Body mismatch!');
		}
	}

    private extractQuerystring(args: any[]) {
        try {
            const query = this.extractByParamType(Query, args);
			if (!query) {
				return '';
			}

			// TODO secure node usage (no URLSearchParams?)
            return new URLSearchParams(query as any).toString();
        } catch (e) {
            throw new Error('Query mismatch!');
        }
    }

    private extractParams(args: any[]) {
        try {
            return this.extractByParamType(Param, args) || {};
        } catch (e) {
            throw new Error('Path mismatch!');
        }
    }
}
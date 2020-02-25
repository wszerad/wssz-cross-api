import 'reflect-metadata';
import {Endpoint, EndpointMethods} from "./Endpoint";
import {Param} from "./Param";

const markerMeta = Symbol.for('commonApi');

export type PropertyKey = string | symbol;

export function defineParamDecorator() {
    const factored = function (key?: string) {
        return function (target: any, propertyKey: PropertyKey, parameterIndex: number) {
            decorateParam(target, propertyKey, factored, key, parameterIndex);
        };
    };
    return factored;
}

export function defineEndpointDecorator(method: EndpointMethods) {
    return function (path: string) {
        return function (target: any, propertyKey: PropertyKey) {
            decorateEndpoint(target, propertyKey, path, method);
        };
    }
}

function decorateParam(target: Object, propertyKey: PropertyKey, self?: Function, key?: string, parameterIndex?: number) {
    const endpoint = getEndpoint(target, propertyKey);
    const type = Reflect.getMetadata("design:paramtypes", target, propertyKey)[parameterIndex];

    endpoint.params.push(
        new Param(self, type, key)
    );
}

function decorateEndpoint(target: Object, propertyKey: PropertyKey, path: string, method: EndpointMethods) {
    const endpoint = getEndpoint(target, propertyKey);
    endpoint.path = path;
    endpoint.method = method;
}

function getEndpoint(target: Object, propertyKey: PropertyKey): Endpoint {
    let endpoint: Endpoint = Reflect.getMetadata(markerMeta, target, propertyKey);

    if (!endpoint) {
        endpoint = new Endpoint();
        endpoint.return = Reflect.getMetadata("design:returntype", target, propertyKey);
        Reflect.defineMetadata(markerMeta, endpoint, target, propertyKey);
    }

    return endpoint;
}
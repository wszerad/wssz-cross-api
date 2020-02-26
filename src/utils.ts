import 'reflect-metadata';
import {Endpoint, EndpointMethods} from './Endpoint';
import {Argument} from './Argument';

const markerMeta = Symbol.for('commonApi');

export type PropertyKey = string | symbol;

export function defineParamDecorator(originDecorator: Function) {
    return function (key?: string) {
        return function (target: any, propertyKey: PropertyKey, parameterIndex: number) {
            originDecorator(key)(target, propertyKey, parameterIndex);
            decorateParam(target, propertyKey, parameterIndex, originDecorator, key);
        };
    };
}

export function defineEndpointDecorator(method: EndpointMethods, originalDecorator: Function) {
    return function (path: string = '', castType?: any) {
        return function (target: any, propertyKey: PropertyKey, descriptor: PropertyDescriptor) {
            originalDecorator(path)(target, propertyKey, descriptor);
            decorateEndpoint(target, propertyKey, path, method, castType);
        };
    }
}

export function extractEndpoint(target: Object, propertyKey: PropertyKey): Endpoint {
    return Reflect.getMetadata(markerMeta, target, propertyKey);
}

function decorateParam(target: Object, propertyKey: PropertyKey, parameterIndex: number, self?: Function, key?: string) {
    const endpoint = getEndpoint(target, propertyKey);
    const type = Reflect.getMetadata('design:paramtypes', target, propertyKey)[parameterIndex];

    endpoint.arguments[parameterIndex] = new Argument(self, type, key);
}

function decorateEndpoint(target: Object, propertyKey: PropertyKey, path: string, method: EndpointMethods, castType?: any) {
    const endpoint = getEndpoint(target, propertyKey, castType);
    endpoint.rawPath = path;
    endpoint.method = method;
}

function getEndpoint(target: Object, propertyKey: PropertyKey, castType?: any): Endpoint {
    let endpoint: Endpoint = Reflect.getMetadata(markerMeta, target, propertyKey);

    if (!endpoint) {
        endpoint = new Endpoint();
        endpoint.returnType = Reflect.getMetadata('design:returntype', target, propertyKey);
        Reflect.defineMetadata(markerMeta, endpoint, target, propertyKey);
    }

    if (!endpoint.returnType && castType) {
        endpoint.returnType = castType;
    }

    return endpoint;
}
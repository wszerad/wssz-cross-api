import {defineEndpointDecorator, defineParamDecorator} from "./utils";
import {EndpointMethods} from "./Endpoint";

export const ApiBody = defineParamDecorator();
export const ApiParam = defineParamDecorator();
export const ApiQuery = defineParamDecorator();

export const ApiPut = defineEndpointDecorator(EndpointMethods.Put);
export const ApiDelete = defineEndpointDecorator(EndpointMethods.Delete);
export const ApiPatch = defineEndpointDecorator(EndpointMethods.Patch);
export const ApiOptions = defineEndpointDecorator(EndpointMethods.Options);
export const ApiHead = defineEndpointDecorator(EndpointMethods.Head);
export const ApiAll = defineEndpointDecorator(EndpointMethods.All);
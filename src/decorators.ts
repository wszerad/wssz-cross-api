import {defineEndpointDecorator, defineParamDecorator} from './utils';
import {EndpointMethods} from './Endpoint';
import {All, Body, Delete, Get, Head, Options, Param, Patch, Post, Put, Query} from '@nestjs/common';

export const ApiBody = defineParamDecorator(Body);
export const ApiParam = defineParamDecorator(Param);
export const ApiQuery = defineParamDecorator(Query);

export const ApiPost = defineEndpointDecorator(EndpointMethods.Post, Post);
export const ApiGet = defineEndpointDecorator(EndpointMethods.Get, Get);
export const ApiPut = defineEndpointDecorator(EndpointMethods.Put, Put);
export const ApiDelete = defineEndpointDecorator(EndpointMethods.Delete, Delete);
export const ApiPatch = defineEndpointDecorator(EndpointMethods.Patch, Patch);
export const ApiOptions = defineEndpointDecorator(EndpointMethods.Options, Options);
export const ApiHead = defineEndpointDecorator(EndpointMethods.Head, Head);
export const ApiAll = defineEndpointDecorator(EndpointMethods.All, All);

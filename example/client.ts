import 'reflect-metadata';
import { extractApi } from '../src/extract-api';
import { AppSchema } from './schema/app.schema';
import { Endpoint } from '../src/Endpoint';

const factory = extractApi(AppSchema, handler);
factory
    .query('param', {
        page: '5'
    })
    .then(x => console.log(x));

function handler(uri: string, body: any, endpoint: Endpoint) {
    // Request for some data with axios, jQuery, etc.
    return new Promise((res, rej) => {
        res({
            uri,
            body,
            method: endpoint.method,
            returnType: endpoint.returnType
        });
    });
}
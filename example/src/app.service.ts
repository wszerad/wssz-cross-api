import { Endpoint } from '../../src/Endpoint';
import { extractApi } from '../../src/extract-api';
import { AppSchema } from '../schema/app.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	test() {
		const factory = extractApi(AppSchema, handler);

		return Promise.all([
			factory.query('test', {page: 'df'}),
			factory.get('test2'),
			factory.post({prop: 'd'})
		]);
	}

	onApplicationBootstrap() {
		this.test().then(x => console.log(x));
	}
}

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



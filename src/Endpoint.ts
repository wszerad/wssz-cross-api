import { RequestMethod } from '@nestjs/common';
import { compile } from 'path-to-regexp';
import { RouteParamtypes } from '@nestjs/common/enums/route-paramtypes.enum';

interface ArgInfo {
	index: number,
	data: string,
	pipes: any
}

export class Endpoint {
	constructor(
		private basePath: string,
		private path: string | string[],
		private methodCode: RequestMethod,
		public returnTypes: {[key: string]: any},
		private args: { [key: string]: ArgInfo }
	) {
	}

	call(args: any[]) {
		const patcher = compile(this.uri, {encode: encodeURIComponent});
		const extractedParams = this.extractParams(args);
		const query = extractedParams[RouteParamtypes.QUERY]
			? '?' + new URLSearchParams(extractedParams[RouteParamtypes.QUERY]).toString()
			: '';
		const body = extractedParams[RouteParamtypes.BODY];
		const param = extractedParams[RouteParamtypes.PARAM] || {};

		return {
			url: patcher(param) + query,
			body
		};
	};

	get returnType() {
		return this.returnTypes['default'];
	}

	get uri() {
		return `${this.basePath}/${this.path}`.replace('//', '/');
	}

	get method(): string {
		return new Map([
			[RequestMethod.GET, 'get'],
			[RequestMethod.POST, 'post'],
			[RequestMethod.PUT, 'put'],
			[RequestMethod.DELETE, 'delete'],
			[RequestMethod.PATCH, 'patch'],
			[RequestMethod.ALL, 'all'],
			[RequestMethod.OPTIONS, 'options'],
			[RequestMethod.HEAD, 'head']
		])
			.get(this.methodCode);
	}

	private extractParams(args: any[]) {
		const params: { [key: string]: any } = {};
		Object.entries(this.args)
			.reduce((acc, [type, info]) => {
				const [paramType, index] = type.split(':');

				acc[paramType] = info.data
					? {...acc[paramType], [info.data]: args[Number(index)]}
					: args[Number(index)];

				return acc;
			}, params);
		return params;
	}
}
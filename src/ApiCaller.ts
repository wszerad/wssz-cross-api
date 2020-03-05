import { METHOD_METADATA, PATH_METADATA, ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import { RequestMethod } from '@nestjs/common';
import { RETURN_METADATA, SCHEMA_METADATA } from './decorators';
import { Endpoint } from './Endpoint';

export class ApiCaller {
	constructor(
		public origin: any
	) {
	}

	getEndpoint(key: PropertyKey) {
		return new Endpoint(
			this.getBaseUrl(),
			this.getPath(key),
			this.getMethod(key),
			this.extractReturnType(key),
			this.extractParamArgs(key)
		);
	}

	private getBaseUrl() {
		return this.extractBasePath(this.origin);
	}

	private getPath(key: PropertyKey) {
		return this.extractPath(this.origin.prototype[key]);
	}

	private getMethod(key: PropertyKey) {
		return this.extractMethod(this.origin.prototype[key]);
	}

	private extractReturnType(key: PropertyKey) {
		const returns = Reflect.getMetadata(RETURN_METADATA, this.origin.prototype[key]) || {};
		const functionReturnType = Reflect.getMetadata('design:returntype', this.origin.prototype, key as any);
		return {
			...returns,
			default: returns.default || functionReturnType,
		};
	}

	private extractBasePath(target: any): string {
		return Reflect.getMetadata(SCHEMA_METADATA, target);
	}

	private extractPath(target: any): string | string[] {
		return Reflect.getMetadata(PATH_METADATA, target);
	}

	private extractMethod(target: any): RequestMethod {
		return Reflect.getMetadata(METHOD_METADATA, target);
	}

	private extractParamArgs(key: PropertyKey) {
		return Reflect.getMetadata(ROUTE_ARGS_METADATA, this.origin.prototype.constructor, key as any);
	}
}
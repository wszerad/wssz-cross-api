import { Controller, ControllerOptions } from "@nestjs/common/decorators/core/controller.decorator";

export function AttachApi(apiSchema: any): ClassDecorator {
	return function AttachApiDecorator(target: any) {
		Object
			.getOwnPropertyNames(apiSchema.prototype)
			.forEach(key => {
				const fuu = apiSchema.prototype[key];

				if (key === 'constructor') {
					const options = Reflect.getMetadata(SCHEMA_METADATA, fuu);
					Controller(options)(target);
				}

				Reflect
					.getMetadataKeys(fuu)
					.forEach(meta => {
						Reflect.defineMetadata(meta, Reflect.getMetadata(meta, fuu), target.prototype[key]);
					});
			});
	}
}

export const SCHEMA_METADATA = 'wssz:schema';

export function Schema(path: string): ClassDecorator;
export function Schema(options: ControllerOptions): ClassDecorator;
export function Schema(options: any): ClassDecorator {
	return function SchemaDecorator(target: any) {
		Reflect.defineMetadata(SCHEMA_METADATA, options, target);
	}
}

export const RETURN_METADATA = 'wssz:return';

export function Return(key: string, type: any): MethodDecorator;
export function Return(type: any): MethodDecorator;
export function Return(...args: any[]): MethodDecorator {
	return function ReturnDecorator(target: any, propertyKey: PropertyKey, descriptor: PropertyDescriptor) {
		const type = args[args.length - 1];
		const key = args.length === 1 ? 'default' : args[0];
		const returns = Reflect.getMetadata(RETURN_METADATA, descriptor.value) || {};
		Reflect.defineMetadata(RETURN_METADATA, {...returns, [key]: type}, descriptor.value);
	}
}
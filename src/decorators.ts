export function AttachApi(apiSchema: any) {
	return function AttachApiDecorator(target: any) {
		Object
			.getOwnPropertyNames(apiSchema.prototype)
			.forEach(key => {
				const fuu = apiSchema.prototype[key];

				Reflect
					.getMetadataKeys(fuu)
					.forEach(meta => {
						Reflect.defineMetadata(meta, Reflect.getMetadata(meta, fuu), target.prototype[key]);
					});
			});
	}
}

export const RETURN_METADATA = 'wssz:return';

export function Return(key: string, type: any): Function;
export function Return(type: any): Function;
export function Return(...args: any[]) {
	return function ReturnDecorator(target: any, propertyKey: PropertyKey, descriptor: PropertyDescriptor) {
		const type = args[args.length - 1];
		const key = args.length === 1 ? 'default' : args[0];
		const returns = Reflect.getMetadata(RETURN_METADATA, descriptor.value) || {};
		Reflect.defineMetadata(RETURN_METADATA, {...returns, [key]: type}, descriptor.value);
	}
}
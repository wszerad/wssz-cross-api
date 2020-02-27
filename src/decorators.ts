export function AttachApi(apiSchema: any) {
    return function (target: any) {
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
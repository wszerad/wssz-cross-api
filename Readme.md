# @wssz/cross-api

> Declare common API for backend and frontend

> Call endpoint with full typing support just like local functions


### Example
* Full example in folder
```ts
    //shared.ts
    @Controller('test')
    export class TestSchema {
        @Post('/:endpoint')
        endpont(
            @Param('endpoint') p: string,
            @Query() q: {[key: string]: string | string[]},
            @Body() body: SomeBody
        ): string {
            return e;
        }
    }

    //backend.ts
    @AttachApi(TestSchema)
    export class TestController extends TestSchema {
        endpoint(p, q, body) {
            // some imlementation    
        }
    }

    //front.ts
    extractApi(TestSchema, xhrHandler).endpoint('path', { page: '1' }, { body: 'value' })
    
    function handler(uri: string, body: any, endpoint: Endpoint) {
        // Request for some data with axios, jQuery, etc.
        return new Promise((res, rej) => {
            res({
                uri,                                // 'test/path?page=1'
                body,                               // { body: 'value' }
                method: endpoint.method,            // post
                returnType: endpoint.returnType     // String
            });
        });
    }    
```
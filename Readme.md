# @wssz/cross-api

> Declare common API for backend and frontend

> Call endpoint with full typing support just like local functions

### Usage
> It based on [Nestjs](https://docs.nestjs.com/controllers) decorators like Post, Get, Body...
* Define Nestjs Controller like always but without methods implementations and dependencies.
* At backend extend your real Controller with "schema controller"
* Decorate class with @AttachApi and pass "schema controller" (it will copy your decorators)
* provide your implementation of xhr request factory (axios, jQuery, etc.)
* At front convert and cast "schema controller" with extractApi()
* use methods for calling endpoints!
 
#### @AttachApi(SchemaControllerClass)
> clone decorators from SchemaControllerClass to ControllerClass
#### @Return(key: string = 'default', type: any)
> Overwrite endpoint return type (useful for await where default type is Promise)
#### extractApi(SchemaControllerClass, xhrHandler): SchemaControllerClass
> Endpoint caller with typings 
```typescript
function xhrHandler(url: string, body: any, endpoint: Endpoint): Promise<any> {
    const {
        returnTypes,    // {[key]: type} - comes from @Return
        returnType,     // returnTypes.default
        uri,            // /path/:param
        method,         // post, get,...
    } = endpoint;
    // do some stuff
}
```


### Example
* Check [example](https://github.com/wszerad/wssz-cross-api/tree/master/example) for more
```typescript
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
    
    function xhrHandler(url: string, body: any, endpoint: Endpoint) {
        // Request for some data with axios, jQuery, etc.
        return axios({
            method: endpoint.method,
            url
        })      
    }    
```
import {ApiSchema, ApiData, ApiResponse} from "./ApiSchema";
import {apiHandler} from "../src";

export class ApiImplementation extends ApiSchema {
    async post(
        body: ApiData
    ): Promise<ApiResponse> {
        return Promise.resolve({
            status: 'ok'
        });
    }
}

function call(...args: any[]) {
    const requestInfo = apiHandler(ApiSchema).post;

    axios({
        method: requestInfo.method,
        url: `https://some.address/${requestInfo.payload(args)}`
    })
}

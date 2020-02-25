import {ApiSchema, ApiData, ApiResponse} from "./ApiSchema";
import {apiHandler} from "../src";

export class ApiImplementation extends ApiSchema {
    // async post(
    //     body: ApiData,
    //     kot: string
    // ): Promise<ApiResponse> {
    //     return Promise.resolve({
    //         status: 'ok'
    //     });
    // }
    async post(body: ApiData): Promise<ApiResponse> {
        return super.post(body);
    }
}

apiHandler(ApiSchema).post
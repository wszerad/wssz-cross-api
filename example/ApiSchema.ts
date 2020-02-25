import {ApiBody} from "../src";

export class ApiData {
    prop: string
}

export class ApiResponse {
    status: string;
}

export class ApiSchema {
    async post(
        @ApiBody() body: ApiData,
        ...args: any[]
    ): Promise<ApiResponse> {
        return;
    }
}
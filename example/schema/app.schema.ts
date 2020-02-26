import { ApiBody, ApiGet, ApiParam, ApiPost, ApiQuery } from '../../src';

export class ApiData {
    prop: string
}

export class ApiResponse {
    status: string;
}

export class ApiQueryObj {
	page: string
}

export class AppSchema {
    @ApiPost('/post', ApiResponse)
    async post(
        @ApiBody() body: ApiData,
        // For additional backend decorators like @Req
        ...args: any[]
    ): Promise<ApiResponse> {
        return;
    }

    @ApiGet('/get/:name')
    get(
        @ApiParam('name') param: string
    ): string {
        return param;
    }

	@ApiGet('/query/:name')
	query(
		@ApiParam('name') param: string,
		@ApiQuery() query: ApiQueryObj
	): ApiQueryObj {
		return query;
	}
}
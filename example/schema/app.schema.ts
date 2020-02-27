import {Body, Controller, Get, Param, Post, Query} from "@nestjs/common";

export class ApiData {
    prop: string
}

export class ApiResponse {
    status: string;
}

export class ApiQueryObj {
	page: string
}

@Controller('test')
export class AppSchema {
    @Post('/post')
    async post(
        @Body() body: ApiData,
        // For additional backend decorators like @Req
        ...args: any[]
    ): Promise<ApiResponse> {
        return;
    }

    @Get('/get/:name')
    get(
        @Param('name') param: string
    ): string {
        return param;
    }

	@Get('/query/:name')
	query(
		@Param('name') param: string,
		@Query() query: ApiQueryObj
	): ApiQueryObj {
		return query;
	}
}
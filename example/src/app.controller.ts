import {AppSchema, ApiData, ApiResponse} from '../schema/app.schema';
import {Controller} from '@nestjs/common';

@Controller('test')
export class AppController extends AppSchema {
    async post(
        body: ApiData
    ): Promise<ApiResponse> {
        return Promise.resolve({
            status: 'ok'
        });
    }
}
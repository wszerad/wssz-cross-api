import { AttachApi } from '../../src/decorators';
import { AppSchema, ApiData, ApiResponse } from '../schema/app.schema';

@AttachApi(AppSchema)
export class AppController extends AppSchema {
	async post(
		body: ApiData
	): Promise<ApiResponse> {
		return Promise.resolve({
			status: 'ok'
		});
	}
}
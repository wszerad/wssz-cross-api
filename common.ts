interface Res<S> {
    success: S
}

function endpoint<P, S>(params: P, response: Res<S>): Promise<S> {
    return Promise.resolve(response.success);
}

type Params<T> = { [P in keyof T]: T[P]}
type FCon<T> = new() => T;

function front<T>(api: FCon<T>): T {
    return new api();
}

function back<T>(api: FCon<T>): Params<T> {
    return new api() as any;
}

class Model {}

class Api {
    get(params: string) {
        return endpoint(params, {
            success: Model
        })
    }
}

front(Api).get('s')
const backs = back(Api);

function kot(test: typeof backs.get) {
    test('kot')
}
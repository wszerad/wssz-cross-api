
class Test {
    tt(tt: string) {

    }

    pies(kot: number) {}
}

class Test2 extends Test {
    tt(tt: string) {

    }

    pies(kot: number) {

    }
}

type Con<T> = new() => T;

function api<T>(Api: Con<T>) {
    return new Api();
}

api(Test).tt()
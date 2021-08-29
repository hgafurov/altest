import { ITest } from "../test/test.model";

export interface INatija {
    id?: any;
    username?: string;
    testId?: number;
    savolCount?: number;
    tjCount?: number;
}

export class Natija implements INatija{
    constructor(
        public id?: any,
        public username?: string,
        public testId?: number,
        public savolCount?: number,
        public tjCount?: number
    ) {
        this.id = id ? id : null;
        this.username = username ? username : "";
        this.testId = testId ? testId : 0;
        this.savolCount = savolCount ? savolCount : 0;
        this.tjCount = tjCount ? tjCount : 0;
    }
}

export interface INatijaVm {
    id?: any;
    test?: ITest;
    savolCount?: number;
    tjCount?: number;
}

export class NatijaVm implements INatijaVm{
    constructor(
        public id?: any,
        public test?: ITest,
        public savolCount?: number,
        public tjCount?: number
    ) {
        this.id = id ? id : null;
        this.test = test ? test : null!;
        this.savolCount = savolCount ? savolCount : 0;
        this.tjCount = tjCount ? tjCount : 0;
    }
}
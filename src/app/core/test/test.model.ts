import { ISavol } from "../savol/savol.model";

export interface ITest {
    id?: any;
    nomi?: string;
    fani?: string;
    razdel?: string;
    savols?: ISavol[];
    activated?: boolean;
    muallifi?: string;
}

export class Test implements ITest {

    constructor (
        public id?: any,
        public nomi?: string,
        public fani?: string,
        public razdel?: string,
        public savols?: ISavol[],
        public activated?: boolean,
        public muallifi?: string
    ) {
        this.id = id ? id : null;
        this.nomi = nomi ? nomi : null!;
        this.fani = fani ? fani : null!;
        this.razdel = razdel ? razdel: null!;
        this.savols = savols ? savols: null!;
        this.activated = activated ? activated : false;
        this.muallifi = muallifi ? muallifi : null!; 
    }
}
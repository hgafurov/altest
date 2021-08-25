import { IRndSavol } from "../savol/rnd-savol.model";

export interface IRndTest {
    id?: any;
    nomi?: string;
    fani?: string;
    razdel?: string;
    savols?: IRndSavol[];
    muallifi?: string;
}

export class RndTest implements IRndTest {

    constructor (
        public id?: any,
        public nomi?: string,
        public fani?: string,
        public razdel?: string,
        public savols?: IRndSavol[],
        public muallifi?: string
    ) {
        this.id = id ? id : null;
        this.nomi = nomi ? nomi : null!;
        this.fani = fani ? fani : null!;
        this.razdel = razdel ? razdel: null!;
        this.savols = savols ? savols: null!;
        this.muallifi = muallifi ? muallifi : null!; 
    }
}
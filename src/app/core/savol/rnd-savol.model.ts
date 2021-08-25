import { ISavol } from "./savol.model";

export interface IRndSavol {
    id?: any;
    savol?: string;
    tj?: number;
    javobs?: string[];
    fani?: string;
    razdel?: string;
    muallifi?: string;
    sj?: number;
}


export class RndSavol implements IRndSavol {
    
    constructor(
        public id?: any,
        public savol?: string,
        public tj?: number,
        public javobs?: string[],
        public fani?: string,
        public razdel?: string,
        public muallifi?: string
    ) {
        this.id = id ? id : null;
        this.savol = savol ? savol : null!;
        this.fani = fani ? fani : null!;
        this.razdel = razdel ? razdel : null!;
        this.muallifi = muallifi ? muallifi : null!;
        this.javobs = javobs ? javobs : null!

        let l = !!this.javobs?.length ? this.javobs?.length : 0 ;
        for (let i = 1; i < l; i++) {
            let r = getRandomInt(l-1) + 1;
            let vj = this.javobs![r];
            this.javobs![r] = this.javobs![i];
            this.javobs![i] = vj;
        }
        
        let r = getRandomInt(l);
        let vj = this.javobs![r];
        this.javobs![r] = this.javobs![0];
        this.javobs![0] = vj;
        this.tj = r;
    }
    
}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}
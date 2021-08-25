export interface ISavol {
    id?: any;
    savol?: string;
    tj?: string;
    j1?: string;
    j2?: string;
    j3?: string;
    j4?: string;
    fani?: string;
    razdel?: string;
    activated?: boolean;
    muallifi?: string;
    cartAdded: boolean;
}


export class Savol implements ISavol {
    
    cartAdded: boolean = false;
    
    constructor(
        public id?: any,
        public savol?: string,
        public tj?: string,
        public j1?: string,
        public j2?: string,
        public j3?: string,
        public j4?: string,
        public fani?: string,
        public razdel?: string,
        public activated?: boolean,
        public muallifi?: string
    ) {
        this.id = id ? id : null;
        this.savol = savol ? savol : null!;
        this.tj = tj ? tj : null!;
        this.j1 = j1 ? j1 : null!;
        this.j2 = j2 ? j2 : null!;
        this.j3 = j3 ? j3 : null!;
        this.j4 = j4 ? j4 : null!;
        this.fani = fani ? fani : null!;
        this.razdel = razdel ? razdel :null!;
        this.activated = activated ? activated : false;
        this.muallifi = muallifi ? muallifi : null!
    }
    
}
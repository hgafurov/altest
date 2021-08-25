
export interface IUser {
    id?: any;
    login?: string;
    ismi?: string;
    familiya?: string;
    otaIsmi?: string;
    tugSana?: Date;
    email?: string;
    telNum?: string;
    activated?: boolean; 
    roles?: any[];
}


export class User implements IUser {

    constructor(
        public id?: any,
        public login?: string,
        public ismi?: string,
        public familiya?: string,
        public otaIsmi?: string,
        public tugSana?: Date,        
        public email?: string,
        public telNum?: string,
        public activated?: boolean,  
        public roles?: any[]
    ) {
        this.id = id ? id : null;
        this.login = login ? login : null!;
        this.ismi = ismi ? ismi : null!;
        this.familiya = familiya ? familiya : null!;
        this.otaIsmi = otaIsmi ? otaIsmi : null!;
        this.tugSana = tugSana ? tugSana : null!;
        this.email = email ? email : null!
        this.telNum = telNum ? telNum : null!;
        this.activated = activated;
        this.roles = roles ? roles : null!; 
    }
}

export interface IPageUser {
    totalElements?: number;
    totalPages?: number;
    currentPage?: number;
    users?: IUser[];
}


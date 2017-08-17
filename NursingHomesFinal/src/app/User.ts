import { Person } from "./Person";
import { Home } from "./Home";

export class User {
    constructor
        (
        public fName: string,
        public sName:string,
        public email: string,
        public password: string,
        public phone: string,
        public people: Person[],
        public homes: Home[]
        ) {

    }

}
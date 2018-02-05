import { Person } from "./Person";
import { Home } from "./Home";

export class User {
    constructor
        (
        public name: string,
        public email: string,
        public password: string,
        public phone: string,
        public homes: Home[],
        public StripeId: string,
        public publicUser: boolean
        ) {
    }
}
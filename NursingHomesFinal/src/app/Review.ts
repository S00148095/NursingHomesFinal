export class Review {
    constructor
        (
        public reviewID:string,
        public user: string,
        public care: number,
        public cleanliness: number,
        public staff: number,
        public dignity: number,
        public food:number,
        public facilities:number,
        public management: number,
        public rooms: number,
        public safety: number,
        public value: number,
        public location:number,
        public activities:number,
        public overall:number,
        public comment: string,
        public agreed:string[],
        public disagreed:string[],
        public response: string
        ) {

    }

}
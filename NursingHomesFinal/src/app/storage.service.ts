import { Injectable } from '@angular/core';
import { Home } from "./Home";
import { Homes } from "./mock-homes";
import { User } from "./User";
import { Person } from "./Person";
import { Review } from "./Review";
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class StorageService {
    Homes: Home[];
    CurrentUser: User = null;
    CurrentHome: Home = null;
    Criteria: string[] = ["rating", ""];
    address: string;
    needsACheck: boolean;
    uid: any;
    firebaseURL: string = 'https://cmoo-a7730.firebaseio.com/';

    constructor(private afa: AngularFireAuth, private http: HttpClient) {
        this.afa.authState.subscribe((resp) => {
            if (resp != null) {
                if (resp.uid) {
                    this.uid = resp.uid;
                }
            }
        });
    }

    getNeedsACheck() {
        return this.needsACheck;
    }
    updateCheck(value) {
        this.needsACheck = value;
    }
    updateAddress(address) {
        this.address = address;
    }
    getAddress() {
        return this.address;
    }
    updateHomes(Homes) {
        this.Homes = Homes;
    }
    getHomes(): Observable<any> {
        return this.http.get(this.firebaseURL + "homes.json");
    }
    getCurrentHome(id): Observable<any> {
        return this.http.get(this.firebaseURL + "homes/"+ id +".json");
    }
    setCurrentHome(Home: Home): void {
        this.CurrentHome = Home;
    }
    getUser(): Observable<any> {
        return this.http.get(this.firebaseURL + "users/" + this.uid + ".json");
    }
    setCriteria(criteria: string[]): void {
        this.Criteria = criteria;
    }
    getCriteria(): string[] {
        return this.Criteria;
    }
    UpdateReviews(Review: Review): void {
        this.CurrentHome.reviews.push(Review);
    }
}
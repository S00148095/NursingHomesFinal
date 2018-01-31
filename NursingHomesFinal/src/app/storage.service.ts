import { Injectable } from '@angular/core';
import { Home } from "./Home";
import { User } from "./User";
import { Person } from "./Person";
import { Review } from "./Review";
import { Image } from './Image';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';

@Injectable()
export class StorageService {
    Homes: Home[];
    CurrentUser: User = null;
    CurrentHome: Home = null;
    Criteria: string[] = ["rating", ""];
    address: string;
    needsACheck: boolean;
    firebaseURL: string = 'https://cmoo-a7730.firebaseio.com/';

    constructor(private afa: AngularFireAuth, private http: HttpClient, private router: Router,  public toastr: ToastsManager) {
    
     }

    submitHomes(Homes: Home[]) {
        this.afa.authState.subscribe((resp) => {
            if (resp != null) {
                if (resp.uid) {
                    this.http.post(this.firebaseURL + "submissions/" + resp.uid +".json", this.FormatSubmission(Homes, resp.uid)).subscribe(params => {
                    this.showSuccess("Application submitted, we will contact you within 24 hours");
                    });
                }
            }
        });
    }  
    showSuccess(message:string) {
      this.toastr.success(message);
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
    updateHome(Home: Home) {
        this.afa.authState.subscribe((resp) => {
            if (resp != null) {
                if (resp.uid) {
                    this.http.patch(this.firebaseURL + "homes/" + Home.ID + ".json", this.Format(Home)).subscribe(params => {
                        this.http.patch(this.firebaseURL + "users/" + resp.uid + "/homes/" + Home.ID + ".json", this.Format(Home)).subscribe(params => {
                        });
                    });
                }
            }
        });
    }
    FormatSubmission(Homes: Home[], uid: string) {
        var postdata = {
            "uid": uid,
            "homes": Homes
        }
        return postdata
    }
    Format(Home: Home) {
        var postdata = {
            "name": Home.name,
            "address": Home.address,
            "county": Home.county,
            "country": Home.country,
            "phone": Home.phone,
            "email": Home.email,
            "contact": Home.contact,
            "site": Home.site,
            "beds": Home.beds,
            "staff": Home.staff,
            "description": Home.description,
            "careTypes": Home.careTypes,
            "facilities": Home.facilities,
            "rating": Home.rating
        }
        return postdata
    }
    FormatReview(Review: Review) {
        var postdata = {
            "reviewID": Review.reviewID,
            "user": Review.user,
            "care": Review.care,
            "cleanliness": Review.cleanliness,
            "staff": Review.staff,
            "dignity": Review.dignity,
            "food": Review.food,
            "facilities": Review.dignity,
            "management": Review.management,
            "rooms": Review.rooms,
            "safety": Review.safety,
            "value": Review.value,
            "location": Review.location,
            "activities": Review.activities,
            "overall": Review.overall,
            "comment": Review.comment,
            "agreed": Review.agreed,
            "disagreed": Review.disagreed,
            "response": Review.response
        }
        return postdata
    }
    getHomes(): Observable<any> {
        return this.http.get(this.firebaseURL + "homes.json");
    }
    getCurrentHome(id): Observable<any> {
        return this.http.get(this.firebaseURL + "homes/" + id + ".json");
    }
    setCurrentHome(Home: Home): void {
        this.CurrentHome = Home;
    }
    getUser(uid): Observable<any> {
        return this.http.get(this.firebaseURL + "users/" + uid + ".json");
    }
    setCriteria(criteria: string[]): void {
        this.Criteria = criteria;
    }
    getCriteria(): string[] {
        return this.Criteria;
    }
    UpdateReviews(Home: Home, Review: Review): void {
        this.afa.authState.subscribe((resp) => {
            if (resp != null) {
                if (resp.uid) {
                    this.http.patch(this.firebaseURL + "homes/" + Home.ID + "/reviews/" + Review.reviewID + ".json", this.FormatReview(Review)).subscribe(params => {
                        this.http.patch(this.firebaseURL + "users/" + resp.uid + "/homes/" + Home.ID + "/reviews/" + Review.reviewID + ".json", this.FormatReview(Review)).subscribe(ret => {
                            var total = 0;
                            var reviews = [];
                            for (var k in Home.reviews) {
                                reviews.push(Home.reviews[k]);
                            }
                            reviews.forEach(element => {
                                total += element.overall;
                            });
                            Home.rating = total / reviews.length;
                            this.updateHome(Home);
                        });
                    });
                }
            }
        });
    }
}
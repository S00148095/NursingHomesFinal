import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
@Injectable()
export class PaymentService {
  userId: string;
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((auth) => {
      if (auth) this.userId = auth.uid
    });
  }
   processPayment(token: any, array: any) {
     const payment = { token:token, houses: array }
     return this.db.list(`/payments/${this.userId}`).push(payment)
   }
}
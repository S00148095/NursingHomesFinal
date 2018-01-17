const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase);
const stripe = require('stripe')('sk_test_LtS2n7Uh6j8VneCZxqeTGkDh')
//const stripe = require('stripe')(functions.config().stripe.testkey)

exports.stripeCharge = functions.database
  .ref('/payments/{userId}/{paymentId}')
  .onWrite(event => {
    console.log("written to db");
    const payment = event.data.val();
    const userId = event.params.userId;
    const houses = payment.houses;

    return admin.database()
      .ref(`/users/${userId}`)
      .once('value')
      .then(snapshot => {
        return snapshot.val();
      })
      .then(customer => {
        console.log("about to charge");
        stripe.subscriptions.retrieve("sub_C7MXNSP4pBndEn", function (err, subscription) {
          var standardQuantity = 0, bronzeQuantity = 0, silverQuantity = 0, goldQuantity = 0, diamondQuantity = 0;
          var id0, id1, id2, id3, id4;
          id0 = subscription.items.data[0].id;
          id1 = subscription.items.data[1].id;
          id2 = subscription.items.data[2].id;
          id3 = subscription.items.data[3].id;
          id4 = subscription.items.data[4].id;

          houses.forEach(element => {
            switch (element.tier) {
              case 0:
                standardQuantity++;
                break;
              case 1:
                bronzeQuantity++;
                break;
              case 2:
                silverQuantity++;
                break;
              case 3:
                goldQuantity++;
                break;
              case 4:
                diamondQuantity++;
                break;
            }
          });

          return stripe.subscriptions.update("sub_C7MXNSP4pBndEn", {
            items: [
              {
                id: id0,
                plan: "StandardMonth",
                quantity: standardQuantity
              },
              {
                id: id1,
                plan: "BronzeMonth",
                quantity: bronzeQuantity
              },
              {
                id: id2,
                plan: "SilverMonth",
                quantity: silverQuantity
              },
              {
                id: id3,
                plan: "GoldMonth",
                quantity: goldQuantity
              },
              {
                id: id4,
                plan: "DiamondMonth",
                quantity: diamondQuantity
              }
            ]
          }, function (err, subscription) {
            // asynchronously called
          });
        })
      }
      );

    /* 
  .then(charge => {
    console.log("about to write charge");
    admin.database()
      .ref(`/payments/${userId}/${paymentId}/sub`)
      .set(charge)
  }) */
  });
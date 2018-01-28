const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase);
const stripe = require('stripe')('sk_test_LtS2n7Uh6j8VneCZxqeTGkDh');

function updateHomes(homes, userID) {
  var updates = {};
  for (i = 0; i < homes.length; i++) {
    updates['/homes/' + homes[i].id + '/tier'] = homes[i].tier;
    updates['/users/' + userID + '/homes/' + homes[i].id + '/tier'] = homes[i].tier;
  }
  return updates;
}
function updateUser(userId,id)
{
  var updates={
  };
  updates['/users/' + userId + '/StripeId'] = id;
  return updates;
}
exports.stripeCreate = functions.database
  .ref('/submissions/{userId}')
  .onWrite(event => {
    const userId = event.params.userId;

    return admin.database()
      .ref(`/users/${userId}`)
      .once('value')
      .then(snapshot => {
        return snapshot.val();
      })
      .then(val => {
        var email=val.email;

        stripe.customers.create({
          email: email
        }, function(err, customer) {
          var updates={};
          updates = updateUser(userId,customer.id);
          return admin.database().ref().update(updates);
        });
      });
  });
exports.stripeCharge = functions.database
  .ref('/payments/{userId}/{paymentId}')
  .onWrite(event => {
    const payment = event.data.val();
    const userId = event.params.userId;
    const homes = payment.homes;
    const term = payment.term;
    const stripeID = payment.stripeID;
    const token = payment.token.id;
    var items;
    var standardQuantity = 0, bronzeQuantity = 0, silverQuantity = 0, goldQuantity = 0, diamondQuantity = 0;

    return admin.database()
      .ref(`/users/${userId}`)
      .once('value')
      .then(snapshot => {
        return snapshot.val();
      })
      .then(val => {
        stripe.customers.retrieve(
          stripeID,
          function (err, customer) {
            if (customer.subscriptions.data.length == 0) {
              homes.forEach(element => {
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
              items = [
                {
                  plan: "Standard" + term,
                  quantity: standardQuantity
                },
                {
                  plan: "Bronze" + term,
                  quantity: bronzeQuantity
                },
                {
                  plan: "Silver" + term,
                  quantity: silverQuantity
                },
                {
                  plan: "Gold" + term,
                  quantity: goldQuantity
                },
                {
                  plan: "Diamond" + term,
                  quantity: diamondQuantity
                }
              ]
              stripe.subscriptions.create({
                customer: customer.id,
                items: items,
                source: token
              }, function (err, subscription) {
                var updates = {};
                updates = updateHomes(homes, userID);

                return admin.database().ref().update(updates);
              });
            }
            else {
              stripe.subscriptions.retrieve(customer.subscriptions.data[0].id, function (err, subscription) {
                var id0, id1, id2, id3, id4;
                id0 = subscription.items.data[0].id;
                id1 = subscription.items.data[1].id;
                id2 = subscription.items.data[2].id;
                id3 = subscription.items.data[3].id;
                id4 = subscription.items.data[4].id;

                homes.forEach(element => {
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
                items = [
                  {
                    id: id0,
                    plan: "Standard" + term,
                    quantity: standardQuantity
                  },
                  {
                    id: id1,
                    plan: "Bronze" + term,
                    quantity: bronzeQuantity
                  },
                  {
                    id: id2,
                    plan: "Silver" + term,
                    quantity: silverQuantity
                  },
                  {
                    id: id3,
                    plan: "Gold" + term,
                    quantity: goldQuantity
                  },
                  {
                    id: id4,
                    plan: "Diamond" + term,
                    quantity: diamondQuantity
                  }
                ]

                return stripe.subscriptions.update(customer.subscriptions.data[0].id, {
                  items: items,
                  source: token
                }, function (err, subscription) {
                  var updates = {};
                  updates = updateHomes(homes, userId);

                  return admin.database().ref().update(updates);
                });
              })
            }
          }
        );
      }
      );
  });
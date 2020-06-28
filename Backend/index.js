//749444951270778864962203
//unreached software's into the woods software
//backend private code not to be published
const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
// The Cloud Functions for Firebase SDK to create Cloud 2Functions and setup triggers.
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
var nodemailer = require('nodemailer');

/* const nodemailer=require('nodemailer')
const cors=require('cors')({orgin: true})
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'Your gmail username',
        pass: 'your gmail password'
    }
});*/
admin.initializeApp();
 
exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {


    // ...

    
        var nodemailer = require('nodemailer');
        let db = admin.firestore();


        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'Your gmail username',
            pass: 'your gmail password'
        }
        });
        console.log(user.email)


        var mailOptions = {
        from: 'cyrus@hampermill.com',
        to:user.email,
        subject: 'Welcome to Into The Woods',
        html: '<!doctype html><html><head><style>.main_message{text-align: center;padding: 70px 0;}.hello{ background-image: url("https://image.freepik.com/free-vector/lovely-welcome-composition-with-flat-design_23-2147920507.jpg");}.cen{text-align: center;}</style></head><body><section class="hello"><h1 class="main_message">Welcome to Into The Woods</h1></section><p class="cen">Dear '+user.email+'<br>Welcome to Into The Woods you now have an account you can begin using it right away!<br>Thank You</p></body></html>'
        };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });
        
/*         let ref=db.collection("user_data").doc(user.uid);
        let getDoc=ref.get()
          .then(doc=> {
              if(!doc.exists){
                  console.log("error user data not found")
              }else{
                  console.log("new user file: "+doc.data())
                  if (doc.data().admin==1){
                    console.log("needs custstom auth claim")
                    admin.auth().setCustomUserClaims(user.uid, {admin: true}).then(() => {
                        // The new custom claims will propagate to the user's ID token the
                        // next time a new one is issued.
                        console.log("custom auth claim issued will come into affect when a new token has been issued.")
                      });

                      
                  }
              }
          }

          ) */
        



});
exports.minttoken=functions.auth.user().onCreate((user)=>{
    console.log("starting delay")
    setTimeout(() => {
        
        
    
    let db = admin.firestore();
    let ref=db.collection("user_data").doc(user.uid);
    let getDoc=ref.get()
      .then(doc=> {
          if(!doc.exists){
              console.log("error user data not found")
          }else{
              console.log("new user file: "+doc.data())
              if (doc.data().admin==1){
                console.log("needs custstom auth claim")
                admin.auth().setCustomUserClaims(user.uid, {admin: true}).then(() => {
                    // The new custom claims will propagate to the user's ID token the
                    // next time a new one is issued.
                    console.log("custom auth claim issued will come into affect when a new token has been issued.")
                  });

                  
              }
          }
      }

      )
    }, 5000);
})
exports.useWildcard = functions.firestore
    .document('user_data/{userId}')
    .onWrite((change, context) => {
      // If we set `/users/marie` to {name: "Marie"} then
      // context.params.userId == "marie"
      // ... and ...
      // change.after.data() == {name: "Marie"}
      console.log(change.after.data())
      if(change.after.data().points%10==0){
          console.log("new level detected")
          if(change.after.data().points>0){
              //new level aboove 0 send email
              var nodemailer = require('nodemailer');

              var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                  user: 'your gmail username',
                  pass: 'your gmail password'
              }
              });
      
      
              var mailOptions = {
              from: 'cyrus@hampermill.com',
              to:change.after.data().email,
              subject: 'Congratulations',
              html: '<h1>Congratulations!</h1><h2>You have leveled up!</h2><br><p>Hello '+change.after.data().name+'<br>You are now on level '+change.after.data().points/10+'<hr>From Into The Woods.<br>This email was sent to update you on alerts on your Into The Woods account</p>'
              };
      
              transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                  console.log(error);
              } else {
                  console.log('Email sent: ' + info.response);
              }
              });
              

          }
      }
    });
    exports.Hackprotections = functions.firestore
    .document('user_data/{UserId}')
    .onCreate(event => {
        
      });
exports.itwapicampicadd=functions.https.onRequest((req,res)=>{
    console.log(req)
    console.log(req)
    console.log("function triggered by a HTTP request.")
    const conversationID = req.query.conversationID;
    const currentUserID = req.query.currentUserID;
    console.log("conversationID", conversationID, "currentUserID", currentUserID);
});
//exports.gather_book_data=functions.firestore
  //  .document('books/{isbn}')
   // .onCreate((change,context)=>{
     //   var promise1 = new Promise(function(resolve, reject) {
  
         
        
       // let db = admin.firestore();
        //context.params.isbn
       // const rp = require('request-promise');
       // const url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:'+context.params.isbn+'&country=GB';

       // rp(url)
  //.then(function(html){
    //success!
    //console.log(html);
    //let aTuringRef = db.collection('books').doc(context.params.isbn);
    //console.log(context.params.isbn)
//console.log("writing to document")
//let setAlan = aTuringRef.update({
 // auto_gather:html
//})
//return
  
//  }) 
  //.catch(function(err){
    //handle error
    //console.log("error"+err)
  //});
  //resolve("finished")
//});

    

    
  

//    })
exports   
exports.tokenverif = functions.auth.user().onCreate((user) => {
});

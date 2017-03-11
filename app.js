var provider = new firebase.auth.GoogleAuthProvider();
var user;
var name, email, photoUrl, uid, emailVerified;

var userref = firebase.database().ref();

function signInGoogle(){
firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  user = result.user;

  if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid; 
  }

  location.replace("testmap.html");

  userRef.child("Name").set(name);
  userRef.child("Email").set(email);
  userRef.child("PhotoUrl").set(photoUrl);
  userRef.child("UserId").set(uid);

  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
  console.log(error);
});
}

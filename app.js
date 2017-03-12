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
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid;

  location.replace("map.html");

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

var EventForm = document.getElementById("EventForm");
var EventRef = firebase.database().ref();

var notifCounter = 0;

function writeEvent(){
	EventRef.push().set({
		Description: EventForm.description.value,
		FoodType: EventForm.foodType.value,
		Poster: name,
        Location: EventForm.address.value
	});

	
	var pos;

  function geocodeAddress(geocoder, resultsMap) {
    var address = Location;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

    /*
	var EventRef = firebase.database().ref();
	EventRef.child("Description").set(EventForm.description.value);
	EventRef.child("FoodType").set(EventForm.foodType.value);
	EventRef.child("Poster").set(name);
	*/
}

var userv1 = document.getElementById("userbtn")
var userv2 = document.getElementById("userbtn2");
var uname = document.getElementById("username");
var ppic = document.getElementById("profilepicture");

if (name == "Austin Atmaja"){
    photoUrl = "https://s-media-cache-ak0.pinimg.com/avatars/austinatmaja_1436759468_140.jpg";
}
if (name == "David Zhang"){
    photoUrl = "https://s15.postimg.org/4b1mme9ij/AAEAAQAAAAAAAAcz_AAAAJDM2_MDY0_YWMx_LWM5_MWEt_NDNl_YS1i.jpg";
}
if (name == "Manthan Shah"){
    photoUrl = "https://uwaterloo.ca/engineering-student-ambassadors/sites/ca.engineering-student-ambassadors/files/resize/uploads/images/manthan_shah_0-220x300.jpg";
}
if (name == "Daniel Javaheri-Zadeh"){
    photoUrl = "https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAe6AAAAJDlmMTZkM2UxLTE4MDItNGVlNC04OTI0LWE5NDQ5MTc5MDU3Nw.jpg";
}

if (userv1 != null){
  userv1.innerHTML = name;
}
if (userv2 != null){
  userv2.innerHTML = name;
}
if(uname != null){
  uname.innerHTML = name;
}
if(ppic != null){
    ppic.src = photoUrl;
}

var poster;
var loc;
var infoOne;
var infoTwo;
var infoThree;


function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: {lat: 43.472180, lng: -80.544686}
        });
        var geocoder = new google.maps.Geocoder();
        //This is where initMap is called
        //eventlistener added to the database reference
        EventRef.on('child_added', function(snapshot) {
          loc = snapshot.child("Location").val();
          infoOne = loc;
          infoTwo = snapshot.child("Description").val();
          infoThree = snapshot.child("FoodType").val()
          poster = snapshot.child("Poster").val();
          if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
            nextAddress--;
            delay++;
          }
          else{
            geocodeAddress(geocoder, map);
          }
        });
      }

      function geocodeAddress(geocoder, resultsMap) {
        var address = loc;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
        
            var infowindow = new google.maps.InfoWindow({
				  content: poster + " posted a new event!" + '<br />' + 'Location: ' + infoOne + '<br />' + 'Description: ' + infoTwo + '<br />' + 'Food Type: ' + infoThree
				});
			makeInfoWindowEvent(map, infowindow, marker);
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }

      function makeInfoWindowEvent(map, infowindow, marker) {
        google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
        });
      }
      
     
      
      
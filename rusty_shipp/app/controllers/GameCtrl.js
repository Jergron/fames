app.controller("GameCtrl", 
  ["$scope",
  "$firebaseArray",
  "$firebaseObject",
  "Auth",
  "$firebase",
  "currentAuth",
  function($scope, $firebaseArray, $firebaseObject, Auth, $firebase, currentAuth) {
    var ref = new Firebase("https://testcap.firebaseio.com/users");
    var authData = ref.getAuth();
    $scope.userDetails = {};
    $scope.users = $firebaseObject(ref);


    //Authenticates user to firebase data
    $scope.auth = Auth;

    // Any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;

      // Populates the DOM with data from firebase
    
    });

  
    $scope.updateUser = function () {
      var baseRef = new Firebase("https://testcap.firebaseio.com/users");
      var authInfo = baseRef.getAuth();
      var fbId = authInfo.uid;

      var dataRef = new Firebase("https://testcap.firebaseio.com/users/" + fbId);
      var users = $firebaseObject(dataRef); 

      users.$bindTo($scope, "userDetails", function() {

      });

    };

   
  }
]);
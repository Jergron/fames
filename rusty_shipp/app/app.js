var app = angular.module('capstone', ['ngRoute', 'firebase']);

app.run(["$rootScope", "$location", function($rootScope, $location) {
  // Firebase router authentication
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    // We can catch the error thrown when the $waitForAuth promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      $location.path("/");
    }
  });
}]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'partials/login.html',
        controller: 'LogCtrl'
        
      }) 
      .when('/game', {
        templateUrl: 'partials/game.html',
        controller: 'Preloader',
        resolve: {
          // controller will not be loaded until $waitForAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          "currentAuth": ["Auth", function(Auth) {
            // $waitForAuth returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            
            return Auth.$waitForAuth();
          }]
        }
        
      })
      .otherwise({
        redirectTo: '/'
      });
  }
]);
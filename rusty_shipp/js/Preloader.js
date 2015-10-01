app.controller("Preloader", 
  ["$scope",
  "$firebaseArray",
  "$firebaseObject",
  "Auth",
  "$firebase",
  "currentAuth",
  function($scope, $firebaseArray, $firebaseObject, Auth, $firebase, currentAuth) {
    var ref = new Firebase("https://testcap.firebaseio.com/users");
    var authData = ref.getAuth();
    var assets = $firebaseObject(ref.child(authData.uid).child("assets"));
    var player;


    var dataRef = new Firebase("https://testcap.firebaseio.com/users/" + authData.uid);
    var users = $firebaseObject(dataRef); 

    console.log("assets", assets);

    $scope.userDetails = {};


    assets.$loaded().then(function() {
    console.log("player", assets.player); // "bar"
    console.log("enemy", assets.enemy); // "bar"
    player = assets.player;
    });
    
    console.log("player", player);
    //Authenticates user to firebase data
    $scope.auth = Auth;

    // Any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;

      // Populates the DOM with data from firebase
    });

    PhaserGame.Preloader = function (game) {

    };


      users.$loaded().then(function() {
        var playerAsset = users.assets.player;
        console.log("assets player", playerAsset);

      });

    PhaserGame.Preloader.prototype = {
      preload: function () {
        //Load the elements from the Boot.js for the splash screen
        this.load.tilemap('title', 'assets/title-screen.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tanks', 'assets/15_tank_set 68x68.png');

        //Load the rest of the element for our game
        //This adds the json file from tiles of the map and my images
        this.load.tilemap('map', 'assets/river-defense.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('terrain', 'assets/terrain_atlas.png');
        this.load.image('turrets', 'assets/turrets32.png');

        for (var i = 1; i < 32; i++) {
          this.load.image('tank' + i, 'assets/enemy' + i + '.png');
        };

        for (var i = 1; i < 9; i++) {
          this.load.image('turret' + i, 'assets/turret' + i + '.png')
        };

        this.load.image('bullet', 'https://s3.amazonaws.com/fames/6ef257e8-a4b1-4559-85a5-1d9942e3ee27/diamond.png');
        this.load.image('bullet1', 'https://s3.amazonaws.com/fames/6ef257e8-a4b1-4559-85a5-1d9942e3ee27/diamond.png');

        this.load.spritesheet('explosion', 'assets/explosion192.png', 192, 192);
        this.load.image('coin', 'assets/coin64.png');
        this.load.audio('menuBackgroundMusic', 'assets/superhappycheesyloop1of2.wav');
        this.load.audio('backgroundMusic', 'assets/superhappycheesyloop2of2.wav');
        this.load.audio('cashRegister', 'assets/cash-register.mp3');
        this.load.audio('explosion', 'assets/explosion.wav');
        this.load.audio('shot', 'assets/gun-shot.wav');

        var welcome = game.add.text(100, 100, 'coming...', {font: '30px Courier', fill: '#eeeeee'});


      },

      create: function () {

        this.state.start('MainMenu');

      }
    };

   
    game.state.add('Preloader', PhaserGame.Preloader);
  }
]);






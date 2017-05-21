function AuthConfig($stateProvider, $httpProvider) {
  'ngInject';

  $stateProvider
    .state('app.login', {
      url: '/login',
      controller: 'AuthCtrl as $ctrl',
      templateUrl: 'auth/login.html',
      title: 'Sign in',
      // onEnter: function($state, User) {
      //   if(User.isLoggedIn()){
      //     $state.go('app.home');
      //   }
      // }
    })
    .state('app.register', {
      url: '/register',
      controller: 'AuthCtrl as $ctrl',
      templateUrl: 'auth/register.html',
      title: 'Sign up',
      // onEnter: function($state, User){
      //   if(User.isLoggedIn()){
      //     $state.go('app.home');
      //   }
      // }
    });

}

export default AuthConfig;

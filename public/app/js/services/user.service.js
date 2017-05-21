export default class User {
  constructor(AppConstants, $window, $http, $state) {
    'ngInject';

    //this._JWT = JWT;
    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$window = $window;
    this._$state = $state;

    this.current = null;

  }

  saveToken(token) {
     this._$window.localStorage[this._AppConstants.jwtKey] = token;
   }

   getToken() {
     return this._$window.localStorage[this._AppConstants.jwtKey];
   }

   destroyToken() {
     this._$window.localStorage.removeItem(this._AppConstants.jwtKey);
   }


   register(user) {
     return this._$http({
       url: this._AppConstants.api + '/users' + '/register',
       method: 'POST',
       data: user
     }).then((res) => {
        this.current = res.data.user;
        return res;
      });
   }

    logIn(user) {
      return this._$http({
        url: this._AppConstants.api + '/users' + '/login',
        method: 'POST',
        data: user
      }).then((res) => {
        this.current = res.data.user;
        return res;
      });
    }

    LoggedIn() {
      var token = this.getToken();

       if(token){
         var payload = JSON.parse(this._$window.atob(token.split('.')[1]));

         return payload.exp > Date.now() / 1000;
       } else {
         return false;
       }
    }

    CrntUser() {
         var token = this.getToken();
         var payload = JSON.parse(this._$window.atob(token.split('.')[1]));

         this.current = payload.username;
         return payload.username;
    }

    currentUser() {
      if(this.LoggedIn()){
         return this.CrntUser();
       }
    }

}

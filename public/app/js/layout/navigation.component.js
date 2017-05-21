class NavigationCtrl {
  constructor(AppConstants, User, $window, $state) {
    'ngInject';

    this.appName = AppConstants.appName;
    this._User = User;
    this._$window = $window;
    this._$state = $state;

  }

  isLoggedIn() {
    return this._User.LoggedIn();
  }

  currentUser() {
    return this._User.currentUser();
  }

  logOut() {
    this._User.destroyToken();
  }

}

let Navigation = {
  controller: NavigationCtrl,
  templateUrl: 'layout/navigation.html'
};

export default Navigation;

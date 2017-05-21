class AuthCtrl {
  constructor(User, $state) {
    'ngInject';

    this._User = User;
    this._$state = $state;

    this.title = $state.current.title;

  }

  register() {
    this._User.register(this.user).then(
      (res) => {
        this._User.saveToken(res.data.token);
        this._$state.go('app.home');
      },
      (error) => {
        this.error = error.data;
      }
    );
  }

  logIn() {
    this._User.logIn(this.user).then(
      (res) => {
        this._User.saveToken(res.data.token);
        this._$state.go('app.home');
      },
      (error) => {
        this.error = error.data;
      }
    );
  }


  // submiyForm() {
  //   this.isSubmiting = true;
  //   this._User.attemptAuth(this.authType, this.formData).then(
  //     (res) => {
  //       this._$state.go('app.home');
  //     },
  //     (err) => {
  //       this.isSubmiting = false;
  //       //console.log(err.data.errors.message);
  //       this.errors = err.data.errors;
  //     }
  //   );
  // }

}

export default AuthCtrl;

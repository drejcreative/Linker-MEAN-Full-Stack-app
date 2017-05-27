class HomeCtrl {
  constructor(AppConstants, Post, User, $window, toastr) {
    'ngInject';

    this.appName = AppConstants.appName;
    this._Post = Post;
    this._User = User;
    this._$window = $window;
    this._toastr = toastr;

    this.today = new Date();
    this.limit = 12;

    this.isDisabled = false;

    this._Post.getAll().then(
      (posts) => {
        this.posts = posts;
      }
    );

  }

  getUser() {
    var token = this._User.getToken();
    var payload = JSON.parse(this._$window.atob(token.split('.')[1]));

    this.current = payload.username;
    return this.current;
  }

  isLoggedIn() {
    return this._User.LoggedIn();
  }

  addPost(){
    if(!this.title || this.title === '') { return; }

    this.getUser();

    this._Post.create({
      title: this.title,
      link: this.link,
      author: this.current,
      date: this.today
    }).then(
      (posts) => {
        this.posts.push(posts);
      },
      (err) => {
        this.errors = err.data.errors;
      }
    );

    this.title = '';
    this.link = '';
  }

  incrementUpvotes(post) {

    this.getUser();

    if(this.current === post.author) {
      this._toastr.error('You canot upvote your own post!');
    } else {
      this._Post.upvote(post).then(
        (res) => {
          post.upvotes += 1;
          this.isDisabled = true;
        },
        (err) => {
          this.errors = err.data.errors;
        }
      );
    }

  }



}

export default HomeCtrl;

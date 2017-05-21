class HomeCtrl {
  constructor(AppConstants, Post, User, $window) {
    'ngInject';

    this.appName = AppConstants.appName;
    this._Post = Post;
    this._User = User;
    this._$window = $window;

    //Read from service
    //this.posts = this._Post.posts;
    //this.posts = posts;

    this.today = new Date();
    this.limit = 12;

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
    // this.posts.push({
    //   title: this.title,
    //   link: this.link,
    //   upvotes: 0,
    //   comments: [
    //     {author: 'Joe', body: 'Cool post!', upvotes: 0},
    //     {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
    //   ]
    // });
    this.title = '';
    this.link = '';
  }

  incrementUpvotes(post) {
    //post.upvotes += 1;
    this._Post.upvote(post).then(
      (res) => {
        post.upvotes += 1;
      },
      (err) => {
        this.errors = err.data.errors;
      }
    );
  }



}

export default HomeCtrl;

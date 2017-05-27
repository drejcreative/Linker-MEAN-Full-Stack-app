class PostsCtrl {
  constructor(AppConstants, Post, post, $stateParams, $window, toastr, User) {
    'ngInject';

    this.appName = AppConstants.appName;
    this._Post = Post;
    this._User = User;
    this._$window = $window;
    this._toastr = toastr;

    //Read from service
    //this.post = Post.posts[$stateParams.id];
    this.post = post;
    this.today = new Date();
    this.limit = 8;

    this.isDisabled = false;

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

  addComment(){
    if(this.body === '') { return; }
    this._Post.addComment(this.post._id, {
      body: this.body,
      author: 'user',
      date: this.today
    }).then(
      (comment) => {
        this.post.comments.push(comment.data);
      },
      (err) => {
        this.errors = err.data.errors;
      }
    );
    // this.post.comments.push({
    //   body: this.body,
    //   author: 'user',
    //   upvotes: 0
    // });
    this.body = '';
  }

  incrementUpvotes(comment) {
    this.getUser();

    if(this.current === comment.author) {
      this._toastr.error('You canot upvote your own post!');
    } else {
      this._Post.upvoteComment(this.post, comment).then(
        (res) => {
          comment.upvotes += 1;
          this.isDisabled = true;
        },
        (err) => {
          this.errors = err.data.errors;
        }
      );
    }
  }


}

export default PostsCtrl;

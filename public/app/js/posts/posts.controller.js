class PostsCtrl {
  constructor(AppConstants, Post, post, $stateParams, User) {
    'ngInject';

    this.appName = AppConstants.appName;
    this._Post = Post;
    this._User = User;

    //Read from service
    //this.post = Post.posts[$stateParams.id];
    this.post = post;
    this.today = new Date();
    this.limit = 8;

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
    this._Post.upvoteComment(this.post, comment).then(
      (res) => {
        comment.upvotes += 1;
      },
      (err) => {
        this.errors = err.data.errors;
      }
    );
  }


}

export default PostsCtrl;

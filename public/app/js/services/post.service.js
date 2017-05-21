export default class Post {
  constructor(AppConstants, $http, User) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._User = User;

    this.posts = null;

  }

  //Get all posts
  getAll() {
    return this._$http({
      url: this._AppConstants.api + '/posts',
      method: 'GET'
    }).then(
      (res) => {
        this.posts = res.data;
        return res.data;
      }
    );
  }

  //Create a new post
  create(post) {
    return this._$http({
      url: this._AppConstants.api + '/posts',
      method: 'POST',
      data: post,
      headers: {
        Authorization: 'Bearer '+ this._User.getToken()
      }
    }).then(
      (res) => {
        this.posts = res.data;
        return res.data;
      }
    );
  }

  //Upvote a post
  upvote(post) {
    return this._$http({
      url: this._AppConstants.api + '/posts/' + post._id + '/upvote',
      method: 'PUT',
      headers: {
        Authorization: 'Bearer '+ this._User.getToken()
      }
    });
  }

  //Get only one post
  getComment(id) {
    return this._$http({
      url: this._AppConstants.api + '/posts/' + id,
      method: 'GET'
    }).then(
      (res) => res.data
    );
  }

  //Adding Comment
  addComment(id, comment) {
    return this._$http({
      url: this._AppConstants.api + '/posts/' +id + '/comments',
      method: 'POST',
      data: comment,
      headers: {
        Authorization: 'Bearer '+ this._User.getToken()
      }
    }).then(
      (res) => {
        return res;
      }
    );
  }

  //Upvote a comment
  upvoteComment(post, comment) {
    return this._$http({
      url: this._AppConstants.api + '/posts/' + post._id + '/comments/' + comment._id + '/upvote',
      method: 'PUT',
      headers: {
        Authorization: 'Bearer '+ this._User.getToken()
      }
    });
  }

}

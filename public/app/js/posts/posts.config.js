function PostsConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.posts', {
    url: '/posts/:id',
    controller: 'PostsCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'posts/posts.html',
    title: 'Posts',
    resolve: {
      post: function(Post, $stateParams) {
        return Post.getComment($stateParams.id).then(
          (post) => post
        );
      }
    }
  });

}

export default PostsConfig;

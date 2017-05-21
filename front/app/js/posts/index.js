import angular from 'angular';

// Create the module where our functionality can attach to
let postsModule = angular.module('app.posts', []);

// Include our UI-Router config settings
import PostsConfig from './posts.config';
postsModule.config(PostsConfig);


// Controllers
import PostsCtrl from './posts.controller';
postsModule.controller('PostsCtrl', PostsCtrl);


export default postsModule;

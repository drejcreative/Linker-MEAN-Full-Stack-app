import angular from 'angular';

// Create the module where our functionality can attach to
let layoutModule = angular.module('app.layout', []);


// Components
import Navigation from './navigation.component';
layoutModule.component('navigation', Navigation);

export default layoutModule;

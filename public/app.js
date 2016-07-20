var baeSynchronous = angular.module('bae-synchronous', [
  'bae-synchronous.Map',
  'bae-synchronous.MainController',
  'bae-synchronous.marker',
  'ngMaterial',
  'ngMessages'
])

.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
  $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
});

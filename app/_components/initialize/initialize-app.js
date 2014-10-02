var app = angular.module('app', [
  'ui.router'
])
.config([
  '$stateProvider', '$urlRouterProvider', '$locationProvider',
  function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('home', {
      url: '/',
        views: {
          'navigation-top-view': {
              templateUrl: 'app/navigation/' +
                'navigation-top/navigation-top.tpl.html'
          },
          'top-content-view': {
              templateUrl: 'app/top-content/' +
                'top-content.tpl.html',
              controller: 'topContentCtrl'
          },
          'main-content-view': {
              templateUrl: 'app/main-content/' +
                'main-content.tpl.html'
          },
          'navigation-footer-view': {
              templateUrl: 'app/navigation/' +
                'navigation-footer/' +
                'navigation-footer.tpl.html'
          }
        }
    });
    //$locationProvider.html5Mode(true);
  }
]);

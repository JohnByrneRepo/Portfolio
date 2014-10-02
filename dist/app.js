angular.module('johnByrneApp', [
  'ui.router'
])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/home',
        template: 'test'//,
        //controller: 'HomeCtrl'
        /*views: {
          'navbar': {
            templateUrl: 'dashboard/lineChart.ng.html',
            controller: 'LineChartCtrl'
          },
          'sidebar': {
            templateUrl: 'dashboard/lineChart.ng.html',
            controller: 'LineChartCtrl'
          },
          'dashboard': {
            templateUrl: 'dashboard/lineChart.ng.html',
            controller: 'LineChartCtrl'
          }
        }*/
      });

  }
]);



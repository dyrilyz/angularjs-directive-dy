angular.module('directive.panel', ['ngAnimate']).directive('dyPanel', function () {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            panelTitle: '@',
            theme: '@'
        },
        template: "<div class=\"dy-panel\" ng-class=\"getTheme()\"><div class=\"dy-panel-heading\"><span ng-bind=\"panelTitle\"></span></div><div class=\"dy-panel-body\"><ng-transclude></ng-transclude></div></div>",
        //     `
        // <div class="dy-panel" ng-class="getTheme()">
        //     <div class="dy-panel-heading">
        //         <span ng-bind="panelTitle"></span>
        //     </div>
        //     <div class="dy-panel-body">
        //         <ng-transclude></ng-transclude>
        //     </div>
        // </div>
        // `,
        link: function ($scope, $element, $attr) {
            $scope.getTheme = function () {
                if ($scope.theme) {
                    return $scope.theme
                }
            }
        }
    }
})
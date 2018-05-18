/**
 * Created by rily on 2017/11/20.
 */
angular.module('directive.step', []).directive('dyStep', function () {
    return {
        restrict: 'E',
        scope: {
            stepList: '=',
            step: '@'
        },
        template: `<ul class="dy-step">
                    <li ng-repeat="item in stepList track by $index" ng-class="{active: $index + '' == step}"><span ng-bind="item"></span></li>
                </ul>`,
        link: function (scope, element, attr) {
        },
        controller: function ($scope) {
            if (!$scope.step || $scope.step.length > 0) {
                $scope.step = '0'
            }
        }
    }
})
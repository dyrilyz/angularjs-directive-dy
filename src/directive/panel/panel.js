import app from '../../app'
import template from './panel.html'
import './panel.less'

app.directive('dyPanel', function () {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            panelTitle: '@',
            theme: '@',
            ngModel: '='
        },
        template: template,
        link: function ($scope, $element, $attr) {
            $scope.getTheme = function () {
                if ($scope.theme) {
                    return $scope.theme
                }
            }
        }
    }
})

import main from '../main'
import template from './panel.html'
import './panel.less'

main.app.directive('dyPanel', function () {
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

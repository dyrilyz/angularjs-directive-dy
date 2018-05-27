/**
 * TODO
 */
angular.module('directive.checkbox', [])
    .directive('dyCheckbox', function () {
        return {
            restrict: 'E',
            scope: true,
            replace: true,
            bindToController: {
                ngModel: '='
            },
            controllerAs: '$ctrl',
            controller: function () {
                var $ctrl = this
                $ctrl.addInModel = function (item) {
                    console.log(item, $ctrl.ngModel.indexOf(item), 'add')
                    $ctrl.ngModel.push(item)
                }
                $ctrl.removeInModel = function (item) {
                    console.log(item, $ctrl.ngModel.indexOf(item), 'remove')
                    $ctrl.ngModel.splice($ctrl.ngModel.indexOf(item), 1)
                }
            }
        }
    })
    .directive('dyCheckboxItem', function () {
        return {
            require: '^?dyCheckbox',
            restrict: 'E',
            scope: true,
            replace: true,
            bindToController: {
                title: '@',
                name: '@',
                value: '@'
            },
            controllerAs: '$ctrl',
            templateUrl: 'directive/checkbox/checkbox.html',
            controller: function () {
            },
            link: function ($scope, $elem, $attr, superCtrl) {
                var $ctrl = $scope.$ctrl
                console.log(superCtrl.ngModel)
                $scope.$watch('$ctrl.ngModel', function (v1, v2) {
                    if (v1 != v2) {
                        if ($ctrl.ngModel) {
                            superCtrl.addInModel($elem.find('input').attr('value'))
                        } else {
                            superCtrl.removeInModel($elem.find('input').attr('value'))
                        }
                    }
                })
                for(var item in superCtrl.ngModel) {
                    if ($elem.find('input').attr('value') == superCtrl.ngModel[item]) {
                        $ctrl.ngModel = true
                    }
                }
            }
        }
    })
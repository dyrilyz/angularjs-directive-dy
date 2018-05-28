/**
 * TODO
 */
angular.module('directive.tree', [])
    .directive('dyTree', [function () {
        return {
            restrict: 'E',
            replace: true,
            scope: true,
            bindToController: {
                treeData: '=',
                ngModel: '='
            },
            controllerAs: '$ctrl',
            templateUrl: 'directive/tree/tree.html',
            controller: function ($scope) {
                var $ctrl = this
                $ctrl.onSelect = function(item) {
                    __recursion($ctrl.treeData);
                    $ctrl.ngModel = item
                    item.itemActive = true
                }
                function __recursion(list) {
                    if (list && list.length) {
                        for (var i in list) {
                            list[i].itemActive = false
                            __recursion(list[i].children)
                        }
                    }
                }

                $scope.$watch('$ctrl.ngModel', function(newVal) {
                    if (!newVal) {
                        __recursion($ctrl.treeData)
                    }
                })
            }
        };
    }])
    .directive('dyTreeItem', [function () {
        return {
            restrict: 'E',
            replace: true,
            scope: true,
            bindToController: {
                treeList: '=',
                onSelect: '&'
            },
            controllerAs: '$ctrl',
            templateUrl: 'directive/tree/treeItem.html',
            controller: function () {
                var $ctrl = this
                $ctrl.getItem = function (item) {
                    $ctrl.onSelect({item: item})
                }
                $ctrl.onChildrenSelect = function (item) {
                    $ctrl.onSelect({item: item})
                }
            }
        }
    }])
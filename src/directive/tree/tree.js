/**
 * tree 指令
 * @desc 用于构建目录树
 * @param ngModel 用于返回一个选择节点
 * @treeData 一个树结构对象数组
 *
 * @author rily
 */
import main from '../main'
import template from './tree.html'
import templateItem from './treeItem.html'
import './tree.less'

main.app
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
            template: template,
            controller: function ($scope) {
                let $ctrl = this
                $ctrl.onSelect = function (item) {
                    __recursion($ctrl.treeData);
                    $ctrl.ngModel = item
                    item.itemActive = true
                }

                function __recursion(list) {
                    if (list && list.length) {
                        for (let i in list) {
                            list[i].itemActive = false
                            __recursion(list[i].children)
                        }
                    }
                }

                $scope.$watch('$ctrl.ngModel', function (newVal) {
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
            template: templateItem,
            controller: function () {
                let $ctrl = this
                $ctrl.getItem = function (item) {
                    $ctrl.onSelect({item: item})
                }
                $ctrl.onChildrenSelect = function (item) {
                    $ctrl.onSelect({item: item})
                }
            }
        }
    }])
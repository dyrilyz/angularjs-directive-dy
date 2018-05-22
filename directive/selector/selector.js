/**
 * selector
 * @scope ngModel 绑定模型
 * @scope dyList 传入数组(支持String集合数组和Object集合数组)
 * @scope mode 模式，当值为simple时，取消搜索框
 * @scope objectHandle 对象字段映射
 * @prop zIndex 当出现层高覆盖问题时，此属性重写层高
 * @prop disabled 禁用状态
 *
 * @author rily
 *
 * >带检索查询
 * >可以使用disabled禁用selector
 *
 */
angular.module('directive.selector', ['ngAnimate']).directive('dySelector', ['$document', function ($document) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            ngModel: '=',
            dyList: '=',
            mode: '@',
            objectHandle: '='
        },
        template:
            "<div class=\"dy-selector\"><div class=\"dy-selector-value\" ng-class=\"{'dy-selector-able':selectorAble}\" ng-click=\"showList()\"><span ng-if=\"ngModel.dyKey\" ng-bind=\"ngModel.dyKey\"></span><span ng-if=\"!ngModel.dyKey\" ng-bind=\"ngModel\"></span></div><span class=\"df df-down\" ng-class=\"{'rotate-up':isShowList}\"></span><div class=\"dy-selector-list\" ng-show=\"selectorAble && isShowList\"><div ng-hide=\"mode == 'simple'\"><input type=\"text\" ng-model=\"keyWord\"/><span class=\"df df-search-bold\"></span></div><ul><li ng-repeat=\"item in dyList track by $index\" ng-click=\"setItem(item)\" ng-show=\"itemShow(item)\"><span ng-if=\"item.dyKey\" ng-bind=\"item.dyKey\"></span><span ng-if=\"!item.dyKey\" ng-bind=\"item\"></span></li></ul></div></div>",
        // 开发模式dom如下
        //     `
        // <div class="dy-selector">
        //     <div class="dy-selector-value" ng-class="{'dy-selector-able':selectorAble}" ng-click="showList()">
        //         <span ng-if="ngModel.dyKey" ng-bind="ngModel.dyKey"></span>
        //         <span ng-if="!ngModel.dyKey" ng-bind="ngModel"></span>
        //     </div>
        //     <span class="df df-down" ng-class="{'rotate-up':isShowList}"></span>
        //     <div class="dy-selector-list" ng-show="selectorAble && isShowList">
        //         <div ng-hide="mode == 'simple'">
        //             <input type="text" ng-model="keyWord"/>
        //             <span class="df df-search-bold"></span>
        //         </div>
        //         <ul>
        //             <li ng-repeat="item in dyList track by $index" ng-click="setItem(item)" ng-show="itemShow(item)">
        //                 <span ng-if="item.dyKey" ng-bind="item.dyKey"></span>
        //                 <span ng-if="!item.dyKey" ng-bind="item"></span>
        //             </li>
        //         </ul>
        //     </div>
        // </div>`,
        link: function ($scope, $element, $attr) {
            if(!$scope.objectHandle) {
                // 检测传入列表对象类型
                if ($scope.dyList && $scope.dyList.length > 0) {
                    if (typeof $scope.dyList[0] == 'object') {
                        if (typeof $scope.dyList[0].dyKey == 'undefined' || typeof $scope.dyList[0].dyVal == 'undefined') {
                            throw Error('对象格式不支持，请按照{dyKey : xx, dyVal : xx}格式传参');
                        }
                    }
                }
            } else {
                for (var i in $scope.dyList) {
                    $scope.dyList[i].dyKey = $scope.dyList[i][$scope.objectHandle.dyKey]
                    $scope.dyList[i].dyVal = $scope.dyList[i][$scope.objectHandle.dyVal]
                }

            }
            // 检测层高传入
            if ($attr.zIndex && $attr.zIndex.length > 0) {
                $element.css({'z-index': $attr.zIndex})
            }
            // 检测是否禁用
            if ($attr.disabled != '' && $attr.disabled != 'disabled') {
                $scope.selectorAble = true
            } else {
                $scope.selectorAble = false
            }
            // 检测是否多选
            if (typeof $scope.multiple == 'undefined') {
                $scope.multiple = false
            }
            $document.on('click', function (e) {
                if (e.target != $element[0]) {
                    isChild(e.target.parentElement)
                }
            })

            function isChild(e) {
                if (e) {
                    if (e != $element[0]) {
                        isChild(e.parentElement)
                    }
                } else {
                    $scope.isShowList = false
                    $scope.$apply()
                }
            }

            $scope.isShowList = false
            $scope.keyWord = ''
            $scope.setItem = function (item) {
                $scope.ngModel = item
                $scope.isShowList = false
                $scope.keyWord = ''
            }
            $scope.showList = function () {
                $scope.isShowList = !$scope.isShowList
                $scope.keyWord = ''
            }
            $scope.itemShow = function (item) {
                if (typeof item == 'object') {
                    return item.dyKey.toUpperCase().indexOf($scope.keyWord.toUpperCase()) != -1
                } else {
                    return item.toUpperCase().indexOf($scope.keyWord.toUpperCase()) != -1
                }
            }
        }
    }
}])
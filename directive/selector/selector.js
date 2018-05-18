/**
 * selector
 * @scope ngModel 绑定模型
 * @scope dyList 传入数组(支持String集合数组和Object集合数组)
 * @prop zIndex 当出现层高覆盖问题时，此属性重写层高
 * @prop disabled 禁用状态
 *
 * @author rily
 *
 * >带检索查询
 * >可以使用disabled禁用selector
 *
 * TODO 多选
 *
 */
angular.module('directive.selector', ['ngAnimate']).directive('dySelector', ['$document', function ($document) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            ngModel: '=',
            dyList: '='
        },
        template: `
        <div class="dy-selector">
            <div class="dy-selector-value" ng-class="{'dy-selector-able':selectorAble}" ng-click="showList()">
                <span ng-if="ngModel.key" ng-bind="ngModel.key"></span>
                <span ng-if="!ngModel.key" ng-bind="ngModel"></span>
            </div>
            <svg ng-click="showList()" t="1526655932363" class="dy-select-icon" ng-class="{'dy-selector-able':selectorAble}" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2939" xmlns:xlink="http://www.w3.org/1999/xlink" width="15" height="34"><defs><style type="text/css"></style></defs><path d="M478.31207 644.159081C502.692194 671.061286 542.819471 670.698193 566.819471 643.269621L837.388303 334.048098C845.146852 325.181184 844.248346 311.703582 835.381431 303.94503 826.514517 296.186481 813.036915 297.084988 805.278364 305.951902L534.709532 615.173423C527.507586 623.40422 517.168621 623.497773 509.927514 615.507586L229.141056 305.674253C221.229163 296.943889 207.737949 296.280386 199.007586 304.192277 190.277222 312.104171 189.61372 325.595383 197.525612 334.325747L478.31207 644.159081Z" p-id="2940"></path></svg>
            <div class="dy-selector-list" ng-show="selectorAble && isShowList">
                <div>
                    <input type="text" ng-model="keyWord" id="dy-selector-search"/>
                    <svg t="1526658260564" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7374" xmlns:xlink="http://www.w3.org/1999/xlink" width="15" height="34"><defs><style type="text/css"></style></defs><path d="M694.815232 475.46368q0-105.70752-75.138048-180.845568t-180.845568-75.138048-180.845568 75.138048-75.138048 180.845568 75.138048 180.845568 180.845568 75.138048 180.845568-75.138048 75.138048-180.845568zm292.552704 475.398144q0 29.712384-21.712896 51.42528t-51.42528 21.712896q-30.855168 0-51.42528-21.712896l-195.987456-195.416064q-102.279168 70.852608-227.985408 70.852608-81.709056 0-156.275712-31.712256t-128.5632-85.7088-85.7088-128.5632-31.712256-156.275712 31.712256-156.275712 85.7088-128.5632 128.5632-85.7088 156.275712-31.712256 156.275712 31.712256 128.5632 85.7088 85.7088 128.5632 31.712256 156.275712q0 125.70624-70.852608 227.985408l195.987456 195.987456q21.141504 21.141504 21.141504 51.42528z" p-id="7375"></path></svg>
                </div>
                <ul>
                    <li ng-repeat="item in dyList track by $index" ng-click="setItem(item)" ng-show="itemShow(item)">
                        <span ng-if="item.key" ng-bind="item.key"></span>
                        <span ng-if="!item.key" ng-bind="item"></span>
                    </li>
                </ul>
            </div>
        </div>`,
        link: function ($scope, $element, $attr) {
            if ($scope.dyList.length > 0) {
                if (typeof $scope.dyList[0] == 'object') {
                    console.log($scope.dyList[0].key)
                    if (typeof $scope.dyList[0].key == 'undefined' || typeof $scope.dyList[0].value == 'undefined') {
                        throw Error('对象格式不支持，请按照{key : xx, value : xx}格式传参');
                    }
                }
            }
            if ($attr.zIndex && $attr.zIndex.length > 0) {
                $element.css({'z-index': $attr.zIndex})
            }
            if ($attr.disabled != '' && $attr.disabled != 'disabled') {
                $scope.selectorAble = true
            } else {
                $scope.selectorAble = false
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
        },
        controller: function ($scope) {
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
                    return item.key.indexOf($scope.keyWord) != -1
                } else {
                    return item.indexOf($scope.keyWord) != -1
                }
            }
        }
    }
}])
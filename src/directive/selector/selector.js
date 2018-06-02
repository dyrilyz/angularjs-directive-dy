/**
 * selector
 * @desc 下拉框指令
 * @scope ngModel 绑定模型
 * @scope dyList 传入数组(支持String集合数组和Object集合数组)
 * @scope mode 模式，当值为simple时，取消搜索框
 * @scope objectHandle 对象字段映射
 * @prop zIndex 当出现层高覆盖问题时，此属性重写层高
 * @prop disabled 禁用状态
 *
 * @author rily
 *
 *
 *                             _ooOoo_
 *                            o8888888o
 *                            88" . "88
 *                            (| -_- |)
 *                            O\  =  /O
 *                         ____/`---'\____
 *                       .'  \\|     |//  `.
 *                      /  \\|||  :  |||//  \
 *                     /  _||||| -:- |||||-  \
 *                     |   | \\\  -  /// |   |
 *                     | \_|  ''\---/''  |   |
 *                     \  .-\__  `-`  ___/-. /
 *                   ___`. .'  /--.--\  `. . __
 *                ."" '<  `.___\_<|>_/___.'  >'"".
 *               | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *               \  \ `-.   \_ __\ /__ _/   .-` /  /
 *          ======`-.____`-.___\_____/___.-`____.-'======
 *                             `=---='
 *          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *                     佛祖保佑        永无BUG
 *            佛曰:
 *                   写字楼里写字间，写字间里程序员；
 *                   程序人员写程序，又拿程序换酒钱。
 *                   酒醒只在网上坐，酒醉还来网下眠；
 *                   酒醉酒醒日复日，网上网下年复年。
 *                   但愿老死电脑间，不愿鞠躬老板前；
 *                   奔驰宝马贵者趣，公交自行程序员。
 *                   别人笑我忒疯癫，我笑自己命太贱；
 *                   不见满街漂亮妹，哪个归得程序员？
 */
import main from '../main'
import template from './selector.html'
import './selector.less'

main.app.directive('dySelector', ['$document', function ($document) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            ngModel: '=',
            dyList: '=',
            mode: '@',
            objectHandle: '=',
            placeholder: '@'
        },
        template: template,
        link: function ($scope, $element, $attr) {
            if (!$scope.objectHandle) {
                // 检测传入列表对象类型
                if ($scope.dyList && $scope.dyList.length > 0) {
                    if (typeof $scope.dyList[0] == 'object') {
                        if (typeof $scope.dyList[0].dyKey == 'undefined' || typeof $scope.dyList[0].dyVal == 'undefined') {
                            throw Error('对象格式不支持，请按照{dyKey : xx, dyVal : xx}格式传参');
                        }
                    }
                }
            } else {
                refreshList()
                $scope.$watch('dyList.length', function () {
                    refreshList()
                })
            }

            function refreshList() {
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
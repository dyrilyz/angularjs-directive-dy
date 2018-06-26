var app = angular.module('testApp', ['ngAnimate', 'angularjs-directive-dy', 'ngSanitize'])

app
    .controller('selector', function (getTestData, $scope) {
        let $ctrl = this
        $ctrl.tableConf = {
            dataList: [],
            dataConf: [
                {title: '站点ID', data: 'siteId'},
                {title: '会员账号', data: 'account'},
                {title: '备注', data: 'remark', filter: 'addPlusFilter'},
                {
                    title: '操作', template: `
                    <a class="btn btn-sm btn-xs" ng-click="modify(data)">修改</a>
                    <a class="btn btn-sm btn-xs" ng-click="remove()">删除</a>
                `
                }
            ],
            method: {
                modify(data) {
                    // $ctrl.tableConf.dataList = getTestData.modify()
                    console.log($scope)
                    $scope.data.siteId = '22a'
                    $scope.$apply()
                },
                remove() {
                }
            }
        }
        getTestData.table().then(data => {
            $ctrl.tableConf.dataList = data
        })
        $ctrl.printConf = function () {
            console.log($ctrl.tableConf)
        }
    })
    .filter('addPlusFilter', function () {
        return function (val) {
            return val + '++'
        }
    })
    .component('dyTable', {
        template: `
            {{$ctrl.tableConf}}
            <table class="table table-bordered text-center">
                <thead>
                <tr>
                    <th ng-repeat="item in $ctrl.tableConf.dataConf" ng-bind="item.title"></th>
                </tr>
                </thead>
                <tbody>
                <tr ng-repeat="data in $ctrl.tableConf.dataList">
                    <td ng-repeat="conf in $ctrl.tableConf.dataConf">
                    {{data[conf.data}}
                        <dy-table-data data="data" conf="conf" method="$ctrl.tableConf.method" dy-list="$ctrl.tableConf.dataList"></dy-table-data>
                    </td>
                </tr>
                </tbody>
            </table>
        `,
        bindings: {
            tableConf: '='
        },
        controller($scope, $filter, $compile, $element) {
            let $ctrl = this
            $ctrl.$postLink = function () {
                $scope.$watch('$ctrl.tableConf.dataList.length', (v1, v2) => {
                    if (v1 !== v2) {
                        for (let i in $ctrl.tableConf.dataList) {
                            $ctrl.tableConf.dataList[i].__proto__.acc=1
                            console.log($ctrl.tableConf.dataList[i])
                        }
                    }
                })
                // $ctrl.tableConf.dataList.forEach(item => {
                //     item
                // })
            //     if (angular.isDefined($ctrl.conf.template)) {
            //         $ctrl.hasTemplate = true
            //         // $ctrl.template = $sce.trustAsHtml($ctrl.conf.template)
            //         $element.append($compile($ctrl.conf.template)($scope))
            //
            //     }
            //     if (angular.isDefined($ctrl.tableConf.method)) {
            //         let methodNames = Object.keys($ctrl.tableConf.method)
            //         console.log(methodNames)
            //     }
            }
        }
    })
    .component('dyTableData', {
        template: `
            <div>
                <span ng-if="!$ctrl.hasTemplate">{{$ctrl.result}}</span>
                <div ng-if="$ctrl.hasTemplate" ng-bind-html="$ctrl.template"></div>
            </div>
        `,
        bindings: {
            data: '<',
            conf: '<',
            method: '<',
            dyList: '<'
        },
        controller: function ($scope, $filter, $compile, $element) {
            let $ctrl = this
            $ctrl.result = ''
            $ctrl.hasTemplate = false
            $ctrl.$postLink = function () {
                $scope.data = $ctrl.data
                $scope.dataList = $ctrl.dyList
                if (!angular.isUndefined($ctrl.conf.filter)) {
                    $ctrl.result = $filter($ctrl.conf.filter)($ctrl.data[$ctrl.conf.data])
                } else {
                    $ctrl.result = $ctrl.data[$ctrl.conf.data]
                }
                if (angular.isDefined($ctrl.conf.template)) {
                    $ctrl.hasTemplate = true
                    $element.append($compile($ctrl.conf.template)($scope))

                    if (angular.isDefined($ctrl.method)) {
                        let methodNames = Object.keys($ctrl.method)
                        methodNames.forEach(name => {
                            $scope[name] = $ctrl.method[name]
                        })
                    }
                }
            }
        }
    })
    .service('getTestData', function ($q, $timeout) {
        let result = [
            {siteId: `${Math.random()}`, account: '873023993', remark: 'hello table'},
            {siteId: `${Math.random()}`, account: '873023993', remark: 'hello table'},
            {siteId: `${Math.random()}`, account: '873023993', remark: 'hello table'},
            {siteId: `${Math.random()}`, account: '873023993', remark: 'hello table'},
            {siteId: `${Math.random()}`, account: '873023993', remark: 'hello table'},
            {siteId: `${Math.random()}`, account: '873023993', remark: 'hello table'},
            {siteId: `${Math.random()}`, account: '873023993', remark: 'hello table'}]
        return {
            table: function () {
                return $q((resolve, reject) => {
                    $timeout(() => {
                        resolve(result)
                    }, 10)
                })
            },
            modify: function () {
                result = result.splice(0, 5)
                return result
            }
        }
    })
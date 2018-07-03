var app = angular.module('testApp', ['ngAnimate', 'angularjs-directive-dy', 'ngSanitize'])

app
    .controller('selector', function (getTestDataService, $scope, $sce, $compile, $rootScope) {
        $rootScope.getWord = str => {
            return `${str}+++++++`
        }
        let $ctrl = this
        $ctrl.filterTexts = [1, 2, 3, 1, 1, 1, 1, 2, 2, 1, 1, 3, 3, 3, 1, 2, 4]
        // console.log($compile)
        $ctrl.tableConf = {
            dataList: [],
            dataConf: [
                {
                    title: '站点ID',
                    data: 'siteId'
                },
                {
                    title: '会员账号',
                    data: 'account'
                },
                {
                    title: '备注',
                    data: 'remark',
                    filter: 'addPlusFilter'
                },
                {
                    title: '操作', data: 'siteId', template: `
                    <a class="btn btn-sm btn-xs" ng-click="modify(data)">修改</a>
                    <a class="btn btn-sm btn-xs" ng-click="remove(dataList)">删除</a>
                `
                }
            ],
            method: {
                modify(data) {
                    data.siteId = '11acc'
                    console.log(this)
                    // getTestDataService.modify()
                    //     .then(resp=> {
                    //     console.log(resp)
                    // })
                },
                remove(dataList) {
                    console.log(dataList)
                    for (let i of dataList) {
                        console.log('i', i)
                        i.cc = 'max'
                    }
                }
            }
        }
        getTestDataService.table().then(data => {
            $ctrl.tableConf.dataList = data
        })
        $ctrl.printConf = function () {
            console.log($ctrl.tableConf)
        }
    })
    .component('dyTable', {
        template: `
            <!--{{$ctrl.tableConf}}-->
            <table class="table table-bordered text-center">
                <thead>
                <tr>
                    <!--<th><input type="checkbox" ng-click="$ctrl.allChecked()" ng-model="$ctrl.isChecked">全选</th>-->
                    <th ng-repeat="item in $ctrl.tableConf.dataConf" ng-bind="item.title"></th>
                </tr>
                </thead>
                <tbody>
                <tr ng-repeat="data in $ctrl.tableConf.dataList">
                    <!--<td><input type="checkbox" ng-click="$ctrl.allChecked()" ng-model="data.isChecked"></td>-->
                    <td ng-repeat="conf in $ctrl.tableConf.dataConf">
                    <!--{{data[conf.data]}}-->
                        <span>{{data[conf.data]}}</span>
                        <dy-table-data data="data" conf="conf" method="$ctrl.tableConf.method" dy-list="$ctrl.tableConf.dataList"></dy-table-data>
                    </td>
                </tr>
                </tbody>
            </table>
        `,
        bindings: {
            tableConf: '=',
            option: '<',

        },
        controller($scope, $filter, $compile, $element) {
            let $ctrl = this
            $ctrl.$postLink = function () {
            }
            $ctrl.allChecked = () => {
                if ($ctrl.isChecked) {
                    $ctrl.tableConf.dataList.forEach(v => {
                        v.isChecked = true
                    })
                } else {
                    $ctrl.tableConf.dataList.forEach(v => {
                        v.isChecked = false
                    })
                }
            }
        }
    })
    .component('dyTableData', {
        template: `<span ng-if="!$ctrl.hasTemplate">{{$ctrl.result}}</span>`,
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
                let fiterFun = () => {
                    if (!angular.isUndefined($ctrl.conf.filter)) {
                        $ctrl.result = $filter($ctrl.conf.filter)($ctrl.data[$ctrl.conf.data])
                    } else {
                        $ctrl.result = $ctrl.data[$ctrl.conf.data]
                    }
                }
                $scope.$watch('$ctrl.data', (v1, v2) => {
                    if (v1 !== v2) {
                        fiterFun()
                    }
                })
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
    .service('getTestDataService', function ($q, $timeout) {
        let result = [
            {siteId: `${Math.round(Math.random() * 1000000)}`, account: '873023993', remark: 'hello table'},
            {siteId: `${Math.round(Math.random() * 1000000)}`, account: '873023993', remark: 'hello table'},
            {siteId: `${Math.round(Math.random() * 1000000)}`, account: '873023993', remark: 'hello table'},
            {siteId: `${Math.round(Math.random() * 1000000)}`, account: '873023993', remark: 'hello table'},
            {siteId: `${Math.round(Math.random() * 1000000)}`, account: '873023993', remark: 'hello table'},
            {siteId: `${Math.round(Math.random() * 1000000)}`, account: '873023993', remark: 'hello table'},
            {siteId: `${Math.round(Math.random() * 1000000)}`, account: '873023993', remark: 'hello table'}]
        return {
            table: function () {
                return $q((resolve, reject) => {
                    $timeout(() => {
                        resolve(result)
                    }, 700)
                })
            },
            modify: function () {
                result = result.splice(0, 5)
                // return $q((resolve, reject) => {
                //     $timeout(() => {
                //         resolve(result)
                //     }, 700)
                // })
            },
            remove() {

            }
        }
    })
    .filter('addPlusFilter', function () {
        return function (val) {
            return val + '++'
        }
    })

    .filter('filterEnum', function (filterEnumService, $rootScope) {
        let enumName = Object.keys(filterEnumService)
        return function (val, validName) {
            for (let i in enumName) {
                if (enumName[i] === validName) {
                    for (let j in filterEnumService[enumName[i]]) {
                        if (filterEnumService[enumName[i]][j].key === val) {
                            return $rootScope.getWord(filterEnumService[enumName[i]][j].value)
                        }
                    }
                }
            }
            return val
        }
    })
    .service('filterEnumService', function () {
        return {
            user_status: [
                {key: 1, value: '在线'},
                {key: 2, value: '离线'},
                {key: 3, value: '隐身'}
            ],
            out_cash_status: [
                {key: 1, value: '未出款'},
                {key: 2, value: '已出款'},
                {key: 3, value: '已取消'}
            ]
        }
    })
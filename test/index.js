var app = angular.module('testApp', ['ngAnimate', 'angularjs-directive-dy', 'ngSanitize'])

app
    .controller('selector', function ($timeout) {
        var $ctrl = this
        $ctrl.tableConf = {
            dataList: [
                {siteId: '11a', account: '873023993', remark: 'hello table'},
                {siteId: '11a', account: '873023993', remark: 'hello table'},
                {siteId: '11a', account: '873023993', remark: 'hello table'},
                {siteId: '11a', account: '873023993', remark: 'hello table'},
                {siteId: '22a', account: '873023993', remark: 'hello table'},
                {siteId: 'cca', account: '873023993', remark: 'hello table'},
                {siteId: '11a', account: '873023993', remark: 'hello table'}
            ],
            dataConf: [
                {title: '站点ID', data: 'siteId'},
                {title: '会员账号', data: 'account'},
                {title: '备注', data: 'remark', filter: 'addPlusFilter'},
                {title: '备注', template: `
                    <a class="btn btn-sm btn-xs" ng-click="modify()">修改</a>
                    <a class="btn btn-sm btn-xs" ng-click="remove()">删除</a>
                `}
            ]
        }
        $ctrl.printConf = function () {
            console.log($ctrl.tableConf)
        }
        // $timeout(() => {
        //     $ctrl.tableConf.dataList = [
        //         {siteId: '11a', account: '873023993', remark: 'hello table'},
        //         {siteId: '11a', account: '873023993', remark: 'hello table'},
        //         {siteId: '11a', account: '873023993', remark: 'hello table'},
        //         {siteId: '11a', account: '873023993', remark: 'hello table'}]
        // }, 3000)
    })
    .filter('addPlusFilter', function () {
        return function (val) {
            return val + '++'
        }
    })
    .component('dyTable', {
        template: `
            <table class="table table-bordered text-center">
            <thead>
            <tr>
            <th ng-repeat="item in $ctrl.tableConf.dataConf" ng-bind="item.title"></th>
            </tr>
            </thead>
            <tbody>
            <tr ng-repeat="data in $ctrl.tableConf.dataList">
            <td ng-repeat="conf in $ctrl.tableConf.dataConf">
                <dy-table-data data="data" conf="conf"></dy-table-data>
            </td>
            </tr>
            </tbody>
            </table>
        `,
        bindings: {
            tableConf: '<'
        }
    })
    .component('dyTableData', {
        template: `
            <span ng-if="!$ctrl.hasTemplate">{{$ctrl.result}}</span>
            <div ng-if="$ctrl.hasTemplate" ng-bind-html="$ctrl.template"></div>
        `,
        bindings: {
            data: '<',
            conf: '<'
        },
        controller: function ($filter, $sce) {
            let $ctrl = this
            $ctrl.result = ''
            $ctrl.hasTemplate = false
            $ctrl.$postLink = function () {
                if (!angular.isUndefined($ctrl.conf.filter)) {
                    $ctrl.result = $filter($ctrl.conf.filter)($ctrl.data[$ctrl.conf.data])
                } else {
                    $ctrl.result = $ctrl.data[$ctrl.conf.data]
                }
                if (!angular.isUndefined($ctrl.conf.template)) {
                    $ctrl.hasTemplate = true
                    $ctrl.template = $sce.trustAsHtml($ctrl.conf.template)
                }
            }
        }
    })
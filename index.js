angular.module('test', [
    'directive.panel',
    'directive.selector',
    'directive.step',
    'directive.tooltip'
])
    .controller('tooltipCtrl', function ($scope) {
    })
    .controller('stepCtrl', function ($scope) {
        var $ctrl = this
        $ctrl.step = 0
        $ctrl.stepList = ['第一步', '第二步', '第三步']
        $ctrl.next = function () {
            $ctrl.step++
            if ($ctrl.step >= $ctrl.stepList.length) {
                $ctrl.step = 0
            }
        }
    })
    .controller('selectorCtrl', function ($scope) {
        var $ctrl = this
        $ctrl.dyList = ['IOS', 'Android', 'windows phone', 'Symbian OS'];

        $ctrl.dyList2 = [
            {dyKey: '苹果', dyVal: '001'},
            {dyKey: '三星', dyVal: '002'},
            {dyKey: '华为', dyVal: '003'},
            {dyKey: '小米', dyVal: '004'},
            {dyKey: '锤子', dyVal: '005'}
        ];
        $ctrl.dyList3 = [
            {brand: '苹果', encoding: '001'},
            {brand: '三星', encoding: '002'},
            {brand: '华为', encoding: '003'},
            {brand: '小米', encoding: '004'},
            {brand: '锤子', encoding: '005'}
        ];

        $ctrl.selectReset = function () {
            $ctrl.a = ''
            $ctrl.b = ''
            $ctrl.c = ''
        }
    })
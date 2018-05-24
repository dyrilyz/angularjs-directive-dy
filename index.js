angular.module('test', [
    'directive.panel',
    'directive.selector',
    'directive.step',
    'directive.tooltip',
    'directive.tree'
])
    .controller('tooltipCtrl', function () {
    })
    .controller('stepCtrl', function () {
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
    .controller('selectorCtrl', function () {
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
    .controller('treeCtrl', function () {
        var $ctrl = this
        $ctrl.dataList = [
            {id: 1, name: '新建文件夹1', type: 1, parentId: 0},
            {id: 2, name: '新建文件夹2', type: 1, parentId: 0},
            {id: 3, name: '新建文件夹3', type: 1, parentId: 1},
            {id: 4, name: '新建文件夹4', type: 2, parentId: 1},
            {id: 5, name: '新建文件夹5', type: 2, parentId: 2},
            {id: 6, name: '新建文件夹6', type: 2, parentId: 2},
            {id: 7, name: '新建文件夹7', type: 2, parentId: 2},
            {id: 8, name: '新建文件夹8', type: 2, parentId: 4},
            {id: 9, name: '新建文件夹9', type: 2, parentId: 4},
            {id: 10, name: '新建文件夹10', type: 2, parentId: 5}
        ]
    })
# angularjs-directive-dy

这是一个angularjs指令库，基于angularjs 1.5+。这个库提供了一些我们常用的组件，例如：

* 更美观更强大的select下拉指令；

* 简单便捷的step指令，只需要简单的几行代码，便可以实现复杂的视觉效果；

* 美观的图片上传uploader指令，可以实现本地预览；

* ...

预览地址：https://rilyzhang.github.io/angularjs-directive-dy

下面内容是详细文档。

> ## 目录
> 1. [指令的引入](#import)
> 2. [dy-selector指令](#selector)
> 3. [dy-step指令](#step)
> 4. [dy-tooltip指令](#tooltip)
> 5. [dy-uploader指令](#uploader)
> 6. [dy-tree指令](#tree)

## <a name="import">指令的引入</a>

使用npm引入指令：

***Example：***
```text
npm i -S angularjs-directive-dy
```

```javascript
import directiveDy from 'angularjs-directive-dy'

var app = angular.module('yourModuleName', [directiveDy]);
```

或者可以直接去dist文件夹中寻找编译好的js脚本。别忘了引入样式

## <a name="selector">dy-selector指令</a>

>dy-selector指令是一个模拟select下拉框的指令，但是它比select下拉框更加强大和美观。
当你的选项有很多时，它可以进行模糊匹配，让可选项变少。此外，它还支持字符串数组，对象数组。<br/>


***Example：***
```html
<dy-selector ng-model="myData" dy-list="dataList"></dy-selector>
```

*(注：传入的数组元素可以为`string`类型，也可以为object类型。如果传入`object`类型，则必须是{ dyKey : xxx, dyVal : xxx }格式）*

**使用就是这么简单，接下来我们看看属性详解：**

``ngModel``：       这个大家都懂的，不做解释。

``dyList``：        传入一个数组，可以为string数组，也可以为object类型。

``disabled``：      只读模式，加上这个属性（无需赋值）后将无法操作下拉框。

``zIndex``：        当两个dy-selector上下布局的时候会出现层高问题，这个参数的值决定哪个层高优先。

``mode``：          当存在mode属性，并且值为simple时，可屏蔽匹配搜索框。

``placeholder``：   尚未选择列表时的提示文字。

``objectHandle``：  用于映射dyList对象的字段。当你的对象过于复杂时，你无需将对象转换为指定类型，
                    因为这个属性可以帮你做这些事情！

下面分别演示了传入字符串和传入数组：

***Example:***

```javascript
// 传入String类型的数组
$scope.dyList = ['IOS', 'Android', 'windows phone', 'Symbian OS'];
```

```javascript
// 传入Object类型的数组
$scope.dyList = [
    {dyKey: '苹果', dyVal: '001'},
    {dyKey: '三星', dyVal: '002'},
    {dyKey: '华为', dyVal: '003'},
    {dyKey: '小米', dyVal: '004'}
];
```

如果你的对象是这个样子的，你又懒得做转换，那么，你只需要做好字段映射，objectHandle属性可以帮你做这些工作：

***Example:***

```javascript
$scope.dyList3 = [
    {brand: '苹果', encoding: '001'},
    {brand: '三星', encoding: '002'},
    {brand: '华为', encoding: '003'},
    {brand: '小米', encoding: '004'},
    {brand: '锤子', encoding: '005'}
];
```

```html
<dy-selector
   ng-model="myData"
   dy-list="dyList3"
   placeholder="请选择"
   object-handle="{dyKey: 'brand', dyVal: 'encoding'}">
</dy-selector>
```

## <a name="step">dy-step指令</a>

>这个指令是为了展示进度的指令，例如我们注册一个账号时，网页上会显示“第一步”、“第二步”、
“第三步”等小箭头。这个指令将其样式封装在内，以便于更简单的操作。

***Example：***

```html
<script src="angularjs-directive-dy/directive/step/step.js"></script>
<link rel="stylesheet" href="angularjs-directive-dy/directive/step/step.css">
<dy-step step="0" step-list="['第一步','第二步','第三步']"></dy-step>
<script>
    angular.module('app', ['directive.step']);
</script>
```

**属性详解：**

``step``：    当前所在的步数。

``stepList``：    步数数组。

*特别注意：此指令适用于白色背景的页面。如果页面背景是其它颜色，请在自己的样式文件中重写小箭头的颜色。*

## <a name="tooltip">dy-tooltip指令</a>

>当我们鼠标挪到某个元素上，像提示用户的时候，通常会选中在该元素上加入title属性，但又苦于原生title属性的样式不太美观，
这时候dy-tooltip属性或许可以帮到你。

不多说，直接贴代码：

***Example：***

```html
<div dy-tooltip data-tip="这里就是你想显示的提示文字">...</div>
```

## <a name="uploader">dy-uploader 指令</a> 

> 这是一个封装的图片上传组件，ngModel中绑定的为file类型的数组，支持本地图片预览。

***Example：***
```html
<dy-uploader
    ng-model="$ctrl.files"
    max-length="3"
    max-size="1024 * 1024 * 5"
    file-type="/.(jpe?g|gif|png|bmp)$/i"
    file-type-error="$ctrl.fileTypeError()"
    max-length-error="$ctrl.maxLengthError()"
    max-size-error="$ctrl.maxSizeError()"
    repeat-name-error="$ctrl.repeatNameError()"></dy-uploader>
```

**属性详解：**

``ngModel``： 用于绑定file类型的数组。

``maxLength``：上传最大数量(default: 20)。

``maxSize``：限制文件大小,单位为字节(default: 10M)。

``fileType``：文件类型，值为正则表达式字面量(default: /.(jpe?g|png|bmp|gif)$/i)。

``fileTypeError``： 当上传文件类型不匹配时调用此方法。

``maxSizeError``： 当上传文件超过限制大小是调用此方法。

``maxLengthError``： 当上传文件超过限制数量是调用此方法。

``repeatNameError``： 当上传重名是调用此方法。

## <a name="tree">dy-tree 指令</a>

> 这个指令可以构造一个简单的目录树结构，目前仅支持单选，后续将补充其他功能。

***Example：***
```html
<dy-tree tree-data="$ctrl.dataList" ng-model="$ctrl.treeVal"></dy-tree>
```

**属性详解：**

``ngModel``：用于绑定获取单选值。

``treeData``：用于构造树模型的数据。

**treeData数据结构**

treeData为一个对象数组。目前，这个属性的数据结构比较开放，只有``name``属性为必要的属性。若其中包含层级结构的子元素，
使用``children``将子元素包裹即可。*``children``也是一个对象数组*。

***Example：***
```javascript
$ctrl.dataList = [
            {
                id: 1, name: '新建文件夹1', type: 1, parentId: 0, children: [
                {id: 3, name: '新建文件夹3', type: 1, parentId: 1},
                {
                    id: 4, name: '新建文件夹4', type: 2, parentId: 1, children:
                    [
                        {id: 8, name: '新建文件夹8', type: 2, parentId: 4},
                        {id: 9, name: '新建文件夹9', type: 2, parentId: 4},
                    ]
                }
            ]
            },
            {
                id: 2, name: '新建文件夹2', type: 1, parentId: 0, children:
                [
                    {
                        id: 5,
                        name: '新建文件夹5',
                        type: 2,
                        parentId: 2,
                        children: [{id: 10, name: '新建文件夹10', type: 2, parentId: 5}]
                    },
                    {id: 6, name: '新建文件夹6', type: 2, parentId: 2},
                    {id: 7, name: '新建文件夹7', type: 2, parentId: 2}
                ]
            }

        ]
```

持续更新中ing...

待开发：滚动条美化、DateTimePicker

如有疑问，请提Issues。
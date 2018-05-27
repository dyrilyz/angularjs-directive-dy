# angularjs-directive-dy

这是一个angularjs指令库，基于angularjs 1.x。这个库提供了一些我们常用的组件，例如：

* 更美观更强大的select下拉指令；

* 简单便捷的step指令，只需要简单的几行代码，便可以实现复杂的视觉效果；

* 可收缩的pannel面板(TODO)

* ...

预览地址：https://rilyzhang.github.io/angularjs-directive-dy

下面内容是详细文档。

> ## 目录
> 1. [指令的引入](#import)
> 2. [dy-selector指令](#selector)
> 3. [dy-step指令](#step)
> 4. [dy-tooltip指令](#tooltip)
> 5. [dy-uploader指令](#uploader)

## <a name="import">指令的引入</a>

指令的编码为模块化编码，因此如果需要引入，需要单独引入具体指令的js文件和css文件。例如：

***Example：***
```html
<!-- 引入字体样式 -->
<link rel="stylesheet" href="angularjs-directive-dy/directive/style/dyFont.css">
<!-- 引入面板样式 -->
<link rel="stylesheet" href="angularjs-directive-dy/directive/panel/panel.css">
<!-- 引入面板指令js -->
<script src="angularjs-directive-dy/directive/panel/panel.min.js"></script>
```

```javascript
// 注入面板指令
var app = angular.module('myApp', ['directive.panel']);
```

## <a name="selector">dy-selector指令</a>

>dy-selector指令是一个模拟select下拉框的指令，但是它比select下拉框更加强大和美观。
当你的选项有很多时，它可以进行模糊匹配，让可选项变少。此外，它还支持字符串数组，对象数组。<br/>
**另外请注意：这个指令需要字体样式（dyFont.css）支持，如果未引入字体样式，可能导致下拉图标和放大镜图标的丢失！**

首先要做的时将其引入到你的html文件中：

***Example：***
```html
<script src="angularjs-directive-dy/directive/selector/selector.js"></script>
<link rel="stylesheet" href="angularjs-directive-dy/directive/selector/selector.css">
<link rel="stylesheet" href="angularjs-directive-dy/directive/style/dyFont.css">
```

然后将其注入到你的angular应用中：

***Example：***

```javascript
var app = angular.module('app', ['directive.tooltip']);
```

现在我们就可以在页面中使用dy-selector指令了！

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

*最后再提示一点：当启用* ``object-handle`` *的时候，为了监视数组发生的变化，启用了脏检查机制，性能方面将会有所影响，
请优先考虑默认使用指令要求的对象格式*

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

```html
<!-- 首先还是引入代码并加载指令 -->
<script src="angularjs-directive-dy/directive/tooltip/tooltip.js"></script>
<link rel="stylesheet" href="angularjs-directive-dy/directive/tooltip/tooltip.css">
<script>
    angular.module('app', ['directive.tooltip']);
</script>
```

接着就可以直接使用了：

***Example：***

```html
<div dy-tooltip data-tip="这里就是你想显示的提示文字">...</div>
```

## <a name="uploader">dy-uploader 指令</a>

>这是一个封装的图片上传组件，ngModel中绑定的为file类型的数组，支持本地图片预览。

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

持续更新中ing...

如有疑问，请提Issues。
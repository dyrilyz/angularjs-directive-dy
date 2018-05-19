# angularjs-directive-dy

这是一个angularjs指令库，基于angularjs 1.x。这个库提供了一些我们常用的组件，例如：

* 更美观更强大的select下拉指令；

* 简单便捷的step指令，只需要简单的几行代码，便可以实现复杂的视觉效果

* 可收缩的pannel面板(TODO)

* ...

预览地址：<a href="https://rilyzhang.github.io/angularjs-directive-dy" target="_blank">https://rilyzhang.github.io/angularjs-directive-dy</a>

下面内容是详细文档。

> ## 目录
> 1. [指令的引入](#import)
> 2. [dy-selector指令](#selector)
> 2. [dy-step指令](#step)
> 

## <a name="import">指令的引入</a>

指令的编码为模块化编码，因此如果需要引入，需要单独引入具体指令的js文件和css文件。例如：

***Example：***
```html
<!--引入指令js文件-->
<script src="angularjs-directive-dy/directive/***/***.js"></script>
<!--引入指令样式文件-->
<link rel="stylesheet" href="angularjs-directive-dy/directive/***/***.css">
```

## <a name="selector">dy-selector指令</a>

>dy-selector指令是一个模拟select下拉框的指令，但是它比select下拉框更加强大和美观。
当你的选项有很多时，它可以进行模糊匹配，让可选项变少。此外，它还支持字符串数组，对象数组。

首先要做的时将其引入到你的html文件中：

***Example：***
```html
<script src="angularjs-directive-dy/directive/selector/selector.js"></script>
<link rel="stylesheet" href="angularjs-directive-dy/directive/selector/selector.css">
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

*(注：传入的数组元素可以为string类型，也可以为object类型。如果传入object类型，则必须是{ key : xxx, value : xxx }格式）*

**使用就是这么简单，接下来我们看看属性详解：**

|Attr        | comment
|:----------:|---------
|ngModel     | 这个大家都懂的，不做解释
|dyList      | 传入一个数组，可以为string数组，也可以为object类型
|disabled    | 只读模式
|zIndex      | 当两个dy-selector上下布局的时候会出现层高问题，这个参数的值决定哪个层高优先

```javascript
// 传入String类型的数组
$scope.dyList = ['IOS', 'Android', 'windows phone', 'Symbian OS'];
```

```javascript
// 传入Object类型的数组
$scope.dyList = [
    {key: '苹果', value: '001'},
    {key: '三星', value: '002'},
    {key: '华为', value: '003'},
    {key: '小米', value: '004'}
];
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

|Attr        | comment
|:----------:|---------
|step        | 当前所在的步数
|stepList    | 步数数组

*特别注意：此指令适用于白色背景的页面。如果页面背景是其它颜色，请在自己的样式文件中重写小箭头的颜色。*

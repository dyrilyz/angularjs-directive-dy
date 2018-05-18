/**
 * Created by rily on 2017/11/20.
 */
angular.module('directive.tooltip', []).directive('dyTooltip', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            var dom = element[0]
            var span = document.createElement('span')
            var str = document.createTextNode(attr.tip)
            span.appendChild(str)
            span.setAttribute('class', 'dy-tooltip')
            var util = {
                styleTools: function (dom, obj) {
                    for (var x in obj) {
                        dom.style[x] = obj[x]
                    }
                },
                showTip: function (e) {
                    util.styleTools(span, {
                        left: e.layerX + 'px',
                        top: e.layerY + 30 + 'px',
                    })
                    dom.appendChild(span)
                    var opacity = eval(getComputedStyle(span).opacity)

                    function animate () {
                        if (opacity < 0.81) {
                            span.style.opacity = opacity += 0.03
                            requestAnimationFrame(animate)
                        }
                    }

                    animate()
                    dom.addEventListener('mousemove', function (e) {
                        util.styleTools(span, {
                            left: e.layerX + 'px',
                            top: e.layerY + 30 + 'px',
                        })
                    })
                },
                removeTip: function (e) {
                    dom.removeChild(span)
                },
            }
            dom.addEventListener('mouseenter', util.showTip)
            dom.addEventListener('mouseout', util.removeTip)
        },
    }
})
import main from '../main'
import './tooltip.less'

main.app.directive('dyTooltip', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            let dom = element[0]
            let span = document.createElement('span')
            let str = document.createTextNode(attr.tip)
            span.appendChild(str)
            span.setAttribute('class', 'dy-tooltip')
            let util = {
                styleTools: function (dom, obj) {
                    for (let x in obj) {
                        dom.style[x] = obj[x]
                    }
                },
                showTip: function (e) {
                    util.styleTools(span, {
                        left: e.layerX + 'px',
                        top: e.layerY + 30 + 'px',
                    })
                    dom.appendChild(span)
                    let opacity = eval(getComputedStyle(span).opacity)

                    function animate() {
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
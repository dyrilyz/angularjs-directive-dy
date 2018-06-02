import vendor from '../vendor'

const moduleName = 'angularjs-directive-dy'

let app = vendor.angular.module(moduleName, [
    vendor.animate
])

export default {
    app,
    moduleName
}
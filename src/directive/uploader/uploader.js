/**
 * uploader
 * @author rily
 */

import main from '../main'
import template from './uploader.html'
import './uploader.less'

main.app
    .directive('dyUploader', ['$compile', function ($compile) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                ngModel: '=',
                fileTypeError: '&',
                maxLengthError: '&',
                maxSizeError: '&',
                repeatNameError: '&'
            },
            template: template,
            link: function ($scope, $elem, $attr) {
                if (!angular.isDefined($attr.maxLength)) {
                    $scope.maxLength = 20
                } else {
                    $scope.maxLength = eval($attr.maxLength)
                }
                if (!angular.isDefined($attr.maxSize)) {
                    $attr.maxSize = 1024 * 1024 * 10
                } else {
                    $attr.maxSize = eval($attr.maxSize)
                }
                if (!angular.isDefined($attr.fileType)) {
                    $attr.fileType = /.(jpe?g|png|bmp|gif)$/i
                } else {
                    $attr.fileType = eval($attr.fileType)
                }
                $scope.ngModel = []
                $scope.ngModelTemp = []
                $scope.pictureList = []
                $scope.$watch('ngModelTemp.length', function (v1, v2) {
                    if (v1 != v2) {
                        // 刷新dom元素，防止文件留在队列中
                        var addIcon = $elem.find('input').parent()
                        $elem.find('input').remove()
                        addIcon.append($compile(
                            '<input type="file" dy-uploader-input multiple="multiple" accept="image/*" ng-model="ngModelTemp"/>'
                        )($scope))
                        // 判断图片数量是否超标
                        if (($scope.ngModelTemp.length + $scope.ngModel.length) <= $scope.maxLength) {
                            for (var i in $scope.ngModelTemp) {
                                for (var j in $scope.ngModel) {
                                    // 判断是否重名
                                    if ($scope.ngModelTemp[i].name == $scope.ngModel[j].name) {
                                        $scope.repeatNameError()
                                        $scope.ngModelTemp = []
                                        return
                                    }
                                }
                                console.log($scope.ngModelTemp[i].size)
                                // 判断是否超过限制大小
                                if ($scope.ngModelTemp[i].size > $attr.maxSize) {
                                    $scope.maxSizeError()
                                    $scope.ngModelTemp = []
                                    return
                                }
                                // 检查文件格式
                                if (!$attr.fileType.test($scope.ngModelTemp[i].name)) {
                                    $scope.fileTypeError()
                                    $scope.ngModelTemp = []
                                    return
                                }
                            }
                            // 为ngModel和pictureList做遍历
                            angular.forEach($scope.ngModelTemp, function (item) {
                                var reader = new FileReader()
                                reader.readAsDataURL(item)
                                reader.onload = function (event) {
                                    $scope.ngModel.push(item)
                                    $scope.pictureList.push(event.target.result)
                                    $scope.$apply()
                                }
                            })
                        } else {
                            $scope.maxLengthError()
                        }
                        $scope.ngModelTemp = []
                    }
                })

                $scope.removePic = function (index) {
                    $scope.ngModel.splice(index, 1)
                    $scope.pictureList.splice(index, 1)
                }
            }
        }
    }])
    .directive('dyUploaderInput', function () {
        return {
            restrict: 'A',
            scope: true,
            replace: true,
            bindToController: {
                ngModel: '='
            },
            controllerAs: '$ctrl',
            controller: function ($scope, $element, $timeout) {
            },
            link: function ($scope, $elem, $attr) {
                $elem.on('change', function () {
                    if (this.files != 0) {
                        angular.forEach(this.files, function (item) {
                            $scope.$ctrl.ngModel.push(item)
                        })
                    }
                    $scope.$apply()
                })
            }
        }
    })
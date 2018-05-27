/**
 */
angular.module('directive.uploader', [])
    .directive('dyUploader', ['$compile', function ($compile) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                ngModel: '=',
                maxLength: '=',
                accept: '@',
                maxLengthError: '&',
                repeatNameError: '&'
            },
            templateUrl: 'directive/uploader/uploader.html',
            link: function ($scope, $elem, $attr) {
                $scope.ngModel = []
                $scope.ngModelTemp = []
                $scope.pictureList = []
                $scope.$watch('ngModelTemp.length', function (v1, v2) {
                    if (v1 != v2) {
                        // 刷新dom元素，防止文件留在队列中
                        var addIcon = $elem.find('input').parent()
                        $elem.find('input').remove()
                        addIcon.append($compile(
                            '<input type="file" dy-uploader-input multiple="multiple" accept="{{accept}}" ng-model="ngModelTemp"/>'
                        )($scope))
                        // 判断图片数量是否超标
                        if ($scope.ngModel.length <= $scope.maxLength) {
                            console.log($scope.ngModel, $scope.ngModelTemp)
                            // TODO 判断是否重名
                            for (var i in $scope.ngModel) {
                                for (var j in $scope.ngModelTemp) {
                                    if ($scope.ngModel[i].name == $scope.ngModelTemp[j].name) {
                                        $scope.repeatNameError()
                                        $scope.ngModelTemp = []
                                        return;
                                    }
                                }
                            }
                            // 为ngModel和pictureList做遍历
                            angular.forEach($scope.ngModelTemp, function (item) {
                                var reader = new FileReader()
                                reader.readAsDataURL(item)
                                reader.onload = function (event) {
                                    $scope.pictureList.push(event.target.result)
                                    $scope.$apply()
                                }
                                $scope.ngModel.push(item)
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
                ngModel: '=',
                accept: '@'
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
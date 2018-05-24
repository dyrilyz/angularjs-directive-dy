/**
 *                      d*##$.
 * zP"""""$e.           $"    $o
 *4$       '$          $"      $
 *'$        '$        J$       $F
 * 'b        $k       $>       $
 *  $k        $r     J$       d$
 *  '$         $     $"       $~
 *   '$        "$   '$E       $
 *    $         $L   $"      $F ...
 *     $.       4B   $      $$$*"""*b
 *     '$        $.  $$     $$      $F
 *      "$       R$  $F     $"      $
 *       $k      ?$ u*     dF      .$
 *       ^$.      $$"     z$      u$$$$e
 *        #$b             $E.dW@e$"    ?$
 *         #$           .o$$# d$$$$c    ?F
 *          $      .d$$#" . zo$>   #$r .uF
 *          $L .u$*"      $&$$$k   .$$d$$F
 *           $$"            ""^"$$$P"$P9$
 *          JP              .o$$$$u:$P $$
 *          $          ..ue$"      ""  $"
 *         d$          $F              $
 *         $$     ....udE             4B
 *          #$    """"` $r            @$
 *           ^$L        '$            $F
 *             RN        4N           $
 *              *$b                  d$
 *               $$k                 $F
 *               $$b                $F
 *                 $""               $F
 *                 '$                $
 *                  $L               $
 *                  '$               $
 *                   $               $
 *
 *                   保佑代码，不出Bug
 *
 */
angular.module('directive.step', []).directive('dyStep', function () {
    return {
        restrict: 'E',
        scope: {
            stepList: '=',
            step: '@'
        },
        template: `
                <ul class="dy-step">
                    <li ng-repeat="item in stepList track by $index" ng-class="{active: isActive($index)}"><span ng-bind="item"></span></li>
                </ul>
                `,
        controller: function ($scope) {
            $scope.isActive = function ($index) {
                if (!$scope.step) {
                    $scope.step = '0'
                }
                return parseInt($scope.step) >= $index;
            }
        }
    }
})
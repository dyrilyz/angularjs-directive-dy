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
import app from '../../app'
import template from './step.html'
import './step.less'

app.directive('dyStep', function () {
    return {
        restrict: 'E',
        scope: {
            stepList: '=',
            step: '@'
        },
        template: template,
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
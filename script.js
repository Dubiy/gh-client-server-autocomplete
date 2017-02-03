
var app = angular.module('myApp', []);
app.controller('SearchCtrl', function($scope, $http) {
    $scope.prefix = '';
    $scope.items = [];
    $scope.selected = [];
    $scope.current = 0;

    $scope.updList = function () {
        $http.get('/q/' + $scope.prefix).then(function (res) {
            console.log(res.data);
            $scope.items = res.data.matches;
            $scope.current = 0;
        }).catch(function (rej) {
            $scope.items = [];
        })
    };

    $scope.addTag = function (current) {
        $scope.selected.push($scope.items[current]);
        $scope.prefix = '';
        $scope.items = [];
    };

    $scope.onKey = function (event) {
        console.log(event);
        switch (event.keyCode) {
            case 40: {
                $scope.current++;
                if ($scope.current >= $scope.items.length) {
                    $scope.current = $scope.items.length - 1;
                }
            } break;
            case 38: {
                $scope.current--;
                if ($scope.current < 0) {
                    $scope.current = 0;
                }
            } break;
            case 13: {
                $scope.addTag($scope.current);
            } break;
        }
    }
});
var nameSpace = angular.module("jienoteApp", []);
nameSpace.controller("docFunction", ['$scope', '$http', function($scope, $http){
    $http.get('/documents.json').success(function(data){
        $scope.docData = data.result;
    });
}]);

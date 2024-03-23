angular.module('cafeApp', [])
.controller('InventoryController', ['$scope', '$http', function($scope, $http) {
    const baseUrl = 'http://localhost:3000/inventory';
    $scope.items = [];
    $scope.newItem = {};

    $scope.loadItems = function() {
        $http.get(baseUrl).then(function(response) {
            $scope.items = response.data;
        }, function(error) {
            console.error('Error fetching inventory', error);
        });
    };

    $scope.addItem = function() {
        $http.post(baseUrl, $scope.newItem).then(function(response) {
            $scope.items.push(response.data);
            $scope.newItem = {}; // Reset form
        }, function(error) {
            console.error('Error adding item', error);
        });
    };

    $scope.deleteItem = function(id) {
        $http.delete(`${baseUrl}/${id}`).then(function(response) {
            $scope.loadItems(); // Reload items
        }, function(error) {
            console.error('Error deleting item', error);
        });
    };

    $scope.loadItems(); // Initial load of inventory items
}]);

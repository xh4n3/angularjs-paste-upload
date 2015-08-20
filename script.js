var example = angular.module('example', []);
example.controller('editCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.paste = function (event) {
        var clipData = event.clipboardData;
        angular.forEach(clipData.items, function (item, key) {
            if (clipData.items[key]['type'].match(/image.*/)) {
            // if it is a image
            var img = clipData.items[key].getAsFile();
            console.log('A image sized ' + img.size + ' is being uploaded.');
            var fd = new FormData();
            fd.append('file', img);
            // CHANGE /post/paste TO YOUR OWN FILE RECEIVER
            $http.post("/post/paste", fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).success(function (url) {
                $scope.body = $scope.body + '\n![PICTURE](' + url + ')';
                // the url returns
            }).error(function (data) {
                alert(data);
            });
        };
    });
    };
}]);
var example = angular.module('example', []);

example.controller('editCtrl', ['$scope', '$http', function ($scope, $http) {
    
                $scope.paste = function (event) {
                    //console.log(event);
                    //console.log(event.originalEvent);
                    var clipData = event.originalEvent.clipboardData;
                    //console.log(clipData.types);
                    //console.log(clipData.getData("Text"));
                    angular.forEach(clipData.items, function (item, key) {
                        //console.log({item: item,key: key});
                        //console.log(clipData.items[key]);
                        //console.log(clipData.items[key]['type']);
                        if (clipData.items[key]['type'].match(/image.*/)) {
                            // if it is a image
                            var img = clipData.items[key].getAsFile();
                            //console.log(img);
                            var fd = new FormData();
                            fd.append('file', img);
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
        }
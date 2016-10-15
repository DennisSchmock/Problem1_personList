var app = angular.module('personApp', ['ngRoute']);


app.controller('listController', function ($scope,$location, personList) {

    $scope.persons = personList.getAll();

    $scope.addPerson = function () {
        personList.addPerson($scope.newPerson);
        $location.path('/signin');
    };

});

app.controller('detailsController', function ($scope, $routeParams, personList) {

    $scope.id = $routeParams.id;
    $scope.person = personList.getPerson($scope.id);

});


app.config(function ($routeProvider) {
    $routeProvider
            .when("/list", {
                templateUrl: "templates/listall.html",
                controller: "listController"
            })
            .when("/add", {
                templateUrl: "templates/add.html",
                controller: "listController"
            })
            .when("/details/:id", {
                templateUrl: "templates/details.html",
                controller: "detailsController"
            }).otherwise({
        redirectTo: "/list"
    });

});

app.factory('personList', function () {
    var persons = [
        {id: 1, name: "Jens", age: 18}
        , {id: 2, name: "Peter", age: 23}
        , {id: 3, name: "Hanne", age: 23}
    ];

    return{
        getAll: function () {
            return persons;
        },
        getSize: function () {
            return persons.size();
        },
        getPerson: function (id) {
            return persons[id];
        },
        addPerson: function (person) {
            person.id = persons.length + 1;
            persons.push(person);
        },
        editPerson: function (id) {
            for (var i in persons) {
                if ($scope.persons[i].id == id) {
                    $scope.newPerson = angular.copy($scope.persons);
                }
            }
        }
    };
});




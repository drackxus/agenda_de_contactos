"use strict";

angular
  .module("agenda.newContact", ["ngRoute"])

  .config([
    "$routeProvider",
    function ($routeProvider) {
      $routeProvider.when("/newContact", {
        templateUrl: "views/newContact/new.html",
        controller: "newCtrl",
      });
    },
  ])

  .controller("newCtrl", [
    "$scope",
    "$rootScope",
    "$http",
    "$location",
    function ($scope, $rootScope, $http, $location) {
      //crear el nuevo contacto
      $scope.saveUser = function (contact) {
        //validando el formulario
        if (!$scope.newUser.$valid) {
          alert("Por favor verifique todos los campos");
        } else {
          //mostrar loader
          $scope.loading = true;
          $http({
            method: "POST",
            url:
              "https://api.backendless.com/80E9E97D-59E2-6B3B-FF19-1A74C83F8600/1602B94C-3672-4E36-B602-93FD965E6E65/data/contactos",
            data: {
              nombre: contact.nombre,
              correo_electronico: contact.correo_electronico,
              direccion: contact.direccion,
              telefono: contact.telefono,
              fecha_de_nacimiento: contact.fecha_de_nacimiento,
            },
          }).then(
            function successCallback(response) {
              //ocultar loader
              $scope.loading = false;
              $location.path("listContact");
            },
            function errorCallback(response) {
              //ocultar loader
              $scope.loading = false;
              alert("Ha habido un error");
            }
          );
        }
      };
      $scope.return = function () {
        $location.path("listContact");
      };
    },
  ]);

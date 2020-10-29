"use strict";

angular
  .module("agenda.editContact", ["ngRoute"])

  .config([
    "$routeProvider",
    function ($routeProvider) {
      $routeProvider.when("/editContact/:id", {
        templateUrl: "views/editContact/edit.html",
        controller: "editCtrl",
      });
    },
  ])

  .controller("editCtrl", [
    "$scope",
    "$http",
    "$rootScope",
    "$location",
    "$routeParams",
    function ($scope, $http, $rootScope, $location, $routeParams) {
      //obtenemos los datos del contacto a editar
      $scope.contact = $rootScope.contactEdit;
      $scope.contact.telefono = parseInt($rootScope.contactEdit.telefono);
      $scope.contact.fecha_de_nacimiento = new Date(
        $rootScope.contactEdit.fecha_de_nacimiento
      );

      //actualizar contacto
      $scope.updateContact = function () {
        //mostrar loader
        $scope.loading = false;
        if (!$scope.newUser.$valid) {
          alert("Por favor verifique todos los campos");
        } else {
          $http({
            method: "PUT",
            url:
              "https://api.backendless.com/80E9E97D-59E2-6B3B-FF19-1A74C83F8600/1602B94C-3672-4E36-B602-93FD965E6E65/data/contactos/" +
              $scope.contact.objectId,
            data: {
              nombre: $scope.contact.nombre,
              correo_electronico: $scope.contact.correo_electronico,
              direccion: $scope.contact.direccion,
              telefono: $scope.contact.telefono,
              fecha_de_nacimiento: $scope.contact.fecha_de_nacimiento,
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
              alert("No se pudo actualizar el contacto");
            }
          );
        }
      };
    },
  ]);

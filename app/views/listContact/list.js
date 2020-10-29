"use strict";

angular
  .module("agenda.listContact", ["ngRoute"])

  .config([
    "$routeProvider",
    function ($routeProvider) {
      $routeProvider.when("/listContact", {
        templateUrl: "views/listContact/list.html",
        controller: "listCtrl",
      });
    },
  ])

  .controller("listCtrl", [
    "$scope",
    "$http",
    "$rootScope",
    "$location",
    function ($scope, $http, $rootScope, $location) {

      var suma = 7 + '23';
      console.log(suma);
      //mostar loader
      $scope.loading = true;
      //obtener contactos
      $http({
        method: "GET",
        url:
          "https://api.backendless.com/80E9E97D-59E2-6B3B-FF19-1A74C83F8600/1602B94C-3672-4E36-B602-93FD965E6E65/data/contactos",
      }).then(
        function successCallback(response) {
          //ocultamos loader
          $scope.loading = false;
          
          //inicializamos
          $rootScope.contacts = [];

          //recorremos los datos       
          for(var i=0; i<response.data.length; i++) {
            //hacemos calculo de edad
            var fechaNacimiento = new Date(response.data[i].fecha_de_nacimiento);

            var fechaHoy = new Date();
            var control = 0;
            if (fechaHoy.getMonth() < fechaNacimiento.getMonth()) {
                control = 1;
            } else if ((fechaHoy.getMonth() == fechaNacimiento.getMonth()) && fechaHoy.getDate() < fechaNacimiento.getDate()) {
                control = 1;
            }
            var age = fechaHoy.getFullYear() - fechaNacimiento.getFullYear() - control;
            
            response.data[i].edad = age+" Años";
            
            //insertamos datos
            $rootScope.contacts.push(response.data[i]);
          }
        },
        function errorCallback(response) {
          $scope.loading = false;
          alert("Ha ocurrido un error");
        }
      );
      //eliminar contacto por id
      $scope.deleteContact = function (id) {
        //mostar loader
        $scope.loading = true;
        $http({
          method: "DELETE",
          url:
            "https://api.backendless.com/80E9E97D-59E2-6B3B-FF19-1A74C83F8600/1602B94C-3672-4E36-B602-93FD965E6E65/data/contactos/" +
            id,
        }).then(
          function successCallback(response) {
            $scope.loading = false;
            location.reload();
          },
          function errorCallback(response) {
            $scope.loading = false;
            alert("Ha ocurrido un error");
          }
        );
      };

      //redirigir a vista nuevo contacto
      $scope.newContact = function () {
        $scope.loading = false;
        $location.path("newContact");
      };

      //redirigir a vista editar contacto y enviar id como parametro
      $scope.editContact = function (contacto) {
        $scope.loading = false;
        $rootScope.contactEdit = contacto;
        $location.path("editContact/" + contacto.objectId);
      };
    },
  ]);

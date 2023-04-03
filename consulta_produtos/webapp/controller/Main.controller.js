sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/library",
  "sap/ui/model/json/JSONModel",
],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, library, JSONModel) {
    "use strict";

    return Controller.extend("consultaprodutos.controller.Main", {
      onInit: function () {
        let produto = {};
        let productModel = new JSONModel(produto);
        let view = this.getView();
        view.setModel(productModel, 'ModeloProduto');

      },
      onPressBuscar: function () {
        let input;
        input = this.byId("inpBusca")
        let valor = input.getValue();

        if (!valor) {
          valor = '5449000214911';
        }

        let parameters = {
          url: `https://world.openfoodfacts.org/api/v2/product/${valor}`,
          method: 'GET',
          async: true,
          crossDomain: true,
        };

        $.ajax(parameters)
          .done((response) => {
            let oProdutoModel = this.getView().getModel('ModeloProduto');
            oProdutoModel.setData({});
            oProdutoModel.refresh();
            oProdutoModel.setData(response);
            oProdutoModel.refresh();

          })
          .fail(() => {
            console.log("erro ao chamado o backend");
          });
      },

      onClickImage: (event) => {
        let urlImgObj = library.URLHelper;
        urlImgObj.redirect(event.getSource().getSrc(), true);
      }
    });
  });

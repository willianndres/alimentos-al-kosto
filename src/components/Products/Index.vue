<template>
  <div class="container-fluid" id="container-wrapper">
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Productos</h1>
      <router-link class="btn btn-primary" to="/dashboard/products/add">
        Adicionar elemento
      </router-link>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <Table
          :headers="[
            'Nombre',
            'Precio',
            'Precio anterior',
            'Imagen',
            'Categoria',
            'Acciones',
          ]"
          :data="allProducts"
          nameTable="Lista de productos"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Table from "../DOMComponents/TableProducts";
import { reactive, computed, inject } from "vue";
import { endpoint } from "../../../backend/api";
import axios from "axios";
import router from "@/router";
export default {
  components: {
    Table,
  },
  setup() {
    const state = reactive({
      allProducts: [],
    });
    const $swal = inject("$swal");
    const allProducts = computed(() => state.allProducts);

    const getAllProducts = async () => {
      try {
        const getData = await axios({
          url: endpoint + "all-products",
          method: "get",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
      
        if (getData.status == 200) {
          state.allProducts = getData.data.all_products;
        }
      } catch (error) {
        console.log(error);
        if (error.request.status == 403) {
          localStorage.removeItem("token");
          router.push("/403");
        } else {
          $swal({
            icon: "error",
            title: "Parece que algo ha ido mal.",
            text: "Por favor notifica del error.",
          });
        }
      }
    };
    getAllProducts();

    return {
      allProducts,
    };
  },
};
</script>
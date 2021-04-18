<template>
  <div class="container-fluid" id="container-wrapper">
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Usuarios</h1>
      <router-link class="btn btn-primary" to="/dashboard/users/add">
        Adicionar elemento
      </router-link>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <Table
          :headers="[
            'Nombre',
            'Apellido',
            'Email',
            'Dirección',
            'Rol',
            'Acciones',
          ]"
          :data="allUsers"
          nameTable="Lista de usuarios"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Table from "../DOMComponents/TableUsers";
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
      allUsers: [],
    });
    const $swal = inject("$swal");
    const allUsers = computed(() => state.allUsers);

    const getAllUsers = async () => {
      try {
        const getData = await axios({
          url: endpoint + "all-users",
          method: "get",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        console.log(getData.status);
        if (getData.status == 200) {
          state.allUsers = getData.data.all_users;
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
    getAllUsers();

    return {
      allUsers,
    };
  },
};
</script>
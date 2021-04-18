<template>
  <div class="container-fluid" id="container-wrapper">
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-1 text-gray-800">Adicionar usuario</h1>
      <button class="btn btn-primary" @click.prevent="back">
        <i class="fas fa-arrow-left"></i> Atrás
      </button>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card mb-4">
          <div class="card-header">
            <h6 class="m-0 font-weight-bold text-primary">Agregar</h6>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-lg-6 form-group">
                <label for="">Nombre</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nombre"
                  v-model="name"
                />
              </div>
              <div class="col-lg-6 form-group">
                <label for="">Apellido</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Apellido"
                  v-model="lastname"
                />
              </div>
              <div class="col-lg-6 form-group">
                <label for="">Email</label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="Email"
                  v-model="email"
                />
              </div>
              <div class="col-lg-6 form-group">
                <label for="">Dirección</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Dirección"
                  v-model="address"
                />
              </div>
              <div class="col-lg-6 form-group">
                <label for="">Rol</label>
                <select v-model="rol" class="form-control">
                  <option value="null" selected>Seleccione un rol</option>
                  <option value="0">Administrador</option>
                  <option value="1">Proveedor</option>
                </select>
              </div>
              <div class="col-lg-6 form-group">
                <label for="">Contraseña</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Contraseña"
                  v-model="password"
                />
              </div>
              <div class="col-lg-6 form-group">
                <label for="">Repetir contraseña</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Repetir contraseña"
                  v-model="repeat_password"
                />
              </div>
              <div class="col-lg-12 form-group text-right">
                <button
                  type="submit"
                  class="btn btn-primary"
                  @click.prevent="sendUser"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, reactive, toRefs } from "vue";
import axios from "axios";
import router from "@/router";
import { endpoint } from "../../../backend/api";

export default {
  setup() {
    const $swal = inject("$swal");
    const state = reactive({
      name: "",
      lastname: "",
      email: "",
      address: "",
      password: "",
      repeat_password: "",
      rol: null,
    });

    const cleanAllInputs = () => {
      (state.name = ""),
        (state.lasname = ""),
        (state.email = ""),
        (state.address = ""),
        (state.password = ""),
        (state.repeat_password = ""),
        (state.rol = null);
    };

    const back = () => {
      cleanAllInputs();
      router.go(-1);
    };

    const sendUser = async () => {
      if (state.password != state.repeat_password) {
        $swal({
          icon: "error",
          title: "Parece que algo ha ido mal.",
          text:
            "El campo contraseña y repetir contraseña tienen que ser iguales.",
        });
      }
      const user = {
        name: state.name,
        lasname: state.lasname,
        email: state.email,
        address: state.address,
        rol: state.rol,
        password: state.password,
      };
      try {
        const sendData = await axios({
          url: endpoint + "user-add",
          method: "post",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          data: user,
        });
        if (sendData.status == 200) {
          $swal({
            icon: "success",
            title: "Buen trabajo.",
            text: sendData.data.message,
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("/dashboard/users");
            }
          });
        }
      } catch (error) {
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

    return {
      back,
      sendUser,
      ...toRefs(state),
    };
  },
};
</script>
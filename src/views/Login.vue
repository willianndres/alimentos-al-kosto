<template>
  <div class="bg-gradient-login">
    <div class="container-login">
      <div class="row justify-content-center">
        <div class="col-xl-6 col-lg-12 col-md-9">
          <div class="card shadow-sm my-5">
            <div class="card-body p-0">
              <div class="row">
                <div class="col-lg-12">
                  <div class="row">
                    <div class="col-lg-8">
                      <div class="login-form">
                        <div class="text-center">
                          <h1 class="h4 text-gray-900 mb-4">Iniciar sesión</h1>
                        </div>
                        <form class="user">
                          <div class="form-group">
                            <input
                              type="email"
                              class="form-control"
                              id="exampleInputEmail"
                              aria-describedby="emailHelp"
                              placeholder="Email"
                              v-model="email"
                              @input="
                                $emit('update:email', $event.target.value)
                              "
                            />
                          </div>
                          <div class="form-group">
                            <input
                              type="password"
                              class="form-control"
                              id="exampleInputPassword"
                              placeholder="Contraseña"
                              v-model="password"
                              @input="
                                $emit('update:password', $event.target.value)
                              "
                              @keyup.enter="loginUser"
                            />
                          </div>
                          <div class="form-group">
                            <div
                              class="custom-control custom-checkbox small"
                              style="line-height: 1.5rem"
                            >
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                id="customCheck"
                              />
                            </div>
                          </div>
                          <div class="form-group">
                            <a
                              href="index.html"
                              class="btn btn-primary btn-block"
                              @click.prevent="loginUser"
                              >Confirmar</a
                            >
                          </div>
                        </form>
                      </div>
                    </div>
                    <div
                      class="col-lg-4 d-flex justify-content-center hidden-xs hidden-sm hidden-md bg-logo"
                    >
                      <img src="/img/logo.png" class="logo-login img-fluid" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import router from "@/router";
import { endpoint } from "../../backend/api";
export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
    const loginUser = async () => {
      const sendUserData = {
        email: email.value,
        password: password.value,
      };
      const sendUser = await fetch(endpoint + "auth", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendUserData),
      });
      if (sendUser.status == 200) {
        const data = await sendUser.json();
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          router.push("/dashboard");
        } else {
          alert("Mala respuesta 2");
        }
      } else {
        alert("Mala respuesta");
      }
    };
    return {
      email,
      password,
      loginUser,
    };
  },
};
</script>

<style scoped>
.logo-login {
  margin: auto;
  display: block;
}
.img-fluid {
  max-width: 50% !important;
}
@media (max-width: 575px) {
  .hidden-xs {
    display: none !important;
  }
}
@media (min-width: 576px) and (max-width: 767px) {
  .hidden-sm {
    display: none !important;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .hidden-md {
    display: none !important;
  }
}
.bg-logo {
  background-color: #e6e6fa !important;
}
</style>
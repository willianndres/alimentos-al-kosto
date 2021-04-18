<template>
  <nav
    class="navbar navbar-expand navbar-light bg-navbar topbar mb-4 static-top"
  >
    <button
      id="sidebarToggleTop"
      @click.prevent="toggleButton"
      class="btn btn-link rounded-circle mr-3"
    >
      <i class="fa fa-bars"></i>
    </button>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item dropdown no-arrow">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="userDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          @click.prevent="showDrop"
        >
          <span class="ml-2 d-none d-lg-inline text-white small">{{
            user.name
          }}</span>
        </a>
        <div
          class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
          :class="{ 'd-block': isShow, 'd-none': !isShow }"
          aria-labelledby="userDropdown"
        >
          <a
            class="dropdown-item"
            href="javascript:void(0);"
            @click.prevent="logout"
          >
            <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
            Cerrar sesión
          </a>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
import { ref } from "vue";
import router from "@/router";
export default {
  setup() {
    const user = JSON.parse(localStorage.getItem("user")) ?? null;
    const isShow = ref(false);
    const showDrop = () => {
      isShow.value = !isShow.value;
    };
    const logout = () => {
      localStorage.clear();
      router.push("/");
    };
    const toggleButton = () => {
      alert("Hola mundo");
    };
    return {
      user,
      isShow,
      showDrop,
      logout,
      toggleButton,
    };
  },
};
</script>
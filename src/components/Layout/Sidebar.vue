<template>
  <ul
    class="navbar-nav sidebar bg-logo sidebar-light accordion"
    id="accordionSidebar"
  >
    <router-link
      class="sidebar-brand d-flex align-items-center justify-content-center"
      to="/dashboard"
    >
      <div class="sidebar-brand-icon">
        <img src="/img/logo.png" />
      </div>
      <div class="sidebar-brand-text p-l">Alimentos al kosto</div>
    </router-link>
    <hr class="sidebar-divider my-0" />
    <li class="nav-item active">
      <router-link class="nav-link" to="/dashboard">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span>Dashboard</span></router-link
      >
    </li>
    <hr class="sidebar-divider" />
    <div class="sidebar-heading">Productos</div>
    <li class="nav-item">
      <router-link class="nav-link" to="/dashboard/products">
        <i class="fas fa-clipboard-list"></i>
        <span>Gestionar productos</span>
      </router-link>
    </li>
    <hr class="sidebar-divider" />
    <div class="sidebar-heading">Categorias</div>
    <li class="nav-item">
      <router-link class="nav-link" to="/dashboard/categories">
        <i class="fas fa-list"></i>
        <span>Gestionar categorias</span>
      </router-link>
    </li>
    <hr class="sidebar-divider" />
    <div class="sidebar-heading">Usuarios</div>
    <li class="nav-item">
      <router-link class="nav-link" to="/dashboard/users">
        <i class="fas fa-user"></i>
        <span>Gestionar usuarios</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  setup() {
    const user = JSON.parse(localStorage.getItem("user")) ?? null;
    return {
      user,
    };
  },
};
</script>

<style scoped>
.p-l {
  padding-left: 7px !important;
}

.sidebar-light .sidebar-brand {
  color: #fafafa;
  background-color: #e6e6fa !important;
  color: #283481!important;
}
</style>
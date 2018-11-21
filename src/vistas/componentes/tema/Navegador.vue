<template lang="pug">
  div 
        header
            nav.navbar.navbar-expand-md.navbar-dark.fixed-top.bg-dark
                .container
                    .navbar-header
                        router-link.navbar-brand(:to="{ name:'MostrarProducto' }") Kiosco Heidi
                        button.navbar-toggler(type='button', data-toggle='collapse', data-target='#mostrarOpciones')
                            span.navbar-toggler-icon
                    #mostrarOpciones.collapse.navbar-collapse
                        ul.navbar-nav.mr-auto
                            li.nav-item
                                router-link.nav-link.active(v-show='sesionIniciada', :to="{ name:'MostrarProducto' }") Productos
                            li.nav-item
                                router-link.nav-link(v-show='sesionIniciada', :to="{ name:'CrearProducto' }") Crear producto
                            li.nav-item
                                router-link.nav-link(v-show='!sesionIniciada', :to="{ name:'ConectarUsuario' }") Conectar
                            li.nav-item
                                router-link.nav-link(v-show='!sesionIniciada', :to="{ name:'RegistrarUsuario' }") Registrar
                            li.nav-item
                                router-link.nav-link(v-show='sesionIniciada', :to="{ name:'DesconectarUsuario' }") Desconectar  
</template>

<script>
export default {
  data() {
    return {
      sesionIniciada: false
    };
  },
  created() {
    this.$bus.$on("actualizarSesion", valor => {
      this.sesionIniciada = valor;
    });
  }
};
</script>
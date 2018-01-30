<template lang="html">
    <div>
        <nav class="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top">
            <router-link :to="{ name:'MostrarProducto' }" class="navbar-brand">Kiosco Heidi</router-link>
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link v-if="this.$session.exists()" :to="{ name:'MostrarProducto' }" class="nav-link active">Productos</router-link>
                </li>
                <li class="nav-item">
                    <router-link v-if="this.$session.exists()" :to="{ name:'CrearProducto' }" class="nav-link">Crear producto</router-link>
                </li>
                <li class="nav-item">
                    <router-link v-if="!this.$session.exists()" :to="{ name:'ConectarUsuario' }" class="nav-link">Conectar</router-link>
                </li>
                <li class="nav-item">
                    <router-link v-if="!this.$session.exists()" :to="{ name:'RegistrarUsuario' }" class="nav-link">Registrar</router-link>
                </li>
                <li class="nav-item">
                    <router-link v-if="this.$session.exists()" :to="{ name:'DesconectarUsuario' }" class="nav-link">Desconectar</router-link>
                </li>
            </ul>
        </nav>
        <br><br><br><br>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script> 
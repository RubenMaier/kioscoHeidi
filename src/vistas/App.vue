<template lang="html">
    <div>
        <header>
            <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <div class="container">
                    <div class="navbar-header">
                        <router-link :to="{ name:'MostrarProducto' }" class="navbar-brand">Kiosco Heidi</router-link>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div class="collapse navbar-collapse" id="navbarCollapse">
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
                    </div>
                </div>
            </nav>
        </header>
        <br><br><br>
        <main class="container">
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
export default {
    
}
</script> 
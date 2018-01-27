<template lang="html">
    <div>
        <router-link :to="{ name:'MostrarProducto' }">
            <h1>Kiosco Heidi</h1>
        </router-link>
        <router-link :to="{ name:'CrearProducto' }" class="btn btn-primary">
            Crear producto
        </router-link>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script> 
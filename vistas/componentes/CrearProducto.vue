<template lang="html">
    <div>
        <form v-on:submit.prevent="agregarProducto" class="card">
            <div class="card-title">
                <h1>Agregar un producto</h1>
            </div>
            <div class="card-body">
                <div class="form-group">
                    <div class="form-group">
                        <input type="text" v-model="producto.nombre" placeholder="Agrega un nombre" class="form-control">
                    </div>
                    <div class="form-group">
                        <input type="text" v-model="producto.categoria" placeholder="Agrega una categoria" class="form-control">
                    </div>
                    <div class="form-group">
                        <input type="text" v-model="producto.marca" placeholder="Agrega una marca" class="form-control">
                    </div> 
                    <div class="form-group">
                        <input type="text" v-model="producto.precio" placeholder="Agrega un precio" class="form-control">
                    </div>
                    <div class="form-group">
                        <input type="text" v-model="producto.segun" placeholder="Agrega el formato en el que se vende el producto" class="form-control">
                    </div>
                    <button type="submit" class="btn btn-primary">
                        Agregar
                    </button>
                    <router-link :to="{ name:'MostrarProducto' }" class="btn btn-primary">
                        Volver
                    </router-link>
                    <div id="resultado"></div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            producto: {}
        }
    },
    methods: {
        agregarProducto() {
             this.axios.post('/productos/agregar', this.producto)
                .then(res => document.getElementById("resultado").innerHTML = "Producto de nombre " + this.producto.nombre + " agregado con exito!")
                .catch(err => console.log(err));
        }
    }
}
</script> 
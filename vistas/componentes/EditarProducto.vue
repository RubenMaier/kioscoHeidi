 <template lang="html">
    <div class="card">
        <div class="card-block">
            <div class="card-title">
                <h1>Actualizar producto</h1>
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="actualizarProducto" class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon">Producto</span>
                        <input type="text" v-model="producto.nombre" placeholder="Agrega un nombre" class="form-control">
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon">Categoria</span>
                        <input type="text" v-model="producto.categoria" placeholder="Agrega una categoria" class="form-control">
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon">Marca</span>
                        <input type="text" v-model="producto.marca" placeholder="Agrega una marca" class="form-control">
                    </div> 
                    <div class="input-group">
                        <span class="input-group-addon">Precio</span>
                        <input type="text" v-model="producto.precio" placeholder="Agrega un precio" class="form-control">
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon">Segun</span>
                        <input type="text" v-model="producto.segun" placeholder="Agrega el formato en el que se vende el producto" class="form-control">
                    </div>
                    <button type="submit" class="btn btn-lg btn-primary btn-block">Actualizar</button>
                    <div v-if="this.alerta" v-bind:class="[alertaClass]" role="alert">{{this.resultado}}</div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            producto: {},
            resultado: null,
            alerta: false,
            alertaClass: "alert alert-warning"
        }
    },
    created() {
        this.obtenerProducto();
    },
    methods: {
        obtenerProducto() {
            this.axios.get('/productos/obtener/' + this.$route.params.id)
                .then(res => {
                    this.producto = res.data;
                })
                .catch(err => console.log(err));
        },
        actualizarProducto() {
            this.axios.put('/productos/actualizar/' + this.$route.params.id, this.producto)
                .then(res => {
                    this.alerta = true;
                    this.alertaClass = "alert alert-success";
                    this.resultado = "Producto de nombre " + this.producto.nombre + " actualizado con exito!"
                })
                .catch(err => console.log(err));
        }
    }
}
</script> 
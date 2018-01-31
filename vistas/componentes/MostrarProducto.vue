 <template lang="html">
    <div>
        <h3>Lista de productos</h3>

        <table class="table">
            <thead class="thead-inverse">
                <tr>
                    <th>Producto</th>
                    <th>Categoria</th>
                    <th>Marca</th>
                    <th>Precio</th>
                    <th>Segun</th>
                    <th>Operacion</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(producto, index) in productos">
                    <td>{{producto.nombre}}</td>
                    <td>{{producto.categoria}}</td>
                    <td>{{producto.marca}}</td>
                    <td>$ {{producto.precio}}</td>
                    <td>{{producto.segun}}</td>
                    <td>
                        <a href="#" class="btn btn-danger" v-on:click="borrarProducto(index, producto._id)">
                            Eliminar
                        </a>
                        <router-link :to="{ name: 'EditarProducto', params: {id: producto._id} }" class="btn btn-success">
                            Actualizar
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            productos: []
        }
    },
    created() {
        this.obtenerProductos();
    },
    methods: {
        obtenerProductos() {
            if(!this.$session.exists()) return this.$router.push({name: 'ConectarUsuario'});
            this.axios.get('/productos')
                .then(res => {
                    this.productos = res.data
                })
                .catch(err => console.log(err));
        },
        borrarProducto(index, id) {
            const respuesta = confirm('¿Estas seguro de eliminar este producto?');
            if(respuesta) {
                this.axios.delete('/productos/borrar/' + id)
                    .then(res => {
                        console.log("estoy saliendo de esta mierda 2");
                         this.productos.splice(index, 1)
                    })
                    .catch(err => console.log(err));
            }
        }
    }
}
</script> 
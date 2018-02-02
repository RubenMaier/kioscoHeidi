 <template lang="html">
    <div class="card">
        <h3 class="card-header">Lista de productos</h3>
        <div class="card-body">
            <div class="table-responsive">

                <form v-on:submit.prevent="efectuarBusqueda(busqueda)" class="form-group">
                    <div class="input-group">
                        <input type="text" v-model="busqueda.nombre" class="form-control" placeholder="Ingrese el nombre del producto...">
                        <input type="text" v-model="busqueda.categoria" class="form-control" placeholder="Ingrese una categoria...">
                        <input type="text" v-model="busqueda.marca" class="form-control" placeholder="Ingrese una marca...">
                        <button type="submit" class="btn btn-primary">Buscar</button>
                    </div>
                </form>

                <table class="table table-sm">
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
                                <a href="#" class="btn btn-danger" v-on:click="borrarProducto(index, producto._id)">Eliminar</a>
                                <router-link :to="{ name: 'EditarProducto', params: {id: producto._id} }" class="btn btn-success">Actualizar</router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            productos: [],
            busqueda: {}
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
                    .then(res => this.productos.splice(index, 1))
                    .catch(err => console.log(err));
            }
        },
        efectuarBusqueda(busqueda) {
            this.axios.get('/productos/buscar/' + busqueda.nombre + "&" + busqueda.categoria + "&" + busqueda.marca)
                .then(res => {
                        
                })
                .catch(err => console.log(err));
        }
    }
}
</script> 
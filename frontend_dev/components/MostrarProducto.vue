 <template lang="html">
    <div>
        <h3>Lista de productos</h3>

        <table class="table table-hover table-bordered">
            <thead>
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
                <tr v-for="producto in productos">
                    <td>{{producto.nombre}}</td>
                    <td>{{producto.categoria}}</td>
                    <td>{{producto.marca}}</td>
                    <td>{{producto.precio}}</td>
                    <td>{{producto.segun}}</td>
                    <td>
                        <a href="#" class="btn btn-danger">Eliminar</a>
                        <a href="#" class="btn btn-dark">Actualizar</a>
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
            this.axios.get('/productos')
                .then(res => {
                    this.productos = res.data
                })
                .catch(err => console.log(err));
        }
    }
}
</script> 
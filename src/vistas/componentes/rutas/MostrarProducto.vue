 <template lang="pug">
    .card
        h3.card-header Lista de productos
        .card-body
            .table-responsive
                form.form-group(v-on:submit.prevent='efectuarBusqueda(busqueda)')
                    .input-group
                        input.form-control(type='text', v-model='busqueda.nombre', placeholder='Ingrese el nombre del producto...')
                        input.form-control(type='text', v-model='busqueda.categoria', placeholder='Ingrese una categoria...')
                        input.form-control(type='text', v-model='busqueda.marca', placeholder='Ingrese una marca...')
                        button.btn.btn-primary(type='submit') Buscar
                table.table.table-sm
                    thead.thead-inverse
                        tr
                            th Producto
                            th Categoria
                            th Marca
                            th Precio
                            th Segun
                            th Operacion
                    tbody
                        tr(v-for='(producto, index) in productos')
                            td {{producto.nombre}}
                            td {{producto.categoria}}
                            td {{producto.marca}}
                            td $ {{producto.precio}}
                            td {{producto.segun}}
                            td(colspan="2")
                                a.btn.btn-danger.mx-2(href='#', v-on:click='borrarProducto(index, producto._id)') Eliminar
                                router-link.btn.btn-success.mx-2(v-bind:to="{ name: 'EditarProducto', params: {id: producto._id} }") Actualizar

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
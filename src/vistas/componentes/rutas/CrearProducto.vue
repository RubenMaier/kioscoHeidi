 <template lang="pug">
    .card
        h3.card-header Agregar producto
        .card-body
            form.form-group(v-on:submit.prevent='agregarProducto')
                .input-group.my-1
                    .input-group-prepend
                        span.input-group-text Producto
                    input.form-control(type='text', v-model='producto.nombre', placeholder='Agrega un nombre')
                .input-group.my-1
                    .input-group-prepend
                        span.input-group-text Categoria
                    input.form-control(type='text', v-model='producto.categoria', placeholder='Agrega una categoria')
                .input-group.my-1
                    .input-group-prepend
                        span.input-group-text Marca
                    input.form-control(type='text', v-model='producto.marca', placeholder='Agrega una marca')
                .input-group.my-1
                    .input-group-prepend
                        span.input-group-text Precio
                    input.form-control(type='text', v-model='producto.precio', placeholder='Agrega un precio')
                .input-group.my-1
                    .input-group-prepend
                        span.input-group-text Segun
                    input.form-control(type='text', v-model='producto.segun', placeholder='Agrega el formato en el que se vende el producto')
                button.btn.btn-lg.btn-primary.btn-block(type='submit') Actualizar
                div(v-if='this.alerta', v-bind:class='[alertaClass]', role='alert') {{ resultado }}

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
    methods: {
        agregarProducto() {
             this.axios.post('/productos/agregar', this.producto)
                .then(res => {
                    this.alerta = true;
                    this.alertaClass = "alert alert-success";
                    this.resultado = `Producto de nombre ${this.producto.nombre} agregado con exito!`})
                .catch(err => console.log(err));
        }
    }
}
</script> 
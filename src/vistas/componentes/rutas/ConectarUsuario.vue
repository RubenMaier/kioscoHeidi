 <template lang="pug">
    .card
        h3.card-header Inicio de sesion
        .card-body
            form.form-group(v-on:submit.prevent='conectarUsuario')
                .input-group.my-1
                    .input-group-prepend
                        span.input-group-text Username
                    input.form-control(type='text', v-model='usuario.username', placeholder='Username...')
                .alert.alert-warning.my-1(v-if='resultado.username', role='alert')  {{ resultado.username }} 
                .input-group.my-1
                    .input-group-prepend
                        span.input-group-text Password
                    input.form-control(type='password', v-model='usuario.password', placeholder='Password...')
                .alert.alert-warning.my-1(v-if='resultado.password', role='alert')  {{ resultado.password }} 
                button.btn.btn-primary.btn-lg.btn-block.my-1(type='submit') Conectar
            .alert.alert-warning(v-if='resultado.general', role='alert')  {{ resultado.general }} 
</template>

<script>
export default {
    data() {
        return {
            usuario: {},
            resultado: {
                username: null,
                password: null,
                general: null
            }
        }
    },
    created() {
        this.validarConexion();
    },
    methods: {
        validarConexion() {
            if(this.$session.exists()) this.$router.push({name: 'MostrarProducto'});
            console.log(this.$session)
        },
        conectarUsuario() {
            this.resultado.username = null;
            this.resultado.password = null;
            this.resultado.general = null;
            if(!this.usuario.username) this.resultado.username = "Ingrese un username";
            if(!this.usuario.password) this.resultado.password = "Ingrese un password";
            if(!this.resultado.username && !this.resultado.password) {
                this.axios.post('/usuarios/conectar', this.usuario)
                    .then(res => {
                        if(res.data.error !== "200") {
                            this.resultado.general = "La password o el username es incorrecto";
                            return;
                        }
                        this.$session.start();
                        this.$session.set('id', res.data.resultado);
                        this.$bus.$emit('actualizarSesion', true);
                        this.$router.push({name: 'MostrarProducto'});
                    })
                    .catch(err => console.log(err));
            }
        }
    }
}
</script> 
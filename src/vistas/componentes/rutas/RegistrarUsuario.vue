 <template lang="pug">
    .card
        h3.card-header Registro de usuario
        .card-body
            form.form-group(v-on:submit.prevent='registrarUsuario')
                .input-group.my-1
                    .input-group-prepend
                        span.input-group-text Username
                    input.form-control(type='text', v-model='usuario.username', placeholder='Username...')
                .alert.alert-warning.my-1(v-if='this.resultado.username', role='alert') {{ resultado.username }}
                .input-group.my-1
                    .input-group-prepend
                        span.input-group-text Password
                    input.form-control(type='password', v-model='usuario.password', placeholder='Password...')
                .alert.alert-warning.my-1(v-if='this.resultado.password', role='alert') {{ resultado.password }}
                .input-group.my-1
                    .input-group-prepend
                        span.input-group-text Email
                    input.form-control(type='text', v-model='usuario.email', placeholder='Email...')
                .alert.alert-warning.my-1(v-if='this.resultado.email', role='alert') {{ resultado.email }}
                .input-group.my-1
                    .input-group-prepend
                        span.input-group-text Nombre
                    input.form-control(type='text', v-model='usuario.nombre', placeholder='Nombre...')
                .alert.alert-warning.my-1(v-if='this.resultado.nombre', role='alert') {{ resultado.nombre }}
                .input-group.my-1
                    .input-group-prepend
                        span.input-group-text Apellido
                    input.form-control(type='text', v-model='usuario.apellido', placeholder='Apellido..')
                .alert.alert-warning.my-1(v-if='this.resultado.apellido', role='alert') {{ resultado.apellido }}
                .input-group.my-1
                    .input-group-prepend
                        span.input-group-text Rol
                    input.form-control(type='text', v-model='usuario.rol', placeholder='Rol...')
                .alert.alert-warning.my-1(v-if='this.resultado.rol', role='alert') {{ resultado.rol }}
                button.btn.btn-lg.btn-primary.btn-block.my-1(type='submit') Registrar
</template>

<script>
export default {
    data() {
        return {
            usuarioControl: null,
            usuario: {},
            resultado: {
                username: null,
                password: null,
                email: null,
                nombre: null,
                apellido: null,
                rol: null
            }
        }
    },
    created() {
        this.validarConexion();
    },
    methods: {
        validarConexion() {
            if(this.$session.exists()) this.$router.push({name: 'MostrarProducto'});
        },
        registrarUsuario() {
            this.resultado.username = null;
            this.resultado.passowrd = null;
            this.resultado.email = null;
            this.resultado.nombre = null;
            this.resultado.apellido = null;
            this.resultado.rol = null;
            if(!this.usuario.username) this.resultado.username = "Ingrese un username";
            this.axios.get('/usuarios/obtener/username/' + this.usuario.username)
                .then(res => {
                    if(this.usuario.username === res.data.username) this.resultado.username = "El username ya existe en la base de datos";
                });
            if(!this.usuario.password) this.resultado.password = "Ingrese un password";
            if(!this.usuario.email) this.resultado.email = "Ingrese un email";
            this.axios.get('/usuarios/obtener/email/' + this.usuario.email)
                .then(res => {
                    if(this.usuario.email === res.data.email) this.resultado.username = "El email ya existe en la base de datos";
                });
            if(!this.usuario.nombre) this.resultado.nombre = "Ingrese un nombre";
            if(!this.usuario.apellido) this.resultado.apellido = "Ingrese un apellido";
            if(!this.usuario.rol) this.resultado.rol = "Ingrese un rol";
            
            if(!this.resultado.username && !this.resultado.passowrd && !this.resultado.email && !this.resultado.nombre 
                && !this.resultado.nombre && !this.resultado.apellido && !this.resultado.rol) {
                this.axios.post('/usuarios/registrar', this.usuario)
                    .then(res => this.$router.push({name: 'ConectarUsuario'}))
                    .catch(err => console.log(err));
            }
        }
    }
}
</script> 
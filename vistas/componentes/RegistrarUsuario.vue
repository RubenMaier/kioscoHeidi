 <template lang="html">
    <div class="card">
        <div class="card-block">
            <h1 class="card-title">Registro de usuario</h1>
            <div class="card-body">
                <form v-on:submit.prevent="registrarUsuario" class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon">Username</span>
                        <input type="text" v-model="usuario.username" class="form-control" placeholder="Username...">
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon">Password</span>
                        <input type="password" v-model="usuario.password" class="form-control" placeholder="Password...">
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon">Email</span>
                        <input type="text" v-model="usuario.email" class="form-control" placeholder="Email...">
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon">Nombre</span>
                        <input type="text" v-model="usuario.nombre" class="form-control" placeholder="Nombre...">
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon">Apellido</span>
                        <input type="text" v-model="usuario.apellido" class="form-control" placeholder="Apellido..">
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon">Rol</span>
                        <input type="text" v-model="usuario.rol" class="form-control" placeholder="Rol...">
                    </div>
                    <button type="submit" class="btn btn-lg btn-primary btn-block">Registrar</button>
                </form>
                <div v-if="this.alerta" class="alert alert-warning" role="alert">{{ resultado }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            usuarioControl: null,
            usuario: {},
            resultado: null,
            alerta: false
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
            this.alerta = true;
            if(!this.usuario.username ) return this.resultado = "Ingrese un username";
            this.axios.get('/usuarios/obtener/username/' + this.usuario.username)
                .then(res => {
                    if(this.usuario.username === res.data.username) return this.resultado = "El username ya existe en la base de datos";
                });
            if(!this.usuario.password) return this.resultado = "Ingrese un password";
            if(!this.usuario.email) return this.resultado = "Ingrese un email";
            this.axios.get('/usuarios/obtener/email/' + this.usuario.email)
                .then(res => {
                    if(this.usuario.email === res.data.email) return this.resultado = "El email ya existe en la base de datos";
                });
            if(!this.usuario.nombre) return this.resultado = "Ingrese un nombre";
            if(!this.usuario.apellido) return this.resultado = "Ingrese un apellido";
            if(!this.usuario.rol) return this.resultado = "Ingrese un rol";
             this.axios.post('/usuarios/registrar', this.usuario)
                .then(res => {
                    this.$session.start();
                    this.$router.push({name: 'MostrarProducto'})
                })
                .catch(err => console.log(err));
        }
    }
}
</script> 
 <template lang="html">
    <div class="card">
        <h3 class="card-header">Registro de usuario</h3>
        <div class="card-body">
            <form v-on:submit.prevent="registrarUsuario" class="form-group">
                <div class="input-group">
                    <span class="input-group-text">Username</span>
                    <input type="text" v-model="usuario.username" class="form-control" placeholder="Username...">
                </div>
                <div v-if="this.resultado.username" class="alert alert-warning" role="alert">{{ resultado.username }}</div>
                <div class="input-group">
                    <span class="input-group-text">Password</span>
                    <input type="password" v-model="usuario.password" class="form-control" placeholder="Password...">
                </div>
                <div v-if="this.resultado.password" class="alert alert-warning" role="alert">{{ resultado.password }}</div>
                <div class="input-group">
                    <span class="input-group-text">Email</span>
                    <input type="text" v-model="usuario.email" class="form-control" placeholder="Email...">
                </div>
                <div v-if="this.resultado.email" class="alert alert-warning" role="alert">{{ resultado.email }}</div>
                <div class="input-group">
                    <span class="input-group-text">Nombre</span>
                    <input type="text" v-model="usuario.nombre" class="form-control" placeholder="Nombre...">
                </div>
                <div v-if="this.resultado.nombre" class="alert alert-warning" role="alert">{{ resultado.nombre }}</div>
                <div class="input-group">
                    <span class="input-group-text">Apellido</span>
                    <input type="text" v-model="usuario.apellido" class="form-control" placeholder="Apellido..">
                </div>
                <div v-if="this.resultado.apellido" class="alert alert-warning" role="alert">{{ resultado.apellido }}</div>
                <div class="input-group">
                    <span class="input-group-text">Rol</span>
                    <input type="text" v-model="usuario.rol" class="form-control" placeholder="Rol...">
                </div>
                <div v-if="this.resultado.rol" class="alert alert-warning" role="alert">{{ resultado.rol }}</div>
                <button type="submit" class="btn btn-lg btn-primary btn-block">Registrar</button>
            </form>
        </div>
    </div>
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
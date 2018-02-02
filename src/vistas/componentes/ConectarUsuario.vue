 <template lang="html">
    <div class="card">
        <h3 class="card-header">Inicio de Sesion</h3>
        <div class="card-body">
            <form v-on:submit.prevent="conectarUsuario" class="form-group">
                <div class="input-group">
                    <span class="input-group-text">Username</span>
                    <input type="text" v-model="usuario.username" class="form-control" placeholder="Username...">
                </div>
                <div v-if="this.resultado.username" class="alert alert-warning" role="alert"> {{ resultado.username }} </div>
                <div class="input-group">
                    <span class="input-group-text">Password</span>
                    <input type="password" v-model="usuario.password" class="form-control" placeholder="Password...">
                </div>
                <div v-if="this.resultado.password" class="alert alert-warning" role="alert"> {{ resultado.password }} </div>
                <button type="submit" class="btn btn-primary btn-lg btn-block">Conectar</button>
            </form>
            <div v-if="this.resultado.general" class="alert alert-warning" role="alert"> {{ resultado.general }} </div>
        </div>
    </div>
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
                        if(res.data.resultado == "201") return this.resultado.general = "La password o el username es incorrecto";
                        this.$session.start();
                        this.$session.set('id', res.data.resultado);
                        this.$router.push({name: 'MostrarProducto'});
                    })
                    .catch(err => console.log(err));
            }
        }
    }
}
</script> 
 <template lang="html">
    <div class="card">
        <h3 class="card-header">Inicio de Sesion</h3>
        <div class="card-body">
            <form v-on:submit.prevent="conectarUsuario" class="form-group">
                <div class="input-group">
                    <span class="input-group-text">Username</span>
                    <input type="text" v-model="usuario.username" class="form-control" placeholder="Username...">
                </div>
                <div class="input-group">
                    <span class="input-group-text">Password</span>
                    <input type="password" v-model="usuario.password" class="form-control" placeholder="Password...">
                </div>
                <button type="submit" class="btn btn-primary btn-lg btn-block">Conectar</button>
            </form>
            <div v-if="this.alerta" class="alert alert-warning" role="alert">
                {{ resultado }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
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
        conectarUsuario() {
            this.alerta = true;
            if(!this.usuario.username) return this.resultado = "Ingrese un username";
            if(!this.usuario.password) return this.resultado = "Ingrese un password";
            this.axios.post('/usuarios/conectar', this.usuario)
                .then(res => {
                    if(res.data.resultado == "401") return this.resultado = "La password o el username es incorrecto";
                    this.$session.start();
                    this.$router.push({name: 'MostrarProducto'});
                })
                .catch(err => console.log(err));
        }
    }
}
</script> 
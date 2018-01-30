 <template lang="html">
    <div>
        <div class=" card">
            <h1 class="card-title">Inicio de Sesion</h1>
            <div class="card-body">
                <div class="form-group">
                    <input type="text" v-model="usuario.username" class="form-control" placeholder="Username">
                    <input type="password" v-model="usuario.password" class="form-control" placeholder="Password">
                    <button @click="conectarUsuario" class="btn btn-lg btn-primary btn-block">Conectar</button>
                    <span class="clearfix"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            usuario: {}
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
            this.axios.post('/usuarios/conectar', this.usuario)
                .then(res => {
                    if(res.status != 200) return;
                    this.$session.start();
                    this.$router.push({name: 'MostrarProducto'})
                })
                .catch(err => console.log(err));
        }
    }
}
</script> 
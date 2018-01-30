 <template lang="html">
    <div>
        <div class="card">
            <h1 class="card-title">Registro de usuario</h1>
            <div class="card-body">
                <div class="form-group">
                    <input type="text" v-model="usuario.username" class="form-control" placeholder="Username">
                    <input type="password" v-model="usuario.password" class="form-control" placeholder="Password">
                    <input type="text" v-model="usuario.email" class="form-control" placeholder="Email">
                    <input type="text" v-model="usuario.nombre" class="form-control" placeholder="Nombre">
                    <input type="text" v-model="usuario.apellido" class="form-control" placeholder="Apellido">
                    <input type="text" v-model="usuario.rol" class="form-control" placeholder="Rol">
                    <button @click="registrarUsuario" class="btn btn-lg btn-primary btn-block">Registrar</button>
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
    methods: {
        registrarUsuario() {
             this.axios.post('/usuarios/registrar', this.usuario)
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
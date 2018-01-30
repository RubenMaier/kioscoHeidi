 <template lang="html">
    <div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    created() {
        this.desconectarUsuario();
    },
    methods: {
        desconectarUsuario() {
            this.axios.get('/usuarios/desconectar')
                .then(res => {
                    this.$session.destroy();
                    this.$router.push({name: 'ConectarUsuario'});
                })
                .catch(err => console.log(err));
        }
    }
}
</script> 
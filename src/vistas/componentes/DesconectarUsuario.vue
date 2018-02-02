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
            this.$session.destroy();
            this.axios.get('/usuarios/desconectar')
                .then(res => {
                    console.log(res);
                    this.$session.destroy();
                    this.$router.push({name: 'ConectarUsuario'});
                })
                .catch(err => console.log(err));
        }
    }
}
</script> 
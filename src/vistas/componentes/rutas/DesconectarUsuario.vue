<template lang="pug">
  
</template>


<script>
export default {
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
                    this.$bus.$emit('actualizarSesion', false);
                    this.$router.push({name: 'ConectarUsuario'});
                })
                .catch(err => console.log(err));
        }
    }
}
</script> 
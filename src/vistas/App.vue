<template lang="pug">
    div
        navegador
        main.container
            router-view
</template>

<script>
import Navegador from './componentes/tema/Navegador.vue'

export default {
    components: {
        Navegador
    }
}
</script> 
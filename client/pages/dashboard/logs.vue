<template>
    <div class="bg-light pt-2 pt-3">
        <keep-alive>
            <dashDefault/>
        </keep-alive>

        <section class="documentBody bg-white">

        </section>
    </div>
</template>

<script>

import dashDefault from '../../components/dashboard/'

export default {
    async asyncData({store}){
        store.commit('SET_ACTIVEMODULE', 'logs')
    },
    components:{
        dashDefault
    }
}
</script>

<style scoped>

</style>
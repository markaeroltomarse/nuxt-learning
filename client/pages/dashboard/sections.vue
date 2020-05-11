<template>
    <div class="bg-light  pt-2">
        <keep-alive>
            <dashDefault/>
        </keep-alive>
        

        <div class="documentBody bg-white" data-aos="fade-up">
            <h4><strong>Posted quiz</strong></h4>

            <!-- <p>{{$store.state.dashboard.data}}</p> -->
            
        </div>
    </div>
</template>

<script>
import dashDefault from '../../components/dashboard/'

export default {
    middleware:['authen'],
    components:{
        dashDefault
    },

    async asyncData({$axios, store}){
        store.commit('SET_ACTIVEMODULE', 'sections')
        store.dispatch('SET_USER')
        store.commit('SET_DASHDATA', 'LOREM SECTION DATA')
    }

    
}
</script>

<style scoped>
    
</style>
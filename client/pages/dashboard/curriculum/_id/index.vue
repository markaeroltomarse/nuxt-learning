<template>
    <div class="bg-light pt-3">
        <dashDefault/>

        <section class="documentBody  bg-white text-dark px-0" data-aos="fade-up">
            <h4 class="px-3 py-1 bg-info text-white"><strong>BSIT</strong> - <span class="text-light">COURSE</span></h4>
            
            <div class="py-1 px-3">
                <strong class="badge badge-info">First semester:</strong>
                
                <n-link :to="`/dashboard/curriculum/${subID}/newsubject?semester=first`"><strong class="badge badge-info float-right">Add subject +</strong></n-link>
            </div>
            <semeterSubjects/>
        </section>
    </div>
</template>

<script>

import dashDefault from '../../../../components/dashboard'
import semeterSubjects from '../../../../components/dashboard/curriculum/semestersubjects'


export default {
    
    middleware:['master'],
    data(){
        return {
            subID:this.$route.params.id
        }
    },
    async asyncData({store}){
        store.dispatch('SET_USER')
    },
    components:{
        dashDefault,
        semeterSubjects
    },

    methods:{
        
    }
}
</script>

<style scoped>

</style>

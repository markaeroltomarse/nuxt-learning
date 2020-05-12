<template>
    <div class="bg-light pt-3">
        <dashDefault/>

        <section class="documentBody  bg-white text-dark px-0" data-aos="fade-up">
            <h4 class="px-3 py-1 bg-info text-white"><strong></strong> - <span class="text-light">COURSE</span></h4>
            
            <div class="py-1 px-3">
                <strong class="badge badge-info">First semester:</strong>
                
                <n-link :to="`/dashboard/curriculum/${courseID}/newsubject?semester=first`"><strong class="badge badge-info float-right">Add subject +</strong></n-link>
            </div>
            <semeterSubjects :subjects="course.first"/>

            <div class="py-1 px-3">
                <strong class="badge badge-info">Second semester:</strong>
                
                <n-link :to="`/dashboard/curriculum/${courseID}/newsubject?semester=second`"><strong class="badge badge-info float-right">Add subject +</strong></n-link>
            </div>
            <semeterSubjects :subjects="course.second"/>

            <div class="py-1 px-3">
                <strong class="badge badge-info">Third semester:</strong>
                
                <n-link :to="`/dashboard/curriculum/${courseID}/newsubject?semester=third`"><strong class="badge badge-info float-right">Add subject +</strong></n-link>
            </div>
            <semeterSubjects :subjects="course.third" />

            <div class="py-1 px-3">
                <strong class="badge badge-info">Fourth semester:</strong>
                
                <n-link :to="`/dashboard/curriculum/${courseID}/newsubject?semester=fourth`"><strong class="badge badge-info float-right">Add subject +</strong></n-link>
            </div>
            <semeterSubjects :subjects="course.fourth"/>
            
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
            courseID:this.$route.params.id
        }
    },
    async asyncData({$axios, params, store}){
        store.dispatch('SET_USER')
        try{
            let course = await $axios.post('/api/teacher/master/course/', {courseID:params.id})
            console.log(course)
            if(course.data.error) return alert(course.data.error)

            course = course.data.data
            console.log(course)
            // let first = []
            // let second = []
            // let third = []
            // let fourth = []
            // course.subjects.forEach(sub => {
               
            //    if(sub.sem == 'first') return first.push(sub) 
            //    if(sub.sem == 'second') return second.push(sub) 
            //    if(sub.sem == 'third') return third.push(sub) 
            //    if(sub.sem == 'fourth') return fourth.push(sub) 
            // })
            
            // console.log(first)
            // console.log(second)
            // console.log(third)
            // console.log(fourth)

            return {
                course,
                // first,
                // second,
                // third,
                // fourth,
            }
        }catch(err){
            alert(err)
        }
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

<template>
    <div class="bg-light pt-3">
        <dashDefault/>

        <section class="documentBody  bg-white text-dark px-0" data-aos="fade-up">
            <h4 class="px-3 py-1 bg-info text-white"><strong>{{course.name}}</strong> - <span class="text-light">COURSE Department</span></h4>
            
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
            

            <div class="my-2 " data-aos="fade-up">
                <div class="p-3">
                    <strong>Teacher's of the {{course.name}} Department</strong>
                </div>
                <div>
                    <v-list-item-group>
                        <v-list-item
                         v-for="teacher in getTeacherInDept" :key="teacher._id"
                         
                         v-ripple='{class:`text-info`}' class="border-bottom">
                            <v-list-item-avatar>
                                <v-img :src="require('../../../../assets/undraw/avatarmale.png')"></v-img>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title>
                                    {{teacher.fname}} {{teacher.lname}}
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    {{teacher.teacherInfo.major}}
                                </v-list-item-subtitle>
                            </v-list-item-content>
                            
                        </v-list-item>
                    </v-list-item-group>
                    

                    
                </div>

                <div class="text-right p-3">
                    <n-link :to="`/dashboard/curriculum/${courseID}/addteacher?dept=${course.name}`"><v-btn text small color='teal'>Add teacher</v-btn></n-link>
                </div>
            </div>
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

            let getTeacherInDept = await $axios.post('/api/teacher/master/course/deptteacher', {courseID:params.id})
            getTeacherInDept = getTeacherInDept.data.data
            course = course.data.data
            console.log(getTeacherInDept)
            

            return {course,getTeacherInDept}
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

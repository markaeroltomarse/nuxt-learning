<template>
    <div class="bg-light pt-3">
        <dashDefault/>

        <section class="documentBody  bg-white text-dark px-0" data-aos="fade-up">
            <h4 class="px-3 py-1 bg-info text-white"><strong>{{course.name}}</strong> - <span class="text-light">COURSE Department</span></h4>
            <div class="d-flex justify-content-between py-2 mx-2 text-light">
                <div>
                    <v-chip
                        class="ma-2"
                        
                        color="#f2f2f2"
                        text-color="dark"
                        
                    >
                        <v-avatar
                            left 
                            class="teal darken-2 text-white"
                            text-color="white"
                        >
                            {{course.first.length + course.second.length + course.third.length + course.fourth.length}}
                        </v-avatar>
                        Total
                    </v-chip>

                    <v-chip
                        class="ma-2"
                        
                        color="#f2f2f2"
                        text-color="dark"
                        
                    >
                        <v-avatar
                            left 
                            class="teal darken-2 text-white"
                            text-color="white"
                        >
                            {{course.first.length + course.second.length + course.third.length + course.fourth.length}}
                        </v-avatar>
                        Total
                    </v-chip>
                </div>

                <div>
                    <v-btn-toggle
                        v-model="courseyear"
                        tile
                        color="teal"
                        group
                    >
                        <v-btn value="1" class="mx-2" fab  small >
                            1
                        </v-btn>

                        <v-btn value="2" class="mx-2" fab  small >
                            2
                        </v-btn>
    
                        <v-btn value="3" class="mx-2" fab  small >
                            3
                        </v-btn>

                        <v-btn value="4" class="mx-2" fab  small >
                            4
                        </v-btn>
                    </v-btn-toggle>
                </div>
            </div>
            <div class="text-center" style="padding:1em 27%;" v-if="subjectsSpinner" data-aos="zoom-in">
                Getting your subjects <br/>
                <v-progress-linear
                    color="teal"
                    indeterminate
                    rounded
                    height="6"
                ></v-progress-linear>
            </div>
            <div v-else  >
                <div class="py-1 px-3">
                    <strong class="badge badge-info">First semester: {{course.first.length}}</strong>
                    
                    <n-link :to="`/dashboard/curriculum/${courseID}/newsubject?semester=first&y=${courseyear}`"><strong class="badge badge-info float-right">Add subject +</strong></n-link>
                </div>
                <semeterSubjects  :subjects="course.first"/>

                <div class="py-1 px-3">
                    <strong class="badge badge-info">Second semester: {{course.second.length}}</strong>
                    
                    <n-link :to="`/dashboard/curriculum/${courseID}/newsubject?semester=second&y=${courseyear}`"><strong class="badge badge-info float-right">Add subject +</strong></n-link>
                </div>
                <semeterSubjects :subjects="course.second"/>

                <div class="py-1 px-3">
                    <strong class="badge badge-info">Third semester: {{course.third.length}}</strong>
                    
                    <n-link :to="`/dashboard/curriculum/${courseID}/newsubject?semester=third&y=${courseyear}`"><strong class="badge badge-info float-right">Add subject +</strong></n-link>
                </div>
                <semeterSubjects :subjects="course.third" />

                <div class="py-1 px-3">
                    <strong class="badge badge-info">Fourth semester: {{course.fourth.length}}</strong>
                    
                    <n-link :to="`/dashboard/curriculum/${courseID}/newsubject?semester=fourth&y=${courseyear}`"><strong class="badge badge-info float-right">Add subject +</strong></n-link>
                </div>
                <semeterSubjects :subjects="course.fourth"/>
            </div>

            
            

            <div class="my-2 " data-aos="fade-up">
                <div class="p-3">
                    <strong>Teacher's of the {{course.name}} Department</strong>
                </div>
                <div>
                    <dept-teacher
                        :deptTeachers="getTeacherInDept"
                        :deleteact="true"
                        :moreact="true"
                    />    
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
import depteacher from '../../../../components/dashboard/curriculum/deptteachers'

export default {
    
    middleware:['master'],
    data(){
        return {
            courseID:this.$route.params.id,

            //CPMPONENTS
            courseyear:'1',
            subjectsSpinner:false,

            //DYNAMIC DATA
            course:null,
            getTeacherInDept:null,
        }
    },
    async asyncData({$axios, params, store}){
        store.dispatch('SET_USER')
        try{
            
            let course = await $axios.post('/api/teacher/master/courses/course/', {courseID:params.id, studentyear:1})
            console.log(course)
            if(course.data.error) return alert(course.data.error)

            let getTeacherInDept = course.data.teachers
            course = course.data.data
            console.log(getTeacherInDept)
            
            
            return {course,getTeacherInDept}
        }catch(err){
            alert(err)
        }
    },
    components:{
        dashDefault,
        semeterSubjects,
        'dept-teacher':depteacher
    },

    methods:{
        async loadSubjects(){
            try{
                this.subjectsSpinner = true
                let course = await this.$axios.post('/api/teacher/master/courses/course', {courseID:this.$route.params.id, studentyear:this.courseyear})
                console.log(course)
                if(course.data.error) return alert(course.data.error)

                this.getTeacherInDept = course.data.teachers
                course = course.data.data
                console.log(this.getTeacherInDept)
                
                this.course = course
                this.subjectsSpinner = false
            }catch(err){
                console.log(err)
            }
        }
    },
    watch:{
        courseyear(newVal){
            this.loadSubjects()
        }
    }
}
</script>

<style scoped>

</style>

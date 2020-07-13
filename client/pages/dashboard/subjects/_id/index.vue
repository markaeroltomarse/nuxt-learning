<template>
  <div class="bg-light ">
      <dashDefault/>
      
      <section class="subjectsPanel text-secondary py-3 " >
          <h2><strong>Subject information</strong></h2>

          <div class="details " >
              <div class=" " data-aos="fade-up">
                  <div class="details-div shadow-sm text-scondary" >
                    <h4>{{subject.name}}</h4>
                    
                    <div class="row px-3">
                        <div class="col ">
                            <small>Year:</small>
                            <p class="border-bottom"><strong class="text-info">{{subject.year}}</strong></p>

                            <small>Semester:</small>
                            <p class="border-bottom"><strong class="text-info">{{subject.sem}}</strong></p>

                            <small>Units:</small>
                            <p class="border-bottom"><strong class="text-info">{{subject.units}}</strong></p>

                            <div class="rounded text-info p-3 bg-light text-center">
                                <p style="font-size:50px;">
                                    <strong>{{subject.assignTeachers.length}}</strong>
                                </p>
                                <small>Teacher's</small>
                            </div>
                        </div>

                        <div class="col-6  bg-light text-info rounded p-2">
                            <p><strong>Description</strong></p>
                            <p class="text-justify text-italic"><small>{{subject.desc}}</small></p>
                        </div>
                    </div>
                  </div>
              </div>
              <div class="">
                  <div class=" p-2 bg-white details-img shadow-sm " data-aos="fade-up">
                      <h2>#<strong>{{subject.code}}</strong></h2>
                      <div :style="`padding:31% 0px; background-size:100%; background-position:center; background-repeat:no-repeat; background-image:url('${require(`../../../../assets/uploads/subjectimg/${subject.subimg}`)}');`">

                      </div>
                  </div>
                  
                  <div class="details-div mt-3 w-100 text-center py-4 shadow-sm" data-aos="fade-up">
                       <h2><span class="badge badge-light text-info py-5 text-center">50</span> ENROLLED</h2>

                       <p class="text-right py-1">
                           <v-btn class="text-light" color="teal" block>See list</v-btn>
                       </p>
                  </div>
              </div>
          </div>


          <div class="teachers-div shadow-sm" data-aos="fade-up">
              <carousel 
                :speed="300" 
                :per-page="4" 
                class="px-3 w-100 bg-light" 
                paginationColor="turquoise" 
                paginationActiveColor="teal"
              >
                <slide
                    
                    data-aos="flip-up"
                    
                    class="hoverSub my-3 mr-1"
                    
                    :data-index="0"
                    data-name="MySlideName"
                    
                    :mouse-drag="true"

                    v-for="teacher in teachers" :key="teacher._id"
                >
                    <teacherDiv
                        :teacher="teacher"
                    />
                </slide>
              </carousel>
              
              
          </div>


          <div class="teachers-div shadow-sm">
              <h4 class="text-center text-info" >Posted quiz</h4>
              
              <sortedQuizes
                v-on:refresQuizes="loadQuizes"
                :quizSpinner="quizSpinner"
                :sortedquizes="allquizes"
              />
          </div>
      </section>
  </div>
</template>

<script>
import dashDefault from '../../../../components/dashboard'
import teacherDiv from '../../../../components/dashboard/subjects/subject/teacherdiv'
import sortedQuizes from '../../../../components/dashboard/curriculum/subject/component/sortedquizes'

import moment from 'moment'
import uuid from 'uuid'


export default {
    middleware:['authen'],
    data(){
        return {

            //ASSETS 
            quizSpinner:false,
            
            subject:'',
            allquizes:'',
            teachers:'',
        }
    },
    async asyncData({$axios, store, params, query}){
        try{
            store.dispatch('SET_USER')
            store.commit('SET_ACTIVEMODULE', 'subjects')
            
            const subjectinfo = await $axios.post('/api/teacher/master/course/subject', {subID:params.id})
            
            console.log(subjectinfo.data)
            return {
                subject:subjectinfo.data.subject,
                allquizes:subjectinfo.data.quizes,
                teachers:subjectinfo.data.teachers
            }
        }catch(err){
            console.log(err)
        }
    },
    components:{
        dashDefault, teacherDiv,
        sortedQuizes
    },
    methods:{
        styleIt(elem){
            this.$refs[elem].style.border = '5px solid turquoise'
        },

        normalStyle(elem){
            this.$refs[elem].style.border = '5px solid teal'
        },

        async loadQuizes(){
            
            try{
                this.$store.dispatch('SET_USER')
                this.$store.commit('SET_ACTIVEMODULE', 'subjects')
                
                this.quizSpinner = true
                const subjectinfo = await this.$axios.post('/api/teacher/master/course/subject', {subID:this.$route.params.id})
                
                this.allquizes = subjectinfo.data.quizes
                this.quizSpinner = false
            }catch(err){
                
                console.log(err)
            }
        }

    },



    created(){
        // console.log("June 1st 2020, 6:45:37 pm".split(","))

        // console.log(this.today == "June 1st 2020, 6:45:37 pm".split(",")[0])
    }

}
</script>

<style scoped>
.subjectsPanel{
    margin-top:1%;
    min-height:100vh;
    margin:0px 20%;
    
}

.details{
    display:grid;
    grid-template-columns:1.5fr 1fr;
}

.details-div{
    margin-right: 5%;
    background-color:white;
    padding:1em;
    border-top:5px solid turquoise;
    
    
}

.details-img{
    border-bottom:5px solid turquoise;
    max-height: 45vh;
}


.teachers-div{
    border-top:5px solid turquoise;
    border-bottom:5px solid turquoise;
    padding:1em;
    
    margin:5% 0px;
    
    background-color:white;

}


.postedfiles{
    background-color:rgba(0,0,0,0.01);
    
}
.postedfiles:hover{
    transition:0.2s;
    background-color:turquoise;
    color:white;
}






</style>
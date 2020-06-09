<template>
  <div class="bg-light ">
      <dashDefault/>
      <quizInfo 
        
      />
      <section class="subjectsPanel text-secondary py-3 " data-aos="fade-up">
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
                      <img :src="require(`../../../../assets/uploads/subjectimg/${subject.subimg}`)" alt="" width="100%">
                  </div>
                  
                  <div class="details-div mt-3 w-100 text-center py-4 shadow-sm" data-aos="fade-up">
                       <h2><span class="badge badge-light text-info ">50</span> ENROLLED</h2>

                       <p class="text-right py-1">
                           <button class="btn btn-info btn-sm btn-block">See list</button>
                       </p>
                  </div>
              </div>
          </div>


          <div class="teachers-div shadow-sm" data-aos="fade-up">
              <carousel 
            speed="300" 
            :per-page="4" 
            class="px-3 w-100 bg-light" 
            paginationColor="turquoise" 
            paginationActiveColor="teal">
            <slide
                
                data-aos="flip-up"
                
                class="hoverSub my-3 mr-1"
                
                data-index="0"
                data-name="MySlideName"
                
                :mouse-drag="true"
            >
                <div class="teacher-caru">
                    <div class="coverteacher p-5">
                        <!-- <img src="../../../../assets/uploads/subjectimg/4a7b1a8a-a971-454d-8ddf-8f2d2f18fd89.png" alt=""> -->
                    </div>

                    <div>
                        <strong>Mark Aerol tomarse</strong>
                        <small>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro, nostrum quos neque iusto aperiam cum laborum nisi distinctio, totam maiores numquam mollitia optio quisquam perspiciatis similique non reprehenderit doloribus voluptates!</small>
                    
                       

                        <v-btn class="mb-1" color="primary" block small>
                            Message
                        </v-btn>
                        <v-btn color="primary" block small>
                            Visit
                        </v-btn>
                    </div>
                </div>
            </slide>
              </carousel>
              
              
          </div>


          <div class="teachers-div shadow-sm" data-aos="fade-up">
              <h4 class="text-center text-info" >Posted quiz</h4>
              <v-list :avatar="true">
                  <v-list-item-group>
                      <v-subheader color="teal">Earlier</v-subheader>
                      <div v-for="quiz in quizes" :key="quiz._id">
                          <Quiz
                            
                            v-if="today == quiz.created.split(',')[0]"
                            :quiz="quiz"
                            />
                      </div>
                      
                      <v-subheader color="teal">Yesterday</v-subheader>
                      
                      <div v-for="quiz in quizes" :key="quiz._id">
                          <Quiz
                            
                            v-if="yesterday == quiz.created.split(',')[0]"
                            :quiz="quiz"
                            />
                      </div>

                      <v-subheader color="teal">Others</v-subheader>
                      <div v-for="quiz in quizes" :key="quiz._id">
                          <Quiz
                            
                            v-if="yesterday != quiz.created.split(',')[0] & today != quiz.created.split(',')[0]"
                            :quiz="quiz"
                            />
                      </div>
                  </v-list-item-group>
              </v-list>
          </div>
      </section>
  </div>
</template>

<script>
import dashDefault from '../../../../components/dashboard'
import Quiz from '../../../../components/dashboard/subjects/subject/quiz'
import quizInfo from '../../../../components/dashboard/subjects/subject/expandsubject'

import moment from 'moment'
export default {
    middleware:['authen'],
    data(){
        return {
            yesterday:this.moment().subtract(1, "days").format('MMMM Do YYYY'),
            today:this.moment().format('MMMM Do YYYY')
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
                quizes:subjectinfo.data.quizes
            }
        }catch(err){
            console.log(err)
        }
    },
    components:{
        dashDefault, Quiz, quizInfo
    },
    methods:{
        styleIt(elem){
            this.$refs[elem].style.border = '5px solid turquoise'
        },

        normalStyle(elem){
            this.$refs[elem].style.border = '5px solid teal'
        },
        moment(){
            return moment()
        }
    },

    created(){
        console.log("June 1st 2020, 6:45:37 pm".split(","))

        console.log(this.today == "June 1st 2020, 6:45:37 pm".split(",")[0])
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

.teacher-caru{
    background-color:white;
    border-bottom:5px solid white;
    box-shadow:0px 5px 10px 0px rgba(0,0,0,0.1);
}

.teacher-caru:hover{
    border-bottom:5px solid turquoise;
}



.teacher-caru > div{
    padding:1em;
    text-align:center;
    
}

.coverteacher{
    background-color:#f2f2f2;
    background-size:100%;
    background-position:center;
    background-repeat: no-repeat;
    background-image:url('../../../../assets/uploads/subjectimg/4a7b1a8a-a971-454d-8ddf-8f2d2f18fd89.png');
    
}





</style>
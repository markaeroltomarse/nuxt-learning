<template>
  <div class="bg-light ">
      <dashDefault/>
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
              <h4 class="text-center text-info">Teacher's</h4>
              <div class="teachers-card ">

                  <div class=" rounded teacher-card" @mouseover="styleIt(subject._id)" @mouseout="normalStyle(subject._id)">
                      <div class="p-2 ">
                          <div  :ref="subject._id" class="teacherimg" :style="{backgroundImage:`url('${require(`../../../../assets/uploads/subjectimg/${subject.subimg}`)}')`}">

                          </div>
                      </div>
                      <div class="p-2 text-center border-top">
                          <strong >Mark Aerol Tomarse</strong>
                      </div>
                  </div>

              </div>
              
          </div>


          <div class="teachers-div shadow-sm" data-aos="fade-up">
              <h4 class="text-center text-info" >Posted quiz</h4>
              <v-list :avatar="true">
                  <v-list-item-group>
                      <v-subheader color="teal">Earlier</v-subheader>
                      <v-list-item class="postedfiles border-bottom">
                          <v-list-item-action>
                              <span class="badge badge-info">
                                  Exam
                              </span>
                          </v-list-item-action>
                          <v-list-item-content>
                              <v-list-item-title>
                                  Quiz 1 
                              </v-list-item-title>
                              <v-list-item-subtitle>
                                  January 02, 2020
                              </v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-action>
                             
                          </v-list-item-action>
                          
                      </v-list-item>

                      <v-subheader color="teal">Yesterday</v-subheader>
                      <v-list-item class="postedfiles border-bottom">
                          <v-list-item-action>
                              <span class="badge badge-info">
                                  Exam
                              </span>
                          </v-list-item-action>
                          <v-list-item-content>
                              <v-list-item-title>
                                  Quiz 1 
                              </v-list-item-title>
                              <v-list-item-subtitle>
                                  January 02, 2020
                              </v-list-item-subtitle>
                          </v-list-item-content>
                      </v-list-item>


                      <v-subheader color="teal">Others</v-subheader>
                      <v-list-item class="postedfiles border-bottom">
                          <v-list-item-action>
                              <span class="badge badge-info">
                                  Exam
                              </span>
                          </v-list-item-action>
                          <v-list-item-content>
                              <v-list-item-title>
                                  Quiz 1 
                              </v-list-item-title>
                              <v-list-item-subtitle>
                                  January 02, 2020
                              </v-list-item-subtitle>
                          </v-list-item-content>
                      </v-list-item>
                  </v-list-item-group>
              </v-list>
          </div>

          
        
      </section>
  </div>
</template>

<script>
import dashDefault from '../../../../components/dashboard'

export default {
    middleware:['authen'],
    async asyncData({$axios, store, params, query}){
        try{
            store.dispatch('SET_USER')
            store.commit('SET_ACTIVEMODULE', 'subjects')
            
            const subjectinfo = await $axios.post('/api/teacher/master/course/subject', {subID:params.id})
            console.log(subjectinfo.data)

            return {
                subject:subjectinfo.data.subject
            }
        }catch(err){
            console.log(err)
        }
    },
    components:{
        dashDefault
    },
    methods:{
        styleIt(elem){
            this.$refs[elem].style.border = '5px solid turquoise'
        },

        normalStyle(elem){
            this.$refs[elem].style.border = '5px solid teal'
        }
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

.teachers-card{
    
    display:grid;
    grid-template-columns:1fr 1fr 1fr 1fr;
    grid-gap:10px;
}

.teacher-card{
    transition:0.2s;
    cursor:pointer;
    box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.1);
    color:teal;
}

.teacher-card:hover{
    box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.5);
    transition:0.2s;
    background-color:teal;
    color:white;
}

.teacherimg {
    background-size:100% 100%; background-position:center; background-repeat:no-repeat;
    padding:27%;
    border-radius:50%;
    margin:2% 15%;
    border:5px solid  teal;
}
.teacher-card:hover{
    transition:0.2s;
    box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.1);
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
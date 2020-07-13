<template>
  <div class="bg-light pt-3">
      <dashDefault/>

      <section class="subjectsPanel  py-2 " data-aos="fade-up" style="padding-bottom:20vh;">
          <h2><strong>Curriculum</strong></h2>
          <v-alert
          
      color="#C51162"
      dark
      icon="mdi-material-design"
      border="right"
    >
      Phasellus blandit leo ut odio. Morbi mattis ullamcorper velit. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla. In ut quam vitae odio lacinia tincidunt.
    </v-alert>
        <v-banner single-line class="mb-2">
            <v-icon
            slot="icon"
            color="warning"
            size="36"
            
            >
            mdi-wifi-strength-alert-outline
            </v-icon>
            Make sure your connection is table

            
        </v-banner>
          <div v-ripple="{ class: `text-info` }" v-for="c in courses" :key="c.course._id" class="course-panel bg-white shadow-sm mb-2">
              <div>
                <h4>
                    <n-link :to="`/dashboard/curriculum/${c.course._id}`"><strong class="text-dark font-weight-black">{{c.course.name}}</strong> - <span class="text-secondaty">{{c.course.code}}</span></n-link>
                </h4>
                
                <div class="course-info">
                    <div class="bg-info rounded text-center p-2 text-light">
                        <h2>{{c.totalsub}}</h2>
                        <small class="font-weight-thin">SUBJECTS</small>
                    </div>


                    <div class="bg-info rounded text-center p-2 text-light">
                        <h2>{{c.totalenrolled}}</h2>
                        <small>STUDENTS</small>
                    </div>

                   

                    <div class="bg-info rounded text-center p-2 text-light">
                        <h2>{{c.totalteacher}}</h2>
                        <small>TEACHER</small>
                    </div>

                    <div class="bg-warning rounded text-center p-2 text-light">
                        <h2>{{c.totalquiz}}</h2>
                        <small>QUIZ</small>
                    </div>
                </div>
              </div>
              <div>
                  <img class=" " :src="require(`../../../assets/uploads/courseimg/${c.course.courseimg}`)" width="100%" alt="">
              </div>
          </div>

     

          <b-link to="/dashboard/curriculum/newcourse">
              <div class="add-course text-center">
                <h4 class="text-light">CREATE NEW COURSE!</h4>
                <p style="margin:0px 25%;"><small>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab ipsum tempora magni pariatur sint deleniti corporis repellat tenetur sapiente provident.</small></p>
            </div>
          </b-link>
      </section>
  </div>
</template>

<script>
import dashDefault from '../../../components/dashboard'



export default {
    
    head(){
        return {
            title:'Curriculumn'
        }
    },
    middleware:['master'],
    async asyncData({$axios, store}){

        try{
            let courses = await $axios.get('/api/teacher/master/courses')
            store.dispatch('SET_USER')
            store.commit('SET_ACTIVEMODULE', 'curriculum')
            console.log(courses.data)
            return {
                courses:courses.data
            }
        }catch(err){
            alert(err)
        }
    },
    components:{
        dashDefault,
    },

    methods:{
        handleSlideClick(){
            alert('fuck')
        },
        

    }
}
</script>

<style scoped>
.subjectsPanel{
    margin-top:1%;
    min-height:100vh;
    margin:0px 20%;
}


.course-panel{
    border-top:5px solid turquoise;
    display:grid;
    grid-template-columns:1.7fr 1fr;
}

.course-panel > div{
    padding:1em;
}

.course-info{
    display: grid;
    grid-template-columns:1fr 1fr 1fr;
    grid-gap:1em;

}

.add-course{
    background-color:turquoise;
    color:white;
    border-radius:3px;
    box-shadow:0px 5px 10px 0px rgba(0,0,0,0.1);
    transition:0.2s;
    padding:1em;
    cursor: pointer;
}

.add-course:hover{
    box-shadow:0px 0px 5px 0px rgba(0,0,0,0.2);
    transition:0.2s;
    background-color:teal;
}



</style>
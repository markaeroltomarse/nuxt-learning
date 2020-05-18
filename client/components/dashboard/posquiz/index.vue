<template>
  <section class="postquiz" v-click-outside="closeQuizPost">

      <overview/>

      <div class="bg-white border rounded shadow text-secondary" data-aos="zoom-in">
          <div class="p-3 border-bottom bg-light rounded-top">
              {{subject.name}}: <strong>{{subject.code}}</strong>
          </div>
          <div class="p-3" style="height:65vh; overflow-y:scroll;">

              <div v-if="questionsPanel" >
                  <div class="text-center spinner" v-if="spinner" data-aos="fade-down">
                    <div class="spinner-border text-info mx-auto" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                <div v-else class="my-2"  v-for="questpanel in numberOfQuestions" :key="questpanel">

                    <multiple v-if="questpanel.type === 'multi'"  v-bind:question="questpanel" />
                    <enumeration v-if="questpanel.type === 'enum'" v-bind:question="questpanel"/>
                    <essay v-if="questpanel.type === 'essay'" v-bind:question="questpanel"/>
                </div>
              </div>
              



              <div class="px-5"  data-aos="fade-up" v-else>
                <h4 class="text-center">Enter number of questions.</h4>
                <div class=" p-2" style="margin:0px 20%;">
                    <v-text-field
                        dense
                        
                        v-model.lazy="numberQeustTxt"
                        outlined="true"
                        type="number"
                        class="text-center"
                    >
                        
                    </v-text-field>

                  
                </div>
                <h4 class="text-center mt-3">Enter Quiz infomation</h4>
                <div class=" p-2" style="margin:0px 20%;">
                    <v-text-field
                        dense
                        
                        v-model="title"
                        outlined="true"
                        label="Quiz title"
                        class="text-center"
                    >
                        
                    </v-text-field>
                    
                    <v-textarea
                        dense
                        
                        v-model="description"
                        outlined="true"
                        label="Short Descripton"
                        class="text-center"
                    >
                        
                    </v-textarea>
                    <h4 class="text-center mt-3"><i class="fas fa-clock"></i></h4>
                    <select v-model="timelimit" class="form-control text-center bg-white text-dark my-1">
                        <option selected :value="{val:0}">Select time limit</option>
                        <option :value="{val:300000}">5:00 Mins</option>
                        <option :value="{val:480000}">8:00 Mins</option>
                        <option :value="{val:600000}">10:00 Mins</option>
                        <option :value="{val:720000}">12:00 Mins</option>
                        <option :value="{val:900000}">15:00 Mins</option>
                        <option :value="{val:480000}">20:00 Mins</option>
                        <option :value="{val:1500000 }">25:00 Mins</option>
                        <option :value="{val:1800000}">30:00 Mins</option>
                        <option :value="{val:2100000 }">35:00 Mins</option>
                        <option :value="{val:2400000 }">40:00 Mins</option>
                        <option :value="{val:2700000 }">45:00 Mins</option>
                        <option :value="{val:3000000 }">50:00 Mins</option>
                        <option :value="{val:3300000 }">55:00 Mins</option>
                        <option :value="{val:3600000}">1 Hour</option>
                    </select>

                    
                    <v-subheader>Duedate</v-subheader>
                    <div class=" ">
                        <v-date-picker 
                        color="teal"
                        
                        reactive="true"
                        full-width
                        :landscape="$vuetify.breakpoint.smAndUp"
                        v-model="duedate">
                        </v-date-picker><br>
                       
                        
                    </div>
                    <v-text-field
                        dense
                        label="Attemp"
                        v-model="attemp"
                        outlined="true"
                        type="number"
                    >
                        
                    </v-text-field>

                    <button @click="generateQuestions" class="btn btn-info btn-block">OK</button>
                </div>

                <keep-alive>
                    <div class="my-3" v-if="settingType">
                        <h4 class="text-center mt-3">Setup each questions type.</h4>
                        <div class="row my-1" v-for="question in numberOfQuestions" :key="question">
                            <div class="col-3 ">
                                Question {{question.number}}
                            </div>

                            <div class="col btn-group pr-5" role="group" aria-label="Basic example">
                                <button @click="question.type = 'multi'" type="button" :class="`btn btn-outline-primary btn-sm  ${ifActive(question.type, 'multi')}`">Multiple choice</button>
                                <button @click="question.type = 'enum'" type="button" :class="`btn btn-outline-primary btn-sm ${ifActive(question.type, 'enum')}`">Enumaration</button>
                                <button @click="question.type = 'essay'" type="button" :class="`btn btn-outline-primary btn-sm ${ifActive(question.type, 'essay')}`">Essay</button>
                            </div>
                        </div>
                    </div>
                </keep-alive>

                <div class="text-right" v-if="settingType">
                    <button @click="showQuestionsElement" class="btn btn-primary btn-sm mr-5">Create</button>
                </div>
              </div>


          </div>
          <div class="p-3 text-right border-top">
              <button @click="closeQuizPost" class="btn btn-secondary mr-1">Close</button>
              <button @click="pastQuizSubmit" v-if="questionsPanel" class="btn btn-primary ">Posts</button>
          </div>
      </div>
  </section>
</template>

<script>

import vClickOutside from 'v-click-outside'


import multiple from './multiple'
import enumeration from './enumeration'
import essay from './essay'
import overview from './overviewnumbers'

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default {
    
    directives: {
        clickOutside: vClickOutside.directive
    },
    name:'postQuiz',
    data(){
        return {
            numberQeustTxt:0,
            numberOfQuestions:[],
            title:'',
            description:'',
            settingType:false,
            questionsPanel:false,
            duedate:new Date().toISOString().substr(0, 10),
            timelimit:{
                val:0
            },
            attemp:'',

            spinner:false
            
        }
    },
    props:{
        subject:Object,
    },
    components:{
        multiple,
        enumeration,
        essay,
        overview
        
    },
    async asyncData(){

    },

    methods:{
        pastQuizSubmit(){
            //OPEN SPINNER TO AVOID SIDE ACTIONS
            this.spinner = true

            //CHECK IF ALL QUESTION ARE SUCCESS TO FILL UP
            if(this.$store.getters['overview'].some(q => q.status == 'danger')) {
                this.spinner = false
                return this.$store.dispatch('CALL_GLOBALMSG', {
                    msg:'Please finish filling the questions',
                    icon:'fa-exclamation-circle',
                    type:'warning'
                })
            }


            //GET QUESTIONS
            let final = []
            this.$store.getters['overview'].forEach(q => final.push(q.data))
            

            //FINAL OBJECT HANDLER
            let finalObjquiz = {
                subject:this.subject,
                postedby:this.$store.state.user._id,
                title:this.title,
                description:this.description,
                attemp:this.attemp,
                duedate:this.duedate,
                timelimit:this.timelimit.val,
                questions:final
            }

            //SEND TO API TO SAVE IN DATABASE.
            return  this.$axios.post('/api/teacher/subject/newquiz', {newquiz:finalObjquiz})
            .then(res => {
                
                //CALL THE GLOBALL MESSAGE
                this.$store.dispatch('CALL_GLOBALMSG', {
                    msg:res.data.msg,
                    icon:'fa-check-circle',
                    type:'success'
                })

                //RESET ALL STORAGE USES FOR THIS MODULE.
                this.$store.commit('SET_OVERVIEWS', [])
                this.numberOfQuestions = []
                this.questionsPanel = false
                this.spinner = false
            })
            .catch(err => {
                this.$store.dispatch('CALL_GLOBALMSG', {
                    msg:err,
                    icon:'fa-exclamation-circle',
                    type:'danger'
                })
            })

        },

        closeQuizPost(){
            this.$store.commit('SET_OVERVIEWS', [])
            this.numberOfQuestions = []
            this.$emit('closeQuizPost')
        },

        generateQuestions(){
            
            this.numberOfQuestions = []
            if(this.description == '' | this.title == '' | this.duedate == '' | this.timelimit.val == 0 | this.attemp == '') {
                return this.$store.dispatch('CALL_GLOBALMSG', {
                    msg:'Some file are empty.',
                    icon:'fa-exclamation-circle',
                    type:'warning'
                })
            }
            
            if(parseInt(this.numberQeustTxt) > 0) 
                for(let i = 0; i <= parseInt(this.numberQeustTxt)-1; i++){
                    this.numberOfQuestions.push({
                        type:'multi',
                        number:i+1,
                        data:{
                            
                        }
                    })
                }

            if(this.numberOfQuestions.length > 0) return this.settingType = true
        },


        showQuestionsElement(){
            this.$store.commit('SET_OVERVIEWS', [])
            this.settingType = false
            let overViewnums = []
            this.numberOfQuestions.forEach(quest => {
                overViewnums.push({
                    number:quest.number,
                    status:'danger'
                })
            })
            this.$store.commit('SET_OVERVIEWS', overViewnums)
            return setTimeout(() => {
                this.questionsPanel = true
            }, 1500)
        },

        

        ifActive(current, base){
            
            if(current == base) return 'active'

            return ''
        }
    },

    created(){
        
    }
}
</script>

<style scope>
    .postquiz{
        position:fixed;
        top:0;
        left:0;
        background-color:rgba(63, 191, 157, 0.45);
        padding:2% 25%;
        width:100vw;
        height: 100vh;
        z-index:30;
    }

    .active{
        background-color:cornflowerblue;
        color:white;
    }
</style>
<template>
    <div class="bg-light pt-2">
        <keep-alive><dashDefault/></keep-alive>
        
        <postQuiz 
            v-on:closeQuizPost="postsquizModal.modal = false" 
            v-if="postsquizModal.modal"
            :subject="postsquizModal.subject"
        />
        

        <section class="subjectsPanel text-secondary py-3" data-aos="fade-up">
            <div class="display-4 d-flex justify-content-between">
                <div>
                    <v-chip color="teal" v-ripple="{class:'text-light'}" class="text-light">
                        Your Subject's
                    </v-chip>
                </div>

                <div>
                    <v-chip color="teal" v-ripple="{class:'text-light'}" class="text-light">
                        Your Subject's
                    </v-chip> 

                    <v-chip color="teal" v-ripple="{class:'text-light'}" class="text-light">
                        Your Subject's
                    </v-chip> 

                    <v-chip color="teal" v-ripple="{class:'text-light'}" class="text-light">
                        Your Subject's
                    </v-chip> 

                    <v-chip color="teal" v-ripple="{class:'text-light'}" class="text-light">
                        Your Subject's
                    </v-chip> 
                </div>
            </div>  
           

            <div class="subject bg-white mb-2 border-bottom" v-for="subject in subjects" :key="subject._id">
                <div class="border-right">
                    <n-link :to="'/dashboard/subjects/'+subject._id"><h4><strong class="text-info">{{subject.name}}</strong> <span class="badge badge-info" style="float:right;">#{{subject.code}}</span></h4></n-link>
                    
                    <div class="">
                        <span class="badge badge-info">
                            Semester: <span class="badge badge-light">{{subject.sem}}</span>
                        </span>

                        <span class="badge badge-info">
                            Year: <span class="badge badge-light">{{subject.year}}</span>
                        </span>


                        <span @click="openPostQuiz(subject)" class="badge badge-info float-right mt-1" style="cursor:pointer;">
                            Post new quiz +
                        </span>
                    </div>

                    <div class="  my-3 subquizes">
                        <div class="shadow-sm">
                            <h4><strong>50</strong></h4>
                            <small style="opacity:0.5;">20</small>
                        </div>

                        <div class="shadow-sm">
                            <h4><strong>120</strong></h4>
                            <small style="opacity:0.5;">Enrolled</small>
                        </div >

                        <div class="shadow-sm">
                            <h4><strong>11</strong></h4>
                            <small style="opacity:0.5;">Teacher's</small>
                        </div>

                        <div class="shadow-sm">
                            <h4><strong>5</strong></h4>
                            <small style="opacity:0.5;">Finish Quizes</small>
                        </div>
                    </div>
                </div>
                <div class="rounded-right" :style="{backgroundImage: `url('${renderImg(subject.subimg)}')`}">
                    
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import dashDefault from '../../../components/dashboard/'
import postQuiz from '../../../components/dashboard/posquiz/'

export default {
    middleware:['authen'],
    data(){
        return {
            postsquizModal:{
                modal:false,
                subject:{}
            }
        }
    },
    async asyncData({$axios, store}){
        try{
            store.commit('SET_ACTIVEMODULE', 'subjects')
            store.dispatch('SET_USER')
            let subs = await $axios.get('/api/teacher/subjects')
            
            console.log(subs.data)

            return {
                subjects:subs.data
            }
        }catch(err){
            
            this.$store.dispatch('CALL_GLOBALMSG', {
                type:'dark',
                icon:'fa-warning',
                msg:'Something problem in your subjects :'+err
            })

            return this.$router.replace({path:'/error'})
        }
    },
    components:{
        dashDefault,
        postQuiz,
        
    },

    methods:{
        openPostQuiz(subject){
            this.postsquizModal.subject = subject
            this.postsquizModal.modal = true
        },
        renderImg(img){
            return require('../../../assets/uploads/subjectimg/'+img)
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

   .subject{
       border-radius:3px;
       width:100%;
       box-shadow:0px 5px 20px 0px rgba(0,0,0,0.1);
       transition:0.2s;
       display:grid;
       grid-template-columns: 2fr 1fr;
       min-height: 35vh;
       
   }

   .subject > div{
       padding:1em;
       background-size:100% ;
       background-repeat: no-repeat;
       background-position: center;
   }

   .subject:hover{
       box-shadow:0px 5px 10px 0px rgba(0,0,0,0.1);
       transition:0.2s;
   }
   
   .subquizes{
       display:grid;
       grid-template-columns: 1fr 1fr 1fr 1fr;
       grid-gap:1em;
   }

   .subquizes > div{
       background-color:rgba(0,0,0,0.01);
       border-radius:3px;
       box-shadow:0px 5px 5px 0px rgba(0,0,0,0.01);
       color:teal;
       padding:1em;
       text-align: center;

   }

   .subquizes > div:hover{
       background-color:turquoise;
       box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.1);
       color:white;
   }
   
</style>
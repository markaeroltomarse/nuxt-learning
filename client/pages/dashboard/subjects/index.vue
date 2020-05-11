<template>
    <div class="bg-light pt-2">
        <keep-alive><dashDefault/></keep-alive>
        
        <postQuiz 
            v-on:closeQuizPost="postsquizModal.modal = false" 
            v-if="postsquizModal.modal"
            :subject="postsquizModal.subject"
        />
        

        <section class="subjectsPanel text-secondary py-3" data-aos="fade-up">

            <h2 class=""><strong>Your cota's</strong> <n-link to='/dashboard/subjects/addnew'><button class="btn btn-outline-info float-right btn-sm">+</button></n-link></h2>

            <div class="subject bg-white mb-2" v-for="subject in subjects" :key="subject._id">
                <div class="border-right">
                    <h4><strong class="text-info">{{subject.name}}</strong> <span class="badge badge-info" style="float:right;">#{{subject.code}}</span></h4>
                    
                    <div class="">
                        <span class="badge badge-info">
                            Semester: <span class="badge badge-light">{{subject.sem}}</span>
                        </span>

                        <span class="badge badge-info">
                            Year: <span class="badge badge-light">{{subject.year}}</span>
                        </span>

                        <n-link :to="'/dashboard/subjects/'+subject._id">
                            <span class="badge badge-info float-right mt-1 ml-1" style="cursor:pointer;">
                                View subject <i class="fas fa-expand "></i>
                            </span>
                        </n-link>

                        <span @click="openPostQuiz(subject)" class="badge badge-info float-right mt-1" style="cursor:pointer;">
                            Post new quiz +
                        </span>
                    </div>

                    <div class="border border-info p-2 rounded my-1">
                        <small>{{subject.desc}}</small>
                    </div>
                </div>
                <div class="rounded-right" :style="{backgroundImage: `url('${require('../../../assets/subjectsimage/pexels-photo-160107.jpeg')}')`}">
                    
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
        store.commit('SET_ACTIVEMODULE', 'subjects')
        store.dispatch('SET_USER')
        let subs = await $axios.get('/api/teacher/subjects')
        
        console.log(subs.data)

        return {
            subjects:subs.data
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
       background-size:100% 100%;
       background-repeat: no-repeat;
       background-position: center;
   }

   .subject:hover{
       box-shadow:0px 5px 10px 0px rgba(0,0,0,0.1);
       transition:0.2s;
   }

   
</style>
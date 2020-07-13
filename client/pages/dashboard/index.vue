<template>
  <div class="bg-light pt-2">
      <keep-alive>
        <dash-default/>
      </keep-alive>
      <div class="documentBody bg-white" >
          
        <v-row >
            <v-col>
                <h4 class="text-dark">
                    Posted Quizes {{$nuxt.isOnline}}
                </h4>
            </v-col>
            <v-col>
                <v-text-field
                    dense
                    label="Search quiz title.."
                    clearable
                    solo
                    :fill="true"
                    width="100%;"
                >
                    
                </v-text-field>
            </v-col>
        </v-row>

        <div class="rounded border p-3">
            <sorted-quiz
                :sortedquizes="allquizes"
                :quizSpinner="quizSpinner"
                :dense="true"
                v-on:refresQuizes="refresQuizes"
            />
        </div>

        <div class="rounded border p-3 my-2">
            Active student
            <v-list :avatar="true" dense >
                <v-list-item v-ripple="{class:'text-primary'}">
                    <v-list-item-avatar>
                        <v-img :src="require(`../../assets/undraw/avatarmale.png`)">

                        </v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>
                            Mark Aerol Tomarse
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            Lorem ipsum dolor sit amet.
                        </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                        
                        <v-chip class="mx-1" :avatar='true' text-color="teal" small>
                            
                            Message
                            <v-avatar class="my-1 text-light" color="teal"  right>
                                2
                            </v-avatar>
                        </v-chip>
                    </v-list-item-action>
                    <v-list-item-action>
                        
                        <v-chip class="mx-1" text-color="teal" small>
                            Answering..
                        </v-chip>
                    </v-list-item-action>

                    <v-list-item-action>
                        <span class="p-2 rounded-circle bg-success shadow"></span>
                    </v-list-item-action>
                </v-list-item>
            </v-list>
        </div>
    </div>
  </div>
</template>

<script>

import dashDefault from '../../components/dashboard'
import sortedquiz from '../../components/dashboard/curriculum/subject/component/sortedquizes'
export default {
    
    middleware:['authen'],
    data(){
        return {
            //quizes assets
            quizSpinner:false,
        }
    },
    async asyncData({$axios, store}){
        
        try{
            store.commit('SET_ACTIVEMODULE', 'home')
            store.dispatch('SET_USER')
            let res = await $axios.get('/api/teacher/home')
            console.log(res)
            let allquizes = res.data.quizes
            return {
                allquizes
            }
        }catch(err){
            console.log(err)
        }
        
    },

    components:{
        
        'dash-default':dashDefault,
        'sorted-quiz':sortedquiz
    },
    methods:{
        refresQuizes(){

        }
    },

    created(){
        this.$store.dispatch('SET_USER')
    }

}
</script>

<style scoped>
    .postedQuizes{
        max-height: 50vh;
        overflow-y:scroll;
        
    }

    .postedQuizes > div{
        display:grid;
        grid-template-columns: 1fr 5fr 1fr;

    }

    .postedQuizes > div> div{
        
        padding:1em;
    }
</style>
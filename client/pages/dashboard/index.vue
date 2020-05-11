<template>
  <div class="bg-light pt-2">
      <keep-alive>
        <dash-default/>
      </keep-alive>
      <div class="documentBody bg-white" data-aos="fade-up">
        <h4><strong>Posted quiz</strong></h4>

        <!-- <p>{{$store.state.dashboard.data}}</p> -->

        <div class="postedQuizes">
            <div class="border">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import dashDefault from '../../components/dashboard'

export default {
    
    middleware:['authen'],
    data(){
        return {
            
        }
    },
    async asyncData({$axios, store}){
        store.commit('SET_ACTIVEMODULE', 'home')
        let user;
        try{
          
            store.dispatch('SET_USER')
        }catch(err){
            console.log(err)
        }
        return {
            user
        }
    },
    // computed:{
    //     user(){
    //         alert("fuck")
    //         return JSON.stringify(this.user)
    //     }
    // }

    components:{
        
        'dash-default':dashDefault
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
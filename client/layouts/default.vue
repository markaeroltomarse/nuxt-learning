<template>
  <div>
    <nav class="navbar bg-white shadow-sm px-5 py-2 text-light d-flex justify-content-between position-fixed">
      
      <nuxt-link to="/" class="" style="width:20%;">
        <div class="logonav">
            <div class="">
              <img src="../assets/undraw/toga.png" style="width:160%;" >
            </div>
            <div class="text-dark text-left py-2">
              QUICKQUIZ 
            </div>
        </div>
      </nuxt-link>

      <div class=" text-right w-50">
        <div v-if="this.$store.state.authenticated" class="profileUser text-dark " data-aos="fade-left">
          <div class=" py-2 text-right text-secondary">
            {{fullname()}}
          </div>
          <div>
            <img @click="openDrawer" src="../assets/undraw/avatarmale.png" alt="" class="thumbnail rounded-circle border-info shadow" style="width:70%; float:right;">
          </div>
        </div>
        <span v-else class="">

          <nuxt-link to="/login"><button class="btn btn-outline-secondary btn-sm" >Login</button></nuxt-link>
          <nuxt-link to="/register"><button class="btn btn-outline-secondary btn-sm waves-effect waves-light" >Register</button></nuxt-link>
        </span>
      </div>
    </nav>
    
    <userDrawer v-click-outside="outClick" v-if="drawer" data-aos="fade-down" v-on:closeUserdrawer="outClick"/>
    
    <client-only>
      <div v-if="this.$store.state.globalMessage.msg != ''" :class="`rounded shadow  bg-${this.$store.state.globalMessage.type} text-white globalMessage `" data-aos="fade-up">
      <div class="text-center my-4">
        <i :class="`far ${this.$store.state.globalMessage.icon}`"></i>
      </div>
      <div class="mx-3">
        <p class="text-justify"><small>{{this.$store.state.globalMessage.msg}}</small></p>
      </div>
    </div>
    </client-only>
    
  
    <v-app>
       <section class="mainBody h-auto " >
      
        <nuxt app/>
      </section>
    </v-app>
  </div>
</template>

<script>
// import '../plugins/particles/particles'
// import '../plugins/particles/app'

import userDrawer from './userDrawer'
import vClickOutside from 'v-click-outside'

export default {
  
  directives: {
    clickOutside: vClickOutside.directive
  },
  data(){
    return {
      drawer:false
    }
  },
  
  components:{
    userDrawer
  },
  methods:{
      outClick(){
          if(this.drawer == true){
              this.drawer = false
          }
      },

      openDrawer(){
        this.drawer = true
      },

      fullname(){
        try{
          return this.$store.state.user.fname + ' ' + this.$store.state.user.lname
        }catch(err){
          console.log(err)
        }
      },
  },

  computed:{
    
  },

  created(){
    //console.log(JSON.stringify(this.user))
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.mainBody{
  width:100%;
  height:100vh;
  margin-top:3%;
  

}


.logonav{
  display:grid;
  grid-template-columns:1fr 2fr;
  width:20%;
}

.profileUser{
  display:grid;
  grid-template-columns:3fr 1fr;
  width:40%;
  float:right;
}

nav{
  position:fixed;
  top:0;
  left:0;
  z-index:5;
}

.float-right{
  float:right;
}





.documentBody{
   
    min-height:100vh;
    margin:0% 20%;
    border:1px solid rgba(0,0,0,0.03);
    box-shadow:0px 5px 20px 0px rgba(0,0,0,0.1);
    padding:1em 2em;
}

.documentBody:hover{
    transition:0.2s;
    box-shadow:0px 10px 10px 0px rgba(0,0,0,0.1);
}

.plainBody{
  margin-top:1%;
  min-height:100vh;
  margin:0px 20%;
  border:1px solid rgba(0,0,0,0.03);
  padding:1em 2em;
  
}


.globalMessage{
  position: fixed;
  bottom:10%;
  left:3%;
  display:grid;
  grid-template-columns:1fr 2fr;
  width:20%;
  z-index: 50;
}

.globalMessage > div{
  padding:2%;
}

.globalMessage > div > i {
  font-size:50px;
}


.overlay{
  width:100vw;
  height:100vh;
  position: fixed;
  top:0;
  left: 0;
  transition:0.2s;
  z-index:30;
}
</style>

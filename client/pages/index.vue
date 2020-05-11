<template>
  <div class="mx-5">
    <div class="row">
      <div class="col-5  py-5">
        <div class=" texts">
          <h2>How to Start</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum delectus vel molestias alias itaque pariatur nesciunt minus sunt aut reprehenderit?</p>
        </div>

        <div class=" texts">
          <h2>How to Start</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum delectus vel molestias alias itaque pariatur nesciunt minus sunt aut reprehenderit?</p>
        </div>

        <div class=" texts">
          <h2>How to Start</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum delectus vel molestias alias itaque pariatur nesciunt minus sunt aut reprehenderit?</p>
        </div>
      </div>

      <div class="col ">
        <div class="pngStudent " :style="{backgroundImage:`url('${require('../assets/undraw/student.png')}')`}">

        </div>
        
        <div class=" text-center">
          <p><small class="text-secondary ">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, pariatur!</small></p>

          <nuxt-link :to="startBtn"><button class="btn btn-dark shadow" type="button" style="font-size:25px;">START QUIZ</button></nuxt-link>

        
        </div>
      </div>
    </div>

    <div class="border p-2 text-center">
      <button class=""></button>
    </div>
  </div>
</template>

<script>

export default {
  loading:true,
  data(){
    return {
      startBtn:''
    }
  },
  components: {
    
  },

  methods:{
    async isSet(){
      try{
        let type = await this.$axios.get('/api/auth/type')
        if(type.data.result =='')  this.startBtn = '/login'

        if(type.data.result == 'admin') return  this.startBtn =  '/dashboard'
        return this.startBtn = '/student'
      }catch(err){
        console.log(err)
         this.startBtn =  '/login'
      }
    }
  },

  mounted(){
    this.isSet()
  }
}
</script>

<style>
.pngStudent{
  background-position:center;
  background-size:100%;
  background-repeat: no-repeat;
  height:50vh;
}

.texts:hover{
  transition:0.2s;
  color:#2222AD;
}
</style>

<template>
 <div class="userDrawer shadow rounded border bg-white">
     <div class="text-center border-bottom ">
         <img src="../assets/undraw/avatarmale.png" alt="" class="m-3 thumbnail rounded-circle shadow-sm border" style="width:50%;">
     </div>

     <div class="bg-light p-2">
         <p class="text-center text-secondary">{{fullname}}</p>
         <p class="text-center hovering">
             <n-link to="/logout"><i    class="fas fa-sign-out-alt text-secondary mr-2" ></i></n-link>

             <nuxt-link to='/dashboard/profile'><i class="fas fa-expand text-secondary"></i></nuxt-link>
         </p>
     </div>
 </div> 
</template>

<script>
export default {
    
    name:'userDrawer',
    data(){
        return {
            user:this.$store.state.user
        }
    },
    methods:{
        
    },

    computed:{
        fullname(){
            try{
                return this.user.fname + ' ' + this.user.lname 
            }catch(err){
                console.log(err)
            }
        }
    }



}
</script>

<style scoped>
    .userDrawer{
        z-index:10;
        position:fixed;
        top:10%;
        right:4%;
        width:15%;
    }

    .hovering i:hover{
        color:teal;
        transition:0.2s;
        opacity:0.5;
    }
</style>
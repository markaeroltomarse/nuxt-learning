<template>
    <div class="mx-5">
       
        <div class="p-2 rounded shadow border border-info p-5" style="margin:10% 30%;" data-aos="fade-up">
             <div class="text-center" v-if="spinner" data-aos="fade-down">
                 <div class="spinner-border text-info mx-auto" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
             </div>
            
            <form @submit.prevent="loginSubmit" v-else>
                <h4>Login</h4>
                <small>Email: </small>
                <input type="email" ref="email" class="form-control" v-model="login.email" required>

                <small>Password: </small>
                <input type="password" class="form-control" v-model="login.password" required>

                <div class="text-right py-3">
                    <button class="btn btn-info btn-sm">Login</button>
                </div>
            </form>
        </div>
        
    </div>
</template>

<script>

export default {
    data({redirect, $store}){
        return {
            spinner:false,
            login:{
                email:'',
                password:''
            }
        }
    },

    asyncData({redirect, store}){
        if(store.state.authenticated) return redirect('/dashboard')
        
        return {
            redirect
        }

    },
    methods:{
        loginSubmit(){
           this.spinner = true
           this.$axios.post('/api/auth/login', { email:this.login.email, password:this.login.password})
           .then(res => {
               
               this.$store.commit('SET_AUTHENTICATED', res.data.result)
               //alert(res.data.msg + ' | token: '+res.data.token)
               if(!res.data.result){
                   this.$store.dispatch('CALL_GLOBALMSG', {
                        type:'danger',
                        icon:'fa-exclamation-circle',
                        msg:res.data.msg
                    })
                return this.spinner = false
               }


               this.$store.dispatch('CALL_GLOBALMSG', {
                    type:'success',
                    icon:'fa-check-circle',
                    msg:res.data.msg
                })
               
               this.$store.dispatch('SET_USER', res.data.user)
               if(res.data.user.userType == 'student') return this.redirect('/student')

               return this.$router.replace({path:'/dashboard'})
           })
           .catch(err => {
               this.$router.replace({path:'/error'})
           })
        }
    },

    created(){
        try{
            this.$nextTick(() => this.$refs.email.focus())
        }catch(err){
            console.log(err)
        }
    }
}
</script>

<style scoped>

</style>
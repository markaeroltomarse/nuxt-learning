<template>
    <div class="mx-5">
        <h1>{{$store.state.user.fname + ' ' + $store.state.user.lname}}</h1>
    </div>
</template>

<script>
export default {
    middleware:['authen'],
    async asyncData({$axios, store}){
        let user;
        try{
            let res = await $axios.get('/api/auth/user')
            user = res.data

            store.commit('SET_USER', user)
            
        }catch(err){
            console.log(err)
        }
        return {
            user
        }
    }
}
</script>

<style>

</style>
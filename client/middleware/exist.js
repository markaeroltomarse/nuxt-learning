export default async function ({$axios, store, redirect}){
    
    try{
        let check = await $axios.$get('/api/auth/exist')

        store.commit('SET_AUTHENTICATED', check.result)
        
    }catch(err){
        return redirect('/')
    }
    
}
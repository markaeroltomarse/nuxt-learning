export default async function ({$axios, store}){
    
    let check = await $axios.$get('/api/auth/exist')

    store.commit('SET_AUTHENTICATED', check.result)
    
}
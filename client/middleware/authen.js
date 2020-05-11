

export default async function ({store, redirect, $axios }) {
    // If the user is not authenticated
    let check = await $axios.$get('/api/auth/exist')
    if(check.token != ''){
        if(check.user.userType != 'admin') return redirect('/student')  
        return
    }
    store.commit('SET_AUTHENTICATED', check.result)
    return redirect('/login')
    
    

    


}
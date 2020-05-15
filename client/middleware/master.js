export default async ({$axios, store, redirect, $route}) => {
    //PARA LANG SA MGA MASTER
    if(store.state.user._id != '5ebeb67c8628f6049069cc24'){
        //return redirect('/dashboard/subjects')
        let check = await $axios.$get('/api/auth/exist')
        if(check.token != ''){
            if(check.user.userType != 'admin') return redirect('/student')

            store.state.user = check.user
            // console.log("FROM MASTER MIDDLEWARE")
            // console.log(store.state.user)
            return redirect('/dashboard')
        }else{
            return redirect('/login')
        }
        
    }
}
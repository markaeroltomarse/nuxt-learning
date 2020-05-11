export const strict = false

export const state = () => ({
    videos:[],
    currentVideo:{},
    authenticated:false,

    user:{

    },
    dashboard:{
        data:'',
        modulebtn:{
            home:'modulebtn activeModule',
            record:'modulebtn ',
            sections:'modulebtn ',
            logs:'modulebtn ',
            subjects:'modulebtn ',
            curriculum:'modulebtn ',
        },
        postquiz:{
            overviewNumbers:[],
        }
    },
    globalMessage:{
        msg:'',
        icon:'',
        type:''
    }
})


export const getters = {
    overview(state){
        return state.dashboard.postquiz.overviewNumbers
    },

    getFullnameUser(state){
        return state.user.fname + ' ' + state.user.lname
    }
}

export const mutations = {

    
    // SET_VIDEOS(state, videos){
    //     state.videos = videos
    // },

    // SET_CURRENT_VIDEO(state, video){
    //     state.currentVideo = video
    // },

    CALL_GLOBALMSG(state, info){
        state.globalMessage = info  
    },

    CLOSE_GLOGBALMSG(state){
        state.globalMessage.msg = ''
    },

    SET_AUTHENTICATED(state, result){
        state.authenticated = result
    },

    SET_USER(state, user){
        state.user = user
        state.authenticated = true
    },

    SET_DASHDATA(state, data){
        state.dashboard.data = data
    },

    SET_ACTIVEMODULE(state, modulebtn){
        for (var key in state.dashboard.modulebtn) {
            if (state.dashboard.modulebtn.hasOwnProperty(key)) {
                if(key == modulebtn){
                    state.dashboard.modulebtn[key] = 'modulebtn activeModule'
                }else{
                    state.dashboard.modulebtn[key] = 'modulebtn '
                }
            }
        }
    },
    

    SET_OVERVIEWS(state, arrNumbers){
        console.table(arrNumbers)
        state.dashboard.postquiz.overviewNumbers = arrNumbers
    },

    SUCCESS_OVERVIEW(state, {num, data}){
        state.dashboard.postquiz.overviewNumbers.forEach(numba => {
            //numba.number == num & numba.status == 'danger'? numba.status = 'success' :numba.status = 'danger'
            if(numba.status == 'danger'){
                if(numba.number == num ){
                    numba.data = data
                    numba.status = 'success'
                }
            }

            
        })
    },

    INC_OVERVIEW(state, num){
        state.dashboard.postquiz.overviewNumbers.forEach(numba => {
            //numba.number == num & numba.status == 'danger'? numba.status = 'success' :numba.status = 'danger'
            if(numba.status == 'success'){
                if(numba.number == num ){
                    numba.data = {}
                    numba.status = 'danger'
                }
            }
        })
    }
}

export const actions =  {
    async SET_USER(context){
        let res = await this.$axios.get('/api/auth/user')
        let user = res.data
        context.commit('SET_USER', user)
    },

    CALL_GLOBALMSG(context, info){
        context.commit('CALL_GLOBALMSG', info)
        setTimeout(() => {
            context.commit('CLOSE_GLOGBALMSG')
        }, 5000)
    }
    
    
}
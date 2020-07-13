let date = new Date();
let dd = String(date.getDate()).padStart(2, '0');
let mm = date.getMonth(); //January is 0!
let yyyy = date.getFullYear();


const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];

import io from 'socket.io-client'


export const strict = false

export const state = () => ({
    socket:null,
    authenticated:false,
    user:{

    },


    userComponent:{
        drawer:false
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
        },
        
        master:{
            subject:{
                config:null
            }
        },

        components:{
            quizinfo:{
                closeQuizstat:false,
                quiz:0,
                spinner:false,
            }
        }
    },
    globalMessage:{
        msg:'',
        icon:'',
        type:''
    },

})


export const getters = {
    masterAuth(state){
        try{
            return (state.user._id == '5ebeb67c8628f6049069cc24')
        }catch(err){
            return false
        }
    },
    today(){
        let today = monthNames[mm] + '/' + dd + '/' + yyyy;
        return today
    },
    overview(state){
        return state.dashboard.postquiz.overviewNumbers
    },

    getFullnameUser(state){
        return state.user.fname + ' ' + state.user.lname
    },

    

    

}

export const mutations = {
    

    SET_DRAWER(state, val){
        state.userComponent.drawer = val
    },

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
                    numba.data = null
                    numba.status = 'danger'
                }
            }
        })
    },


    REMIND_CONFIG(state, config){
        state.dashboard.master.subject.config = config
    },

    SET_SOCKET(state){
        return state.socket = io('http://localhost:5000')
    }
    
}

export const actions =  {
    async SET_SOCKET({commit}, cb){
        return await cb(commit('SET_SOCKET'))
    },
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
    },

    SET_ELLIPSER(context, w){
        return {
            class:'text-nowrap d-block text-truncate',
            w:'width:'+w
        }
    },
    
}
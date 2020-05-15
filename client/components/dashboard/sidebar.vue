<template>

 <div class="sidebar ">
     
     <div >
        <div v-ripple='{class:`text-light`}' @click="changeRoute('/dashboard', 'home')" :class="this.$store.state.dashboard.modulebtn.home">
            <div class=" text-center "><i class="fas fa-home"></i></div>
            <div>HOME</div>
        </div>

        <div v-ripple='{class:`text-light`}' @click="changeRoute('/dashboard/record', 'record')" :class="this.$store.state.dashboard.modulebtn.record">
            <div class=" text-center "><i class="fas fa-swatchbook"></i></div>
            <div>RECORD <span class="badge badge-warning text-light " style="float:right; margin:2% 0px;"><small>New</small></span></div>
        </div>

        <div v-ripple='{class:`text-light`}' @click="changeRoute('/dashboard/sections', 'sections')" :class="this.$store.state.dashboard.modulebtn.sections">
            <div class=" text-center "><i class="fas fa-restroom"></i></div>
            <div>SECTIONS</div>
        </div>

        <p class=" p-2 my-2 text-secondary">Others</p>

        <div v-ripple='{class:`text-light`}' @click="changeRoute('/dashboard/logs', 'logs')" :class="this.$store.state.dashboard.modulebtn.logs">
            <div class=" text-center "><i class="fas fa-clipboard-list"></i></div>
            <div>Logs <span class="badge badge-warning text-light " style="float:right; margin:2% 0px;"><small>New</small></span></div>
        </div>

        <div v-ripple='{class:`text-light`}' @click="changeRoute('/dashboard/subjects', 'subjects')" :class="this.$store.state.dashboard.modulebtn.subjects">
            <div class=" text-center "><i class="fas fa-book"></i></div>
            <div>Subjects <span class="badge badge-warning text-light " style="float:right; margin:2% 0px;"><small>New</small></span></div>
        </div>

        <div v-ripple='{class:`text-light`}' v-if="masterAuth()" @click="changeRoute('/dashboard/curriculum', 'curriculum')" :class="this.$store.state.dashboard.modulebtn.curriculum">
            <div class=" text-center "><i class="fas fa-book"></i></div>
            <div>Curriculum <span class="badge badge-warning text-light " style="float:right; margin:2% 0px;"><small>New</small></span></div>
        </div>

        <div>
            <v-overflow-btn
                class="my-2"
                :items="['fuckj', 'your', 'ka']"
                label="Segmented Btn"
                segmented
                target="#dropdown-example"
            ></v-overflow-btn>
        </div>

        <div>
            <v-btn icon color="indigo">
              <v-icon>mdi-star</v-icon>
            </v-btn>
        </div>
        
     </div>
 </div> 
</template>

<script>

export default {
    name:'sidebar',
    
    methods:{
        changeRoute(route, basename){
            
            return this.$router.replace({path:route}).catch(err => console.log(err))
        },

        masterAuth(){
            try{
                return (this.$store.state.user._id == '5ebeb67c8628f6049069cc24')
            }catch(err){
                return false
            }
        }
    },

    created(){
    }
}
</script>

<style scope>
    .sidebar{
        position:fixed;
        left:3%;
        top:11%;
        width:15%;
    }
    
    .modulebtn{
        display:grid;
        grid-template-columns: 1fr 3fr;
        padding:3%;
        border-radius:5px;
        cursor:pointer;
        color:rgba(0,0,0,0.5);
    }

    .modulebtn:hover{
        background-color:turquoise;
        color:white;
        box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.04);
    }

    .activeModule{
        background-color:turquoise;
        color:white;
        box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.04);
    }

    .modulebtn  i{
        font-size:20px;
    }
</style>
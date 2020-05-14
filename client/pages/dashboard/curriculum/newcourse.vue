<template>
  <div class="bg-light pt-3">
      <dashDefault/>
      <section class="documentBody bg-white px-0" data-aos="fade-up">
          <h4 class="text-center"><strong class="text-info">Create new course.</strong></h4>

           <div class="text-center" v-if="spinner" >
                <div class="spinner-border text-info mx-auto" role="status">
                <span class="sr-only">Loading...</span>
            </div>
          </div>
          <div v-else class="bg-info text-light p-3">
              <div v-if="success" class="text-center p-3">
                  <h4><strong>Course added!</strong></h4>
                    <nuxt-link to="/dashboard/curriculum"><button class="btn btn-light">View this course</button></nuxt-link>
                    <button @click="success = false" class="btn btn-light">Add again</button>
              </div>

               <form v-else @submit.prevent="newcourseSubmit" style="margin:0% 20%;" enctype="multipart/form-data">
                  <small><strong class="text-white">Course name:</strong></small>
                  <input v-model="name" type="text" class="form-control" required>

                  <small><strong class="text-white">Course ID:</strong></small>
                  <input v-model="code" type="text" class="form-control" required>
                  <input type="file" @change="selectedFile" hidden ref="courseimg">
                  <div v-ripple='{class:`text-info`}' class="w-100 bg-light rounded my-1 text-center imgselected" @click="$refs.courseimg.click()" :style="{backgroundImage:`url('${imgSelected}')`}">
                      <small class="text-secondary">{{courseimgtxt}}</small>
                  </div>
                  <p>{{selectedFileimg != null ? selectedFileimg.name : ''}}</p>
                  <button class="btn btn-light btn-block text-info my-4"><strong>SUBMIT</strong></button>
              </form>

              <!-- <form enctype="multipart/form-data" @submit.prevent="">
                <input type="file" @change="selectedFile">
                <button @click="uploadFile">Upload</button>
              </form> -->
          </div>
      </section>
  </div>
</template>

<script>
import dashDefault from '../../../components/dashboard/'

export default {
    middleware:['master'],
    data(){
        return {
            name:'',
            code:'',
            success:false,
            spinner:false,
            selectedFileimg:null,

            courseimgtxt:'Choose image for this course',
            imgSelected:'',
            imgDimension:{
                x:0,
                y:0
            }
            
        }
    },
    components:{
        dashDefault
    },
    methods:{
        async newcourseSubmit(){
            this.spinner = true
            if(this.selectedFileimg == null){
                this.spinner = false
                return this.courseimgtxt = 'Please select an image'
            }
            let imagefile = new FormData()
            imagefile.append('courseimg', this.selectedFileimg)


            
            try{
                let resCourseImg = await this.$axios.post('/api/teacher/singleupload?dest=courseimg&fileref=courseimg', imagefile)
                console.log(resCourseImg)
                let resCourseInfos = await this.$axios.post('/api/teacher/course/new', {name:this.name, code:this.code, courseimg:resCourseImg.data.imagetoken})

                this.courseInfoScript_response(resCourseInfos)

            }catch(err){
                console.log(err)
                //this.$router.replace({path:'/error'})
            }





            
        },


        selectedFile(event){
            console.log(event.target.files[0])
            this.selectedFileimg = null
            this.imgSelected = ''
            try{
                let allowedimg = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
                if(!allowedimg.includes('image/'+event.target.files[0].name.split('.').pop())) return this.courseimgtxt = 'File in not an image'
                if(event.target.files[0].size > 600000) return this.courseimgtxt = 'Image size is too big!'
                
                this.selectedFileimg = event.target.files[0]
                this.imgSelected = URL.createObjectURL(event.target.files[0])
            }catch(err){
                console.log(err)
            }
            
            
        },

        async uploadFile(){
            if(this.selectedFileimg != null){
                const imgfile = new FormData()
                imgfile.append('image', this.selectedFileimg)
                return await this.$axios.post('/api/teacher/uploadfile', imgfile)
                .then(res => {
                    console.log(res)
                })
                .catch(err => alert(err))
            }            
        },


        courseInfoScript_response(res){
            console.log(res)
            if(res.data.data == null) {
                
                this.$store.dispatch('CALL_GLOBALMSG', {
                    type:'danger',
                    icon:'fa-exclamation-circle',
                    msg:res.data.msg
                })
                this.spinner = false
                return this.success = false
            }
            
            this.$store.dispatch('CALL_GLOBALMSG', {
                type:'success',
                icon:'fa-exclamation-circle',
                msg:res.data.msg
            })
            this.success = true
            this.spinner = false
        }
    }
}
</script>

<style scoped>
.imgselected{
    background-position:center;
    background-size:100% 100%;
    padding:25% 0%;
    cursor:pointer;
}

</style>
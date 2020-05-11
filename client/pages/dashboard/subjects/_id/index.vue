<template>
  <div class="bg-light ">
      <dashDefault/>
      <section class="subjectsPanel text-secondary py-3 " data-aos="fade-up">
          <h2><strong>Subject information</strong></h2>

          <div class="details " >
              <div class=" " data-aos="fade-up">
                  <div class="details-div shadow-sm text-scondary" >
                    <h4>Computer prog</h4>
                    
                    <div class="row px-3">
                        <div class="col ">
                            <small>Year:</small>
                            <p class="border-bottom"><strong class="text-info">2020 - 2021</strong></p>

                            <small>Semester:</small>
                            <p class="border-bottom"><strong class="text-info">1st sem</strong></p>

                            <div class="rounded text-info p-3 bg-light text-center">
                                <p style="font-size:50px;">
                                    <strong>4</strong>
                                </p>
                                <small>Teacher's</small>
                            </div>
                        </div>

                        <div class="col-6  bg-light text-info rounded p-2">
                            <p><strong>Description</strong></p>
                            <p class="text-justify text-italic"><small>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi consectetur, dolorum, ad doloremque delectus eos enim illum nemo beatae similique quasi neque nulla quo nostrum recusandae voluptatum esse labore. Sint suscipit, qui iste molestias doloribus necessitatibus consectetur atque blanditiis reprehenderit sunt esse omnis. Dignissimos repellat quasi doloribus! Tempore, nesciunt ipsam?</small></p>
                        </div>
                    </div>
                  </div>
              </div>
              <div class="">
                  <div class=" p-2 bg-white details-img shadow-sm " data-aos="fade-up">
                      <h2>#<strong>ICT-032</strong></h2>
                      <img src="../../../../assets/undraw/subject.png" alt="" width="100%">
                  </div>
                  
                  <div class="details-div mt-3 w-100 text-center py-4 shadow-sm" data-aos="fade-up">
                       <h2><span class="badge badge-light text-info ">50</span> ENROLLED</h2>

                       <p class="text-right py-1">
                           <button class="btn btn-info btn-sm btn-block">See list</button>
                       </p>
                  </div>
              </div>
          </div>


          <div class="teachers-div shadow-sm" data-aos="fade-up">
              <h4 class="text-center text-info">Teacher's</h4>
              <div class="teachers-card ">
                  <div class="shadow-sm shadow-info rounded bg-light">
                      <div class="p-2 ">
                          <img class="thumbnail rounded-circle" src="../../../../assets/undraw/subject.png" alt="" width="100%">
                      </div>
                      <div class="p-2 text-center border-top">
                          <strong>Mark Aerol Tomarse</strong>
                      </div>
                  </div>
              </div>
              
          </div>


          <div class="teachers-div shadow-sm" data-aos="fade-up">
              <h4 class="text-center text-info">Schedule week</h4>
              
          </div>

          
        
      </section>
  </div>
</template>

<script>
import dashDefault from '../../../../components/dashboard'

export default {
    middleware:['authen'],
    async asyncData({store}){
        store.dispatch('SET_USER')
        store.commit('SET_ACTIVEMODULE', 'subjects')
    },
    components:{
        dashDefault
    }
}
</script>

<style scoped>
.subjectsPanel{
    margin-top:1%;
    min-height:100vh;
    margin:0px 20%;
}

.details{
    display:grid;
    grid-template-columns:1.5fr 1fr;
}

.details-div{
    margin-right: 5%;
    background-color:white;
    padding:1em;
    border-top:5px solid turquoise;
    
    
}

.details-img{
    border-bottom:5px solid turquoise;
    max-height: 45vh;
}


.teachers-div{
    border-top:5px solid turquoise;
    border-bottom:5px solid turquoise;
    padding:1em;
    
    margin:5% 0px;
    
    background-color:white;

}

.teachers-card{
    display:grid;
    grid-template-columns:1fr 1fr 1fr 1fr;
    grid-gap:10px;
}


</style>
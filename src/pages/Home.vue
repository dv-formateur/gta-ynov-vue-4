<template>
    <div id="home-page">
        <div id="bg-image"></div>
        <div class="container-fluid">
            <nav-bar></nav-bar>

                <div class="row">
                    <!-- CAROUSEL -->
                    <div class="col-10 offset-1">
                        <b-carousel id="carousel1"
                            style="text-shadow: 1px 1px 2px #333;"
                            controls
                            indicators
                            background="#FFF"
                            img-width="1024"
                            img-height="480"
                            :interval="4000">

                            <!-- Text slides with image -->
                            <b-carousel-slide
                                                text="Gerez vos taches avec la vue gantt."
                                                :img-src="require('../img/diapo1.jpg')"
                            ></b-carousel-slide>

                            <!-- Text slides with image -->
                            <b-carousel-slide
                                                text="Gerez vos utilsateurs."
                                                :img-src="require('../img/diapo2.jpg')"
                            ></b-carousel-slide>
                        </b-carousel>
                    </div>
                    
                </div>
        </div>
    </div>
</template>

<script>
import NavBar from "../layout/NavBar.vue";
export default {
  name: "home-page",
  components:{
      NavBar
  },
  data() {
    return {
      input: {
      }
    };
  },
  methods: {}
};
</script>


<style>
#home-page{
    height: 100%; 
}
</style>

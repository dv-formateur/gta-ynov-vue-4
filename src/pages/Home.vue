<template>
    <div id="home-page">
        <div id="bg-image"></div>
        <nav-bar></nav-bar>
        <div class="page">
                <div class="row">
                    <!-- CAROUSEL -->
                    <div class="col-10 offset-1">
                        <b-carousel id="home-carousel"
                            style="text-shadow: 1px 1px 2px #333;"
                            controls
                            indicators
                            background="#FFF"
                            img-width="1024"
                            img-height="480"
                            :interval="4000">

                            <b-carousel-slide
                                                text="Gerez vos taches avec la vue gantt."
                                                :img-src="require('../img/diapo1.jpg')"
                            ></b-carousel-slide>

                            <b-carousel-slide
                                                text="Gerez vos groupes."
                                                :img-src="require('../img/diapo2.jpg')"
                            ></b-carousel-slide>

                            <b-carousel-slide
                                                text="Accedez aux logs."
                                                :img-src="require('../img/diapo3.jpg')"
                            ></b-carousel-slide>

                            <b-carousel-slide
                                                text="Les utilisateurs visualisent leur planning."
                                                :img-src="require('../img/diapo4.jpg')"
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

#home-carousel{
    -webkit-box-shadow: 6px 6px 4px -2px rgba(0,0,0,0.75);
    -moz-box-shadow: 6px 6px 4px -2px rgba(0,0,0,0.75);
    box-shadow: 6px 6px 4px -2px rgba(0,0,0,0.75);
}
</style>

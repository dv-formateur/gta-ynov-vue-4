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
                            img-height="480"
                            background="#FFF"
                            :interval="4000">

                            <!-- Text slides with image -->
                            <b-carousel-slide caption="First slide"
                                                text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                                                img-src="https://picsum.photos/1024/480/?image=52"
                            ></b-carousel-slide>

                            <!-- Text slides with image -->
                            <b-carousel-slide caption="First slide"
                                                text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                                                img-src="https://picsum.photos/1024/480/?image=1"
                            ></b-carousel-slide>

                            <!-- Text slides with image -->
                            <b-carousel-slide caption="First slide"
                                                text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                                                img-src="https://picsum.photos/1024/480/?image=12"
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
        email: ""
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
#bg-image{
    position: fixed;
  left: 0;
  right: 0;
  z-index: 0;

  display: block;
    background-image: url('../img/home_bg.jpg');
    /* Add the blur effect */
    filter: blur(8px);
    -webkit-filter: blur(8px);

    /* Full height */
    height: 100%; 

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>

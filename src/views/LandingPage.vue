<template>
  <div class="landing">
    <section class="banner_part">
        <div class="container-text">
            <div class="col-lg-7">
                <div class="single-banner_slider">
                    <div class="banner_text">
                        <div class="banner_text_iner">
                            <h5>Women Fashion</h5>
                            <h1>Fashion Collection 2020</h1>
                            <SignIn />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
import SignIn from '@/components/SignIn.vue'

export default {
  name: 'LandingPage',
  components: {
    SignIn
  },
  created () {
    if (localStorage.token) {
      this.$router.push({ name: 'MainPage' })
    }
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700|Roboto:300,400,500,700&display=swap");

.landing {
  font-family: "Roboto", sans-serif;
  padding: 0;
  margin: 0;
  font-size: 14px;
  background-color: #f4f4f4;
  height: 100vh;
}

h1,
h5 {
  color: #000;
  font-family: "Roboto Condensed", sans-serif;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}

h5 {
  font-size: 50px;
}

h1 {
  font-size: 90px;
  font-weight: 500;
}

img {
  max-width: 100%;
}

.container-text {
  padding: 80px 0 0 150px;
}

@media only screen and (min-width: 1200px) and (max-width: 3640px) {
  .container-text {
    max-width: 1170px;
  }
}

@media (max-width: 470px) {
  .container-text {
    padding-left: 0px;
  }
  h1 {
    font-size: 70px;
  }
}

.banner_part {
  position: relative;
  background-color: #dde5e8;
  background-image: url("../assets/banner_img.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
}

.banner_part .single_banner_slider .banner_text {
  display: table;
  width: 100%;
  height: 820px;
}

.banner_part .single_banner_slider .banner_text .banner_text_iner {
  display: table-cell;
  vertical-align: middle;
}

@media (max-width: 991px) {
  .banner_part .single_banner_slider .banner_text {
    height: 550px;
  }
}

@media only screen and (min-width: 992px) and (max-width: 1200px) {
  .banner_part .single_banner_slider .banner_text {
    height: 650px;
  }
}

.banner_part .single_banner_slider .banner_text h5 {
  font-size: 24px;
  letter-spacing: 2px;
}

@media (max-width: 991px) {
  .banner_part .single_banner_slider .banner_text h5 {
    font-size: 18px;
  }
}

.banner_part .single_banner_slider .banner_text h1 {
  font-size: 100px;
  text-transform: capitalize;
  font-weight: 700;
  line-height: 110px;
  margin: 17px 0 49px;
}

@media (max-width: 576px) {
  .banner_part .single_banner_slider .banner_text h1 {
    font-size: 35px;
    margin-bottom: 15px;
    line-height: 1.3;
  }
}

@media only screen and (min-width: 576px) and (max-width: 767px) {
  .banner_part .single_banner_slider .banner_text h1 {
    font-size: 30px;
    margin-bottom: 15px;
    line-height: 1.3;
  }
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
  .banner_part .single_banner_slider .banner_text h1 {
    font-size: 40px;
    margin-bottom: 15px;
    line-height: 1.3;
  }
}

@media only screen and (min-width: 992px) and (max-width: 1200px) {
  .banner_part .single_banner_slider .banner_text h1 {
    font-size: 40px;
    margin-bottom: 15px;
    line-height: 1.4;
  }
}

.banner_part .single_banner_slider .banner_text h1 span {
  color: #2f7dfc;
}

.banner_part .single_banner_slider .banner_text p {
  font-size: 15px;
  line-height: 1.8;
  font-family: "Roboto Condensed", sans-serif;
  margin-bottom: 70px;
  padding-right: 80px;
}

@media (max-width: 991px) {
  .banner_part .single_banner_slider .banner_text p {
    padding-right: 0;
    margin-bottom: 10px;
  }
}

@media only screen and (min-width: 992px) and (max-width: 1200px) {
  .banner_part .single_banner_slider .banner_text p {
    padding-right: 0;
  }
}

.banner_part .single_banner_slider .banner_img {
  position: absolute;
  right: 0;
  top: 30%;
}

@media (max-width: 991px) {
  .banner_part {
    padding: 0;
  }
}

@media only screen and (min-width: 992px) and (max-width: 1200px) {
  .banner_part .banner_img img {
    max-width: 75%;
    float: right;
  }
}

</style>

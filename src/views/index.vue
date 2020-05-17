<template>
  <div class="home">
  <mdb-container class="mt-5">
    <mdb-row class="mt-5 align-items-center justify-content-start">
      <section>
        <mdb-card class="card-image" style="background-image: url(https://mdbootstrap.com/img/Photos/Others/gradient1.jpg)">
          <div class="text-white text-center py-5 px-4 my-5">
            <div>
              <h2 class="card-title h1-responsive pt-3 mb-5 font-bold"><strong>Create your beautiful website with MDBootstrap</strong></h2>
              <p class="mx-5 mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat fugiat, laboriosam, voluptatem,
                optio vero odio nam sit officia accusamus minus error nisi architecto nulla ipsum dignissimos. Odit sed qui, dolorum!
              </p>
            </div>
          </div>
        </mdb-card>
      </section>
    </mdb-row>
    <mdb-row class="mt-4">
      <section>
        <mdb-masonry flexbox responsive :maxHeight="1200">
          <mdb-masonry-item src="https://mdbootstrap.com/img/Photos/Others/food3.jpg" :itemStyle="{'width': '33.4%'}"/>
          <mdb-masonry-item src="https://mdbootstrap.com/img/Photos/Others/image06.jpg" :itemStyle="{'width': '33.4%'}"/>
          <mdb-masonry-item src="https://mdbootstrap.com/img/Photos/Others/image17.jpg" :itemStyle="{'width': '33.4%'}"/>
          <mdb-masonry-item src="https://mdbootstrap.com/img/Photos/Others/image02.jpg" :itemStyle="{'width': '33.3%' }"/>
          <mdb-masonry-item src="https://mdbootstrap.com/img/Photos/Others/image008.jpg" :itemStyle="{'width': '33.3%'}"/>
          <mdb-masonry-item src="https://mdbootstrap.com/img/Photos/Others/image010.jpg" :itemStyle="{'width': '33.3%'}"/>
          <mdb-masonry-item src="https://mdbootstrap.com/img/Photos/Others/image002.jpg" :itemStyle="{'width': '33.3%'}"/>
          <mdb-masonry-item src="https://mdbootstrap.com/img/Photos/Others/image005.jpg" :itemStyle="{'width': '33.3%'}"/>
          <mdb-masonry-item src="https://mdbootstrap.com/img/Photos/Others/image18.jpg" :itemStyle="{'width': '33.3%'}"/>
        </mdb-masonry>
      </section>
    </mdb-row>
  </mdb-container>
  </div>
</template>

<script>
import{ 
  mdbCard,
  // mdbBtn,
  mdbContainer,
  mdbRow,
  mdbMasonry,
  mdbMasonryItem,
} from 'mdbvue'
export default {
  name: 'index',
  components : {
  mdbCard,
  // mdbBtn,
  mdbContainer,
  mdbRow,
  mdbMasonry,
  mdbMasonryItem,
  }
}
</script>

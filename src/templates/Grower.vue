<template>
  <Layout>
    <Hero v-if="!$store.state.isSmallWindow" :custom-image="grower.cover && grower.cover.url" />
    <TwoCols class="inner-width">
      <!-- <Filters slot="left" /> -->
	    <GrowerSidebar :grower="grower" slot="left" />
      <template slot="right">
        <div class="p--5">
          <h1>{{ grower.name }}</h1>
          <div class="m--b-4" v-html="grower.description"></div>
          <div class="m--b-4">
            Horaires: {{ grower.openingHours }}
          </div>
          <div class="m--b-2">
            Map: {{ grower.adress }}
          </div>
        </div>
      </template>
    </TwoCols>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  grower: strapiGrowers(id: $id) {
    name
    description
    adress
    phone
    email
    openingHours {
      Day
      Open
      Hours
    }
	  thumbnail {
      url
    }
    cover {
      url
    }
    city {
      name
    }
    canDeliver
    canSell
  }
}
</page-query>

<script>
import Hero from '~/components/Hero';
import GrowerSidebar from '~/components/GrowerSidebar';

export default {
	components: {
    Hero,
		GrowerSidebar
  },
  
  computed: {
    grower () {
      return this.$page.grower;
    },

    sidebarProps () {
      return {
        image: this.grower.image,
        title: this.grower.name,
        description: 'Lorem ispum',
        canSell: this.grower.canSell,
        canShip: this.grower.canShip,
        email: 'toto@totot.com',
        phone: '0292929922'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  filter: grayscale(1);
}

.two-cols ::v-deep .tc__left {
  margin-top: space(4);
  z-index: 1;

  @include breakpoint(mobile) {
    margin-top: -50px;
  }
}
</style>
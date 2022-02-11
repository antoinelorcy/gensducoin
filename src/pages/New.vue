<template>
  <Layout>
    <TwoCols class="inner-width">
      <template slot="left">
        <Sidebar
          v-if="!$store.state.isSmallWindow"
          custom-image="https://images.unsplash.com/photo-1590682680695-43b964a3ae17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
        />
      </template>
      <template slot="right">
        <template v-if="isSubmitted">
          <h1>Merci de votre contribution</h1>
          <p>Votre fiche est désormais en attente de validation, elle sera publiée dans un délai de 24h maximum.</p>
          <p><Link to="/" label="Retour à la liste des activités" /></p>
        </template>
        <template v-else>
          <h1>Ajouter votre activité</h1>
          <p>Vous êtes un producteur local, un indépendant, un auto-entrepreneur... et vous souhaitez vous faire connaitre dans votre région ?</p>
          <PersonForm
            type="new"
            v-model="person"
            @submitted="isSubmitted = true"
          />
        </template>
      </template>
    </TwoCols>
  </Layout>
</template>

<script>
import Sidebar from '~/components/Sidebar';
import PersonForm from '~/components/PersonForm';

const meta = {
  title: 'gensducoin - Faites découvrir votre activité',
  description: 'Que vous soyez indépendant, producteur local, coiffeur, artiste, maçon, électricien, ... faites découvrir votre activité à vos voisins.',
  image: require('~/assets/images/cover.png')
};

export default {
  	metaInfo() {
      return {
        title: meta.title,
        meta: [
          { name: 'description', content: meta.description },
          { name: 'og:title', content: meta.title },
          { name: 'og:description', content: meta.description },
          { name: 'og:image', content: meta.image },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: meta.title },
          { name: 'twitter:description', content: meta.description },
          { name: 'twitter:image', content: meta.image }
        ]
      }
	},

  components: {
      Sidebar,
      PersonForm
  },

  data () {
    return {
      person: {
        identity: {
          email: '',
          name: '',
          phone: ''
        },
        activity: {
          job: {
            id: -1,
            value: ''
          },
          description: ''
        },
        adress: {
          city: {
            id: -1,
            value: ''
          },
          adress: ''
        },
        more: {
          thumbnail: '',
          website: '',
          facebook: '',
          linkedin: '',
          twitter: '',
          youtube: ''
        },
      },
      isSubmitted: false
    }
  }
}
</script>

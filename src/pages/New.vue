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

export default {
  metaInfo: {
    title: 'Ajouter mon activité - gensducoin.fr'
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

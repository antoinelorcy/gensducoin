<template>
  <Layout>
	<Hero show-add-person :min-height="180" custom-image="https://images.unsplash.com/photo-1466096115517-bceecbfb6fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
	<OneCol class="inner-width">
		<div class="grid">
			<div class="col-lg-12">
				<div class="m--b-6">
					<h1>Le concept de gensducoin.fr</h1>
					<p>Le constat est le suivant, nous ne connaissons pas nos voisins.<br/>J'ai créé cette plateforme pour faciliter la mise en relation entre les particuliers et les professionnels.</p>
				</div>
				<div class="m--b-6">
					<h2>Découvrir des professionnels proche de chez vous</h2>
					<p>Vous êtes un particulier et vous recherchez un professionnel pour vous aider ? Vous êtes au bon endroit, grâce à <b>gensducoin</b> vous allez pouvoir <g-link to="/">rechercher un professionnel proche de chez vous</g-link>.</p>
				</div>
			</div>
			<div class="col-lg-6">
				<div class="m--b-6">
					<h2>Présenter votre activité</h2>
					<p>Que vous soyez indépendant, producteur local, coiffeur, artiste, maçon, électricien, ... faites découvrir votre activité à vos voisins.</p>
					<p>Voici quelques exemples d'activité:</p>
					<ul>
						<li v-for="job in jobs" :key="job.id">{{ job.title }} à {{ randomCity() }}</li>
					</ul>
				</div>

				<div class="m--b-6">
					<h3>À propos</h3>
					<p>N'hésitez pas à m'envoyer des remarques, avis à l'adresse email suivante <a href="mailto:contact@gensducoin.fr">contact@gensducoin.fr</a></p>
				</div>
			</div>
			<div class="col-lg-6 p--3 text-align--center">
				<g-image src="~/assets/images/logo-topo.png" width="400" />
			</div>
		</div>
		
	</OneCol>
  </Layout>
</template>

<static-query>
query {
  jobs: allJobs (sortBy: "title", order: ASC) {
    edges {
      node {
        id
        title
      }
    }
  }

  cities: allCities (sortBy: "name", order: ASC, skip: 1500, limit: 1000) {
    edges {
      node {
        id
        name
      }
    }
  }
}
</static-query>

<script>
import Hero from '~/components/Hero';

export default {
	metaInfo: {
		title: 'Le concept - gensducoin.fr'
	},

	components: {
		Hero
	},

	computed: {
		jobs () {
			return this.$static.jobs.edges.map((j) => j.node);
		},

		cities () {
			return this.$static.cities.edges.map((c) => c.node);
		}
	},

	methods: {
		randomCity () {
			return this.cities[Math.floor(Math.random()*this.cities.length)].name;
		}
	}
}
</script>

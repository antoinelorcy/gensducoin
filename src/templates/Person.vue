<template>
	<Layout class="person">
		<TwoCols class="inner-width">
			<template slot="left">
				<Sidebar
					v-if="!$store.state.isSmallWindow"
					:custom-image="person.thumbnail"
				/>
			</template>

			<template slot="right">
				<div class="person__content">
					<div class="person__header">
						<div v-if="$store.state.isSmallWindow" class="person__thumbnail">
							<g-image :src="person.thumbnail" width="160" />
						</div>
						<h1>{{person.name}}</h1>
					</div>
					
					<div class="person__block">
						<h2>{{ person.job.title }} à {{ person.city.name }}</h2>
						<p>{{ person.description }}</p>
					</div>

					<div class="person__block">
						<h4>Pour me joindre</h4>
						<a v-if="person.phone" :href="`tel:${person.phone}`" target="_blank" class="person__phone">
							<Icon name="phone" />
							{{ person.phone }}
						</a>
						<a v-if="person.email" :href="`mailto:${person.email}`" target="_blank" class="person__mail">
							<Icon name="email" />
							{{ person.email }}
						</a>
					</div>

					<div class="person__block">
						<h4>Venez me rencontrer</h4>
						<a href="https://goo.gl/maps/rUyW5RwdsntuesHo6" target="_blank" class="person__adress">
							<Icon name="pin" />
							<template v-if="person.adress">{{ person.adress }}<br></template>{{ person.city.postal_code}} {{ person.city.name}}
						</a>
					</div>

					<div class="person__block">
						<h4>Pour plus d'informations</h4>
						<a v-if="person.website" :href="person.website" target="_blank" class="person__web">
							<Icon name="globe" />
							{{ person.website }}
						</a>
						<a v-if="person.linkedin" :href="person.linkedin" target="_blank" class="person__linkedin">
							<Icon name="linkedin" />
							Mon Linkedin
						</a>
						<a v-if="person.facebook" :href="person.facebook" target="_blank" class="person__facebook">
							<Icon name="facebook" />
							Mon Facebook
						</a>
						<a v-if="person.twitter" :href="person.twitter" target="_blank" class="person__twitter">
							<Icon name="twitter" />
							Mon Twitter
						</a>
						<a v-if="person.youtube" :href="person.youtube" target="_blank" class="person__youtube">
							<Icon name="youtube" />
							Mon Youtube
						</a>
					</div>

					<div v-if="$store.state.isSmallWindow" class="sidebar__back-btn">
						<Link to="/" label="Retour à la liste" icon="arrow-left" is-bold is-icon-prefix />
					</div>
				</div>
			</template>
		</TwoCols>
	</Layout>
</template>

<page-query>
query ($id: ID!) {
  person: people(id: $id) {
	id
	slug
	email
	name
	thumbnail 
	description
	adress
	phone
	website
	linkedin
	facebook
	twitter
	youtube
	city {
		id
		name
		postal_code
		region_id
	}
	region {
		id
		name
	}
	job {
		id
		title
	}
  }
}
</page-query>

<script>
import Sidebar from '~/components/Sidebar';

export default {
  metaInfo () {
	return {
	  title: `${this.person.name} - gensducoin.fr`
	}
  },

  components: {
	  Sidebar
  },

  data () {
	return {
	}
  },

  computed: {
	  person () {
		  return this.$page.person;
	  }
  }
}
</script>

<style lang="scss" scoped>
.person {
	.sidebar {
		min-height: 300px;
	}

	&__content {
		position: relative;
	}

	&__header {
		margin-top: space(2);
		margin-bottom: space(3);

		> h1 {
			margin: 0;
		}
	}

	&__thumbnail {
		width: 100%;
		height: 150px;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		border-radius: 5px;
		flex-shrink: 0;
		margin-bottom: space(3);

		> img {
			object-fit: cover;
			width:100%;
			height:100%;
		}
	}	

	&__block {
		display: flex;
		flex-direction: column;
		margin-bottom: space(4);
	}

	&__block a {
		color: color(grey);
		text-decoration: none;
		display: inline-flex;
		margin-bottom: space(2);
		font-weight: 600;
		transition: color 0.3s ease;

		&:hover {
			color: color(primary);
		}

		.icon {
			margin-right: space(2);
		}
	}
}
</style>
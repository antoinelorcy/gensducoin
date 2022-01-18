<template>
	<Modal
		title="Vous souhaitez faire connaitre votre activité ?"
		:visible="visible"
		@close="close"
	>
		<p>
			Merci de remplir le formulaire ci-dessous, nous vous contacterons très prochainement pour en savoir plus !<br/>
			Vous pouvez également nous contacter directement à <a href="mailto:contact@gensducoin.fr">contact@gensducoin.fr</a>
		</p>
		<Form
			:is-submitted="form.submitted"
			@submit="submit"
			class="m--t-6"
		>
			<div class="grid">
				<FormItem
					label="Nom"
					:validation="$v.form.name"
					:validation-messages="$v.form.$params.name.messages"
					class="col-lg-6 p--r-2"
				>
					<Input
						v-model="form.name"
						slot-scope="props"
						v-bind="props"
						placeholder="Votre nom"
					/>
				</FormItem>
				<FormItem
					label="Email"
					:validation="$v.form.email"
					:validation-messages="$v.form.$params.email.messages"
					class="col-lg-6 p--l-2"
				>
					<Input
						v-model="form.email"
						slot-scope="props"
						v-bind="props"
						placeholder="Votre email"
					/>
				</FormItem>
			</div>
			<FormItem
				:validation="$v.form.job"
				label="Activité"
			>
				<Autocomplete
					v-model="form.job"
					slot-scope="props"
					v-bind="props"
					placeholder="Votre métier / activité"
					:options="jobs"
					:suggestion-from-length="1"
				/>
			</FormItem>
			<FormItem
				:validation="$v.form.city"
				label="Code postal / Ville"
			>
				<Autocomplete
					v-model="form.city"
					slot-scope="props"
					v-bind="props"
					placeholder="Votre code postal / ville"
					:options="cities"
				/>
			</FormItem>
			<FormItem
				:validation="$v.form.message"
				label="Informations sur vous, vos produits, ..."
			>
				<Textarea
					v-model="form.message"
					slot-scope="props"
					v-bind="props"
					placeholder="Votre message"
				/>
			</FormItem>
			<template slot="footer">
				<Button label="Annuler" fill="raw" color="grey" @click="close" />
				<Button label="Envoyer" type="submit" :is-loading="form.submitting" />
			</template>
		</Form>
	</Modal>
</template>

<static-query>
query {
  jobs: allJobs (sortBy: "title" order: ASC) {
    edges {
      node {
        id
        title
      }
    }
  }
}
</static-query>

<script>
import axios from 'axios';
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import Form from './Form';
import FormItem from './FormItem';

const initialForm = () => {
	return {
		email: '',
		name: '',
		job: '',
		message: '',
		postalCode: '',
		city: '',
		submitting: false,
		submitted: false
	}
};

export default {
	mixins: [validationMixin],

	props: {
		visible: Boolean
	},

	components: {
		Form,
		FormItem
	},

	data () {
		return {
			form: initialForm(),
			cities: [],
			jobs: []
		}
	},

	validations: {
		form: {
			email: {
				required,
				email,
				$params: {
					messages: {
						required: 'Le champ email est requis',
						email: 'Email invalide'
					}
				}
			},
			name: {
				required,
				$params: {
					messages: {
						required: 'Le champ nom est requis'
					}
				}
			},
			job: {
				required
			},
			city: {
				required
			}
		}
	},

	created () {
		this.jobs = this.$static.jobs.edges.map((job) => {
			return {
				title: job.node.title,
				value: job.node.title
			}
		});

		axios
			.get('http://localhost:8080/json/cities.json')
			.then(( { data } ) => {
				this.cities = data.map((city) => {
					return {
						...city,
						value: city.postal_code + ' - ' + city.name
					}
				});
			});
	},

	methods: {
		close () {
			this.$emit('close');
			this.$v.$reset();
			this.form = initialForm();
		},

		submit () {
			this.$v.$touch();
			if (!this.$v.$invalid) {
				console.log('submit', this.form);
				this.form.submitting = true;
				setTimeout (() => {
					this.form.submitting = false;
					this.form.submitted = true;
				}, 5000);
			}
		}
	}
};
</script>
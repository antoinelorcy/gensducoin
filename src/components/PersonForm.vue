<template>
    <div class="person-form">
        <Stepper
          v-if="steps.length"
          v-model="currentStep"
          :steps="steps"
          :is-submitting="isSubmiting"
          @prev="prev"
          @submit="submit"
        >
          <transition-group name="stepper-transition">
            <Step
              key="step1"
              ref="step1"
              v-show="currentStep === 1"
              :title="steps[0].title"
            >
                <FormItem
                  label="Nom"
                  :validation="$v.value.identity.name"
                  :validation-messages="$v.value.identity.$params.name.messages"
                >
                  <Input
                    v-model="value.identity.name"
                    slot-scope="props"
                    v-bind="props"
                    placeholder="Votre nom"
                  />
                </FormItem>
                <FormItem
                  label="Email"
                  :validation="$v.value.identity.email"
                  :validation-messages="$v.value.identity.$params.email.messages"
                >
                  <Input
                    v-model="value.identity.email"
                    slot-scope="props"
                    v-bind="props"
                    placeholder="Votre email"
                  />
                </FormItem>
                <FormItem
                  label="Téléphone"
                  :validation="$v.value.identity.phone"
                >
                  <Input
                    v-model="value.identity.phone"
                    slot-scope="props"
                    v-bind="props"
                    placeholder="Votre numéro de téléphone"
                  />
                </FormItem>
            </Step>
            <Step
              key="step2"
              ref="step2"
              v-show="currentStep === 2"
              :title="steps[1].title"
            >
              <FormItem
                :validation="$v.value.activity.job"
                label="Activité"
              >
                <Autocomplete
                  v-model="value.activity.job"
                  slot-scope="props"
                  v-bind="props"
                  placeholder="Votre métier / activité"
                  :options="jobs"
                  :suggestion-from-length="1"
                />
              </FormItem>
              <FormItem
                  :validation="$v.value.activity.description"
                  label="A propos de votre activité"
                >
                  <Textarea
                    v-model="value.activity.description"
                    slot-scope="props"
                    v-bind="props"
                    placeholder="Votre activité"
                  />
                </FormItem>
            </Step>
            <Step
              key="step3"
              ref="step3"
              v-show="currentStep === 3"
              :title="steps[2].title"
            >
              <FormItem
                :validation="$v.value.adress.city"
                label="Code postal / Ville"
              >
                <Autocomplete
                  v-model="value.adress.city"
                  slot-scope="props"
                  v-bind="props"
                  placeholder="Votre code postal / ville"
                  :options="cities"
                />
              </FormItem>
              <FormItem
                  label="Numéro / Rue"
                  :validation="$v.value.adress.adress"
                >
                  <Input
                    v-model="value.adress.adress"
                    slot-scope="props"
                    v-bind="props"
                    placeholder="Votre numéro et nom de rue"
                  />
                </FormItem>
            </Step>
            <Step
              key="step4"
              ref="step4"
              v-show="currentStep === 4"
              :title="steps[3].title"
            >
              <FormItem
                  :validation="$v.value.more.thumbnail"
                  label="Photo"
                >
                  <UploadImage
                    v-model="value.more.thumbnail"
                    :additional-infos="{ userName: value.identity.name }"
                    :thumbnail="value.more.thumbnail"
                    slot-scope="props"
                    v-bind="props"
                    @uploading="isSubmiting = true"
                    @uploaded="onThumbnailUpload"
                    @error="isSubmiting = false"
                  />
                </FormItem>
                <FormItem
                  :validation="$v.value.more.website"
                  label="Site internet"
                >
                  <Input
                    v-model="value.more.website"
                    slot-scope="props"
                    v-bind="props"
                    placeholder="Votre site internet"
                  />
                </FormItem>
                <FormItem
                  :validation="$v.value.more.facebook"
                  label="Facebook"
                >
                  <Input
                    v-model="value.more.facebook"
                    slot-scope="props"
                    v-bind="props"
                    placeholder="Votre facebook"
                  />
                </FormItem>
                <FormItem
                  :validation="$v.value.more.linkedin"
                  label="Linkedin"
                >
                  <Input
                    v-model="value.more.linkedin"
                    slot-scope="props"
                    v-bind="props"
                    placeholder="Votre Linkedin"
                  />
                </FormItem>
                <FormItem
                  :validation="$v.value.more.twitter"
                  label="Twitter"
                >
                  <Input
                    v-model="value.more.twitter"
                    slot-scope="props"
                    v-bind="props"
                    placeholder="Votre Twitter"
                  />
                </FormItem>
                <FormItem
                  :validation="$v.value.more.youtube"
                  label="Youtube"
                >
                  <Input
                    v-model="value.more.youtube"
                    slot-scope="props"
                    v-bind="props"
                    placeholder="Votre Youtube"
                  />
                </FormItem>
            </Step>
          </transition-group>
        </Stepper>
    </div>
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
import Form from '~/components/Form';
import FormItem from '~/components/FormItem';
import Stepper from '~/components/Stepper';
import Step from '~/components/Step';
import UploadImage from '~/components/UploadImage.vue';

export default {
  mixins: [validationMixin],

  props: {
    type: {
      type: String,
      required: true,
      validator: prop =>
        ["new", "edit"].includes(prop)
		},
    value: {
      type: Object,
      required: true
    }
  },

  components: {
      Form,
      FormItem,
      Stepper,
      Step,
      UploadImage
  },

  data () {
    return {
      steps: [],
      currentStep: 1,
      isSubmiting: false,
			cities: [],
			jobs: []
    }
  },

  validations: {
    value: {
      identity: {
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
        }
      },

      activity: {
        job: {
          value: {
            required
          }
        },
      },

      adress: {
        city: {
          value: {
            required
          }
        }
      },

      more: {
        thumbnail: {
          required
        }
      }
    }
	},

  created () {
		this.jobs = this.$static.jobs.edges.map((job) => {
			return {
        id: job.node.id,
				title: job.node.title,
				value: job.node.title
			}
		});

		axios
			.get(process.env.GRIDSOME_API_URL + '/cities')
			.then(( { data } ) => {
				this.cities = data.map((city) => {
					return {
						...city,
						value: city.postal_code + ' - ' + city.name
					}
				});
			});
	},

  mounted () {
    this.steps = [
        {
          label: 'Vous',
          title: 'A propos de vous',
          validationObject: this.$v.value.identity
        },
        {
          label: 'Votre activité',
          title: 'Votre activité',
          validationObject: this.$v.value.activity
        },
        {
          label: 'Vous trouver',
          title: 'Où vous trouver ?',
          validationObject: this.$v.value.adress
        },
        {
          label: 'Informations',
          title: 'Informations complémentaires',
          validationObject: this.$v.value.more
        }
      ]
  },

	methods: {
    prev () {
     this.currentStep = this.currentStep - 1;
    },

		submit () {
      if (!this.isSubmiting) {
        this.isSubmiting = true;
        if (this.steps[this.currentStep-1].validationObject) {
          this.steps[this.currentStep-1].validationObject.$touch();
          if (!this.steps[this.currentStep-1].validationObject.$invalid) {
            if (this.currentStep < this.steps.length) {
              this.currentStep = this.currentStep + 1;
              this.isSubmiting = false;
            } else {
              axios
                .post(
                  `${process.env.GRIDSOME_API_URL}/person-${this.type === 'edit' ? 'update' : 'create'}`,
                  {
                    id: this.value.identity.id,
                    email: this.value.identity.email,
                    name: this.value.identity.name,
                    phone: this.value.identity.phone,
                    job_id: this.value.activity.job.id,
                    job: this.value.activity.job.value,
                    description: this.value.activity.description,
                    city_id: this.value.adress.city.id,
                    city: this.value.adress.city.value,
                    adress: this.value.adress.adress,
                    thumbnail: this.value.more.thumbnail,
                    website: this.value.more.website,
                    facebook: this.value.more.facebook,
                    linkedin: this.value.more.linkedin,
                    twitter: this.value.more.twitter,
                    youtube: this.value.more.youtube
                  },
                  {
                    headers: {'Content-Type': 'multipart/form-data'}
                  }
                )
                .then((data) => {
                  console.log('success', data);
                  this.$emit('submitted');
                })
                .catch((error) => {
                  console.log('Person create error', error);
                })
                .finally(() => {
                  this.isSubmiting = false;
                  // Redirect or success message
                })
            }
          } else {
            this.isSubmiting = false;
          }
        } else {
          console.log('No validation key');
        }
      }
		},

    onThumbnailUpload ({original, thumbnail}) {
      if (this.type === 'edit') {
        axios.post(
            process.env.GRIDSOME_API_URL + '/person-update',
            {
              id: this.value.identity.id,
              thumbnail: this.value.more.thumbnail
            },
            {
              headers: {'Content-Type': 'multipart/form-data'}
            }
          )
          .then((data) => {
            console.log('Person updated image with success', data);
          })
          .catch((error) => {
            console.log('Person update image error', error);
          })
          .finally(() => {
            this.isSubmiting = false;
            this.value.more.original = original;
            this.value.more.thumbnail = thumbnail;
          })
      } else {
        this.isSubmiting = false;
        this.value.more.original = original;
        this.value.more.thumbnail = thumbnail;
      }
    }
	}
}
</script>
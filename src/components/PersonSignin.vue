<template>
    <Form @submit="submit" class="person-signin">
        <FormItem
            label="Email"
            :validation="$v.email"
            :validation-messages="$v.$params.email.messages"
        >
            <Input
                v-model="email"
                slot-scope="props"
                v-bind="props"
                placeholder="Votre email"
            />
        </FormItem>
        <FormItem
            label="Code"
            :validation="$v.code"
            :validation-messages="$v.$params.code.messages"
        >
            <Input
                v-model="code"
                slot-scope="props"
                v-bind="props"
                placeholder="Votre code"
            />
        </FormItem>

        <p v-if="hasSubmitError" class="m--b-6 color--danger">
            <Tooltip :content="hasSubmitErrorExplanation">&cross; Une erreur s'est produite.</Tooltip>
        </p>

        <template slot="footer">
            <Button label="Envoyer" type="submit" :is-loading="isSubmitting" />
        </template>
    </Form>
</template>

<script>
import axios from 'axios';
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import Form from '~/components/Form';
import FormItem from '~/components/FormItem';

export default {
    mixins: [validationMixin],

    validations: {
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
        code: {
            required,
            $params: {
                messages: {
                    required: 'Le champ code est requis'
                }
            }
        }
    },

    components: {
        Form,
        FormItem
    },

    data () {
        return {
            email: '',
            code: '',
            isSubmitting: false,
            hasSubmitError: false,
            hasSubmitErrorExplanation: ''
        }
    },

    methods: {
        submit () {
            this.$v.$touch();
			if (!this.$v.$invalid) {
				this.isSubmitting = true;
                this.hasSubmitError = false;
                this.hasSubmitErrorExplanation = '';

                axios
                    .post(
                    'http://localhost:80/signin',
                    {
                        email: this.email,
                        code: this.code
                    },
                    {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                    )
                    .then(({ data }) => {
                        console.log('success', data);
                        // this.$emit('submitted');
                        if (data.success) {
                            this.$emit('submitted', {
                                identity: {
                                    email: data.email,
                                    name: data.name,
                                    id: data.id,
                                    phone: data.phone
                                },
                                activity: {
                                    job: {
                                        id: data.job_id,
                                        value: data.job
                                    },
                                    description: data.description
                                },
                                adress: {
                                    city: {
                                        id: data.city_id,
                                        value: data.city
                                    },
                                    adress: data.adress
                                },
                                more: {
                                    thumbnail: data.thumbnail,
                                    website: data.website,
                                    facebook: data.facebook,
                                    linkedin: data.linkedin,
                                    twitter: data.twitter,
                                    youtube: data.youtube
                                }
                            });
                        } else {
                            this.hasSubmitError = true;
                            this.hasSubmitErrorExplanation = data.error;
                        }
                    })
                    .catch((error) => {
                        this.hasSubmitError = true;
                    })
                    .finally(() => {
                        this.isSubmitting = false;
                    })
			}
        }
    }
}
</script>

<style lang="scss" scoped>
.person-signin {
    max-width: 500px;
    padding: 20px 0;
}
</style>
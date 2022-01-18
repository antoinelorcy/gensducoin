<template>
    <div
        class="upload-image"
        :class="{'upload-image--has-error': hasError }"
    >
        <div
            v-if="imageUrl"
            class="upload-image__uploading"
        >
            <div class="upload-image__preview" :style="{backgroundImage: `url(${imageUrl})`}"></div>
            <div class="upload-image__info">
                <div class="upload-image__filename">{{ imageName }}</div>
                <span v-if="hasUploadError" class="upload-image__upload-error">
                    <Tooltip :content="uploadErrorInformation">&cross;</Tooltip> Une erreur s'est produite.
                    <Button label="Ré-essayer" fill="raw" @click="reset" />
                </span>
                <span v-else-if="isUploaded" class="upload-image__uploading-success">&check; Envoyé !</span>
                <span v-else class="upload-image__uploading-progress">Envoi en cours... <b>{{ uploadPercentage }}%</b></span>
            </div>
        </div>
        <div v-else-if="thumbnail" class="upload-image__uploaded">
            <div class="upload-image__preview" :style="{backgroundImage: `url(${thumbnail})`}"></div>
        </div>
        <div class="upload-image__input">
            <input type="file" accept="image/*" @change="onChange" ref="file" :id="id" />
            <span>Choisir une image</span>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { uid } from "~/utils";

export default {
    props: {
        hasError: {
            type: Boolean,
            default: false
        },
        thumbnail: String,
        additionalInfos: Object
    },

    data () {
        return {
            id: {
                type: String,
                required: false,
                default() {
                    return uid();
                }
            },
            image : null,
            imageUrl: null,
            imageName: '',
            uploadPercentage: 0,
            isUploaded: false,
            hasUploadError: false,
            uploadErrorInformation: ''
        };
    },

    methods: {
        onChange(e) {
            this.hasUploadError = false;
            this.uploadPercentage = 0;
            this.isUploaded = false;

            const file = e.target.files[0];
            this.image = file;
            this.imageUrl = URL.createObjectURL(file);
            this.imageName = file.name;
            this.submitFile(this.image);
        },

        submitFile (file){
                this.$emit('uploading');
				let formData = new FormData();
				formData.append('image', file);

                if (Object.keys(this.additionalInfos).length) {
                    Object.keys(this.additionalInfos).forEach((key)=> {
                        formData.append(key, this.additionalInfos[key]);
                    });
                }
                
				axios
                    .post('http://localhost:80/person-upload-image',
                        formData,
                        {
                            headers: {
                                    'Content-Type': 'multipart/form-data'
                            },
                            onUploadProgress: (( progressEvent ) => {
                                this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ) );
                            })
                        }
                    ).then(( { data }) => {
                        if (data.success) {
                            this.isUploaded = true;
                            this.$emit('uploaded', {
                                original: data.original,
                                thumbnail: data.thumbnail
                            });
                        } else {
                            this.$emit('error');
                            this.hasUploadError = true;
                            this.uploadErrorInformation = data.error;
                        }
                        
                    })
                    .catch((error) => {
                        console.log('Upload failed', error);
                        this.$emit('error');
                        this.hasUploadError = true;
                    })
                    .finally (() => {
                        this.$refs.file.value = '';
                    })
        },

        reset () {
            this.image = null;
            this.imageUrl = null;
            this.imageName = '';
            this.uploadPercentage = 0;
            this.isUploaded = false;
            this.hasUploadError = false;
            this.uploadErrorInformation = '';
            this.$refs.file.value = '';
        }
			
    }
}
</script>

<style lang="scss" scoped>
.upload-image {
    width: 100%;
    height: 150px;
    display: flex;
    background: color(grey-lighter);
    border: 1px solid color(grey-light);
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;

    &--has-error {
        box-shadow: 2px 2px 0 scale-color(color(danger), $lightness: 50%);
    }

    &:hover {
        border-color: color(grey-light);
        box-shadow: 2px 2px 0 #D8D9DF;
        background-color: color(white);
    }

    &__input {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 0;
        
        > input {
            opacity: 0;
            height: 100%;
            width: 100%;
            display: block;
            position: absolute;
            z-index: 1;
            cursor: pointer;
        }

        > span {
            text-decoration: underline;
            transition: color 0.3s ease;
        }
    }

    &__uploading {
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        align-items: center;
        padding: 20px;
        background: color(grey-lighter);
    }

    &__uploaded {
        pointer-events: none;
        padding: 20px;
    }

    &__preview {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        width: 100px;
        height: 100px;
        border-radius: 10px;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
        flex-shrink: 0;
    }

    &__filename {
        color: color(black-light);
        font-size: 16px;
        font-weight: bold;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    &__info {
        padding: 15px;
        flex: 1;
        overflow: hidden;
    }

    &__uploading-success {
        font-weight: bold;
    }

    &__upload-error {
        color: #d54e4e;
    }
}
</style>
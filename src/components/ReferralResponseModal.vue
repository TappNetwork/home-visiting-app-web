<template>
    <ion-header>
        <ion-toolbar>
            <ion-title class="ion-text-wrap"> 
                Respond to refer request from {{ refer.requester_name }} 
            </ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <ion-item>
            <h4>Original Request sent on: {{ refer.sent_at }} </h4>
        </ion-item>
        <ion-item>
        <p>{{ refer.request_message }}</p>
        </ion-item>
        <ion-item>
            <h4>Please include relevant contact information in your response</h4>
            <ion-label position="stacked">
                Message
            </ion-label>
            <ion-textarea v-model="message" placeholder="Your Response Message (Required)">
            </ion-textarea>
        </ion-item>
        <ion-item>
            <ion-button @click="cancel()">
                Cancel
            </ion-button>
            <ion-button :strong="true" @click="confirm()">
                Confirm  
            </ion-button>
        </ion-item>
    </ion-content>
</template>

<script lang="ts">
    import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonItem,
    IonLabel,
    IonTextarea,
    modalController,
    } from '@ionic/vue';
    import { ref, toRef } from 'vue';
    import { useRoute } from 'vue-router';
    import { store } from '@/store';

    export default {
        name: 'ReferralResponseModal',
        components: {
            IonContent,
            IonHeader,
            IonTitle,
            IonToolbar,
            IonButton,
            IonItem,
            IonLabel,
            IonTextarea,
        },
        props: {
            referral: Object 
        },

        setup(props: any) {
            let message = ref('');
            const refer = toRef(props, 'referral');

            console.log(refer.value);

            const cancel = () => {
                return modalController.dismiss(null, 'cancel');
            }

            const confirm = () => {
                const data = {
                    response_mesage: message
                }
                return modalController.dismiss(data, 'confirm');
            }

            const route = useRoute();

            return {
                cancel,
                confirm,

                message,
                refer
            }
        }
    }
</script>

<template>
        <ion-header>
            <ion-toolbar>
                <ion-title class="ion-text-wrap">
                    Refer a patient to {{ visitor.name }}
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-item>
                <ion-label position="stacked">
                    Message
                </ion-label>
                <ion-textarea v-model="message" placeholder="Your Message (Required)">
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
    import { computed, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { store } from '@/store';

    export default {
        name: 'ReferralModal',
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

        setup() {
            let message = ref('');

            const cancel = () => {
                return modalController.dismiss(null, 'cancel');
            }

            const confirm = () => {
                const data = {
                    request_message: message,
                    responder_id: visitor().user_id
                }
                return modalController.dismiss(data, 'confirm');
            }

            const visitor = () => {
                const visitors = store.state.visitors.visitors;
                return visitors.find((x: any) => (x.id == route.params.id))
            }

            const route = useRoute();

            return {
                visitor: computed(() => {
                    return visitor()
                }),
                cancel,
                confirm,

                message
            }
        }
    }
</script>
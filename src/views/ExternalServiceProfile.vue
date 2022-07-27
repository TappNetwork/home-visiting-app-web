<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>
                    {{ service.name }}
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row class="ion-align-items-center">
                    <ion-col size="12" size-lg="4">
                        <h4>{{ service.name }}</h4>
                        <p v-if="service.website"><a :href="service.website">Website</a></p>
                        <p v-if="service.phone_number">Number: {{ service.phone_number }}</p>
                        <p v-if="service.fax_number">Fax Number: {{ service.fax_number }}</p>
                        <p v-if="service.referral_link"><a :href="service.referral_link">Referral Link</a></p>
                        <p v-if="service.referral_email_1">
                            <a :href="'mailto:'+service.referral_email_1">{{ service.referral_email_1 }}</a>
                        </p>
                        <p v-if="service.referral_email_2">
                            <a :href="'mailto:'+service.referral_email_2">{{ service.referral_email_2 }}</a>
                        </p>
                        <br>
                        <h4 v-if="service.contact_1">Contact: {{ service.contact_1 }}</h4>
                        <p v-if="service.contact_1_title">{{ service.contact_1_title }}</p>
                        <p v-if="service.contact_1_phone">Phone: {{ service.contact_1_phone }}</p>
                        <p v-if="service.contact_1_email">
                            Email: <a :href="'mailto:'+service.contact_1_email">{{ service.contact_1_email }}</a>
                        </p>
                        <br>
                        <h4 v-if="service.contact_2">Contact: {{ service.contact_2 }}</h4>
                        <p v-if="service.contact_2_title">{{ service.contact_2_title }}</p>
                        <p v-if="service.contact_2_phone">Phone: {{ service.contact_2_phone }}</p>
                        <p v-if="service.contact_2_email">
                            Email: <a :href="'mailto:'+service.contact_2_email">{{ service.contact_2_email }}</a>
                        </p>
                        <br>
                        <p v-if="service.address">{{ service.address }}</p>
                    </ion-col>
                    <ion-col size="12" size-lg="4">
                        <div v-if="service.description">
                            <h1>Description</h1>
                            <p>{{ service.description }}</p>
                            <br>
                        </div>
                        <div v-if="service.benchmark">
                            <h4>Benchmark</h4>
                            <p>{{ service.benchmark }}</p>
                            <br>
                        </div>
                        <div v-if="service.child_age">
                            <p>Child Age: {{ service.child_age }}</p>
                            <br>
                        </div>
                        <div v-if="service.construct">
                            <h4>Construct</h4>
                            <p>{{ service.construct }}</p>
                        </div>
                        <br>
                        <span v-if="service.tags">
                            <!-- !!! change switch out ion-button for analog once tailwind is brought in -->
                            <ion-button v-for="tag of service.tags"
                                        :key="tag"
                                        >
                                {{ tag }}
                            </ion-button>
                        </span>
                    </ion-col>
                    <ion-col size="0" size-lg="4"></ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
    import { store } from '@/store';
    import { useRoute } from 'vue-router';
    import { IonButton, IonRow, IonCol, IonGrid, IonContent, IonPage, IonHeader, IonToolbar, IonTitle, } from '@ionic/vue';
    import { computed } from '@vue/reactivity';

    export default {
        name: 'ExternalServiceProfilePage',
        components: {
            IonButton,
            IonRow,
            IonCol,
            IonContent,
            IonGrid,
            IonPage,
            IonToolbar,
            IonHeader,
            IonTitle
        },
        setup() {
            const route = useRoute();

            return {
                service: computed(() => {
                    return store.state.externalServices.externalServices.find((x: any) => (x.id == route.params.id))
                }),
            }
        }

    }
</script>
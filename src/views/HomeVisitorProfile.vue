<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>
                    {{ visitor.name }}
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row class="ion-align-items-center">
                    <ion-col size="12" size-lg="4">
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
                             style="height:400px"
                             alt="">
                        <p>{{ visitor.name }}</p>
                        <p>Program: {{ visitor.program }}</p>
                        <p>Supervisor: {{ visitor.supervisor }}</p>
                    <!-- Trigger Modal -->
                    <ion-button @click="openModal">
                        Make Referral
                    </ion-button>
                    <!-- End Trigger Modal -->
                    </ion-col>
                    <ion-col size="12" size-lg="4">
                        <h1>Bio</h1>
                        <p>{{ visitor.bio }}</p>
                    </ion-col>
                    <ion-col size="0" size-lg="4"></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="0" size-xl="2"></ion-col>
                    <ion-col size="3" size-xl="2">
                        <ion-card>
                            <ion-card-header>
                                <ion-card-title>
                                    Locations Served
                                </ion-card-title>
                                <ion-card-subtitle>
                                </ion-card-subtitle>
                            </ion-card-header>
                            <ion-card-content>
                                <p v-for="location in visitor.locations" :key="location">
                                    {{ location }}
                                </p>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                    <ion-col size="3" size-xl="2">
                        <ion-card>
                            <ion-card-header>
                                <ion-card-title>
                                    Counties Served
                                </ion-card-title>
                                <ion-card-subtitle>
                                </ion-card-subtitle>
                            </ion-card-header>
                            <ion-card-content>
                                <p v-for="county in visitor.counties" :key="county">
                                    {{ county }}
                                </p>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                    <ion-col size="3" size-xl="2">
                        <ion-card>
                            <ion-card-header>
                                <ion-card-title>
                                    Skills
                                </ion-card-title>
                                <ion-card-subtitle>
                                </ion-card-subtitle>
                            </ion-card-header>
                            <ion-card-content>
                                <p v-for="skill in visitor.skills" :key="skill">
                                    {{ skill }}
                                </p>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                    <ion-col size="0" size-xl="4"></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="0" size-xl="2"></ion-col>
                    <ion-col size="3" size-xl="2">
                        <ion-card>
                            <ion-card-header>
                                <ion-card-title>
                                    Certifications
                                </ion-card-title>
                                <ion-card-subtitle>
                                </ion-card-subtitle>
                            </ion-card-header>
                            <ion-card-content>
                                <p v-for="certification in visitor.certifications" :key="certification">
                                    {{ certification }}
                                </p>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                    <ion-col size="3" size-xl="2">
                        <ion-card>
                            <ion-card-header>
                                <ion-card-title>
                                    Languages
                                </ion-card-title>
                                <ion-card-subtitle>
                                </ion-card-subtitle>
                            </ion-card-header>
                            <ion-card-content>
                                <p v-for="language in visitor.languages" :key="language">
                                    {{ language }}
                                </p>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                    <ion-col size="0" size-xl="4"></ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
    import { store } from '@/store';
    import { useRoute } from 'vue-router';
    import { modalController, IonModal, IonButtons, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonRow, IonCol, IonGrid, IonContent, IonPage, IonHeader, IonToolbar, IonTitle, } from '@ionic/vue';
    import { computed } from '@vue/reactivity';
    import { ref } from 'vue';
    import ReferralModal from '@/components/ReferralModal.vue';
    import ApiService from "@/services/api.service";

    export default {
        name: 'HomeVisitorProfilePage',
        components: {
            IonButton,
            IonCard,
            IonCardHeader,
            IonCardSubtitle,
            IonCardTitle,
            IonCardContent,
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

            const openModal = async () => {
                const modal = await modalController.create({
                    component: ReferralModal,
                });

                modal.present();

                const { data, role } = await modal.onWillDismiss();

                if (role === 'confirm') {
                    console.log('confrim');
                    ApiService.post('api/internal-referrals', data);
                } else {
                    console.log('cancel');
                }
            }
            
            return {
                visitor: computed(() => {
                    const visitors = store.state.visitors.visitors;
                    return visitors.find((x: any) => (x.id == route.params.id))
                }),

                openModal,
            }
        }

    }
</script>

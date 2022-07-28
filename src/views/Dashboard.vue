<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>
                    Dashboard
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <h1>
                Main Content
            </h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium aliquid, quibusdam fuga at molestias quis aliquam quasi deserunt maxime, qui adipisci officia inventore voluptas dolore eum veritatis fugit nam atque esse doloremque aperiam sed harum natus necessitatibus. Eius repellat culpa ad nisi voluptatum laudantium recusandae sit quisquam explicabo, labore consequuntur veritatis nihil eum similique error et distinctio dolorum, aliquam soluta laboriosam natus maiores! Voluptate explicabo tempore ullam delectus quo maiores numquam natus dicta provident aspernatur, velit perferendis perspiciatis possimus deleniti officia doloremque expedita a libero esse asperiores iusto laborum. Dolorum dolor est qui, commodi debitis architecto saepe harum incidunt iusto perferendis iure dignissimos, rem quod nam optio, fugit ipsam corporis voluptatibus in. Sed vel quasi id maiores quam sint nam.
            </p>
            <br>
            <div v-if="referrals.length">
                <h1>Internal Referral Requests</h1>
                <br>
                <ion-card v-for="referral in referrals" :key="referral.id" @click="openModal(referral)">
                    <ion-card-header>
                        <ion-card-title>
                            From: {{ referral.requester_name }}
                        </ion-card-title>
                        <ion-card-subtitle>
                            Sent: {{ referral.sent_at }}
                        </ion-card-subtitle>
                    </ion-card-header>
                    <ion-card-content>
                        {{ referral.request_message }}
                    </ion-card-content>
                </ion-card> 
            </div>
            <h1>
                Announcements
            </h1>
            <br>
            <div v-for="announcement in announcements" :key="announcement.title">
                <ion-card>
                    <ion-card-header>
                        <ion-card-title>
                            {{ announcement.title }}
                        </ion-card-title>
                        <ion-card-subtitle>
                                <p v-if="announcement.urgent" class="urgent">
                                    Urgent! {{ announcement.date }}
                                </p>
                                <p v-else>
                                    {{ announcement.date }}
                                </p>
                        </ion-card-subtitle>
                    </ion-card-header>
                    <ion-card-content>
                        {{ announcement.body }}
                    </ion-card-content>
                </ion-card>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
    import { mapActions, mapGetters } from "vuex"
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import { modalController, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonCard, IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
    import ApiService from '@/services/api.service';
    import { ref } from 'vue';
    import { VueElement } from "vue";
    import { computed } from "@vue/reactivity";
    import ReferralResponseModal from "@/components/ReferralResponseModal.vue";

    export default {
        name: 'DashboardPage',
        components: { 
            IonCardHeader,
            IonCardTitle, 
            IonCardSubtitle,
            IonCardContent,
            IonCard,
            IonPage,
            IonHeader,
            IonToolbar,
            IonTitle,
            IonContent
        },

        setup() {
            const store = useStore();

            store.dispatch('announcements/fetchAnnouncements');
            store.dispatch('internalReferrals/fetchInternalReferrals');
            

            const activeReferrals = () => {
                const allReferrals = store.state.internalReferrals.internalReferrals;

                if (!allReferrals) return []; 

                const filteredReferalls = allReferrals.filter((referral: any) => {
                    return (referral.responder_id == store.state.auth.user.id &&
                            !referral.responded);
                });

                return filteredReferalls;
            }

            const openModal = async (referral: any) => {
                const modal = await modalController.create({
                    component: ReferralResponseModal,
                    componentProps: { referral: referral},
                });

                modal.present();

                const { data, role } = await modal.onWillDismiss();

                if (role === 'confirm') {
                    ApiService.put('api/internal-referrals/'+referral.id, data);
                }
            }

            return {
                announcements: computed(() => {
                    return store.state.announcements.announcements;
                }),
                
                referrals: computed(() => {
                    return activeReferrals();
                }),

                openModal
            };
        }
    }
</script>
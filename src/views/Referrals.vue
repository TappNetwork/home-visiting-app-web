<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>
                    Referrals Index 
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <ion-item>
                    <ion-label>Search</ion-label>
                    <ion-input v-model="searchQuery"
                                placeholder="Search Referrals"></ion-input>
                </ion-item>
                <ion-item v-for="referral in referrals" :key="referral.id" button @click="openVisitorProfile(referral.id)">
                    <ion-label>
                        <h2>
                            {{ referral.name }}
                        </h2>
                        <p> 
                            Contact: {{ referral.contact_name }} 
                        </p>
                    </ion-label>
                    <p>
                        {{ referral.description }}
                    </p>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
    import { mapActions, mapGetters } from "vuex"
    import { useRouter } from 'vue-router';
    import { ref } from 'vue';
    import { IonInput, IonContent, IonList, IonItem, IonLabel, IonHeader, IonTitle, IonToolbar, IonPage } from '@ionic/vue'
import { computed } from "@vue/reactivity";

    export default {
        name: 'ReferralsPage',
        components: {
            IonInput,
            IonContent,
            IonList,
            IonLabel,
            IonItem,
            IonHeader,
            IonTitle,
            IonToolbar,
            IonPage
        },
        setup() {
            const referrals = [
                {
                    id: 1,
                    name: 'Chuck E Cheese',
                    contact_name: 'Cool Rat Guy',
                    description: 'Kids Love this arcade and excellent pizza restaurant'
                },
                {
                    id: 2,
                    name: 'Six Flags',
                    contact_name: 'Bugs Bunney',
                    description: 'There are sevearal roller coasters here and folks seem to really like it. You can ride the ferris wheel or not. It really is up to you.'
                }
            ]

            let searchQuery = ref('');

            const filterReferrals = () => {
                let filteredReferrals = referrals;

                if (!searchQuery.value) return filteredReferrals;

                const fields = [
                    'name',
                    'description',
                    'contact_name'
                ];

                filteredReferrals = filteredReferrals.filter((referral: any) => {
                    for (const field of fields) {
                        console.log(referral[field] + ' = ' + searchQuery.value + ': ' + referral[field].toLowerCase().includes(searchQuery.value));
                        if (referral[field].toLowerCase().includes(searchQuery.value)) {
                            return true;
                        }
                    }

                    return false;
                });

                return filteredReferrals;
            }

            return {
                referrals: computed(() => {
                    return filterReferrals();
                }),
                searchQuery
            }
        }
    }
</script>
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
                <ion-item v-for="service in services" :key="service.id" button @click="openServiceProfile(service.id)">
                    <ion-label>
                        <h2>
                            {{ service.name }}
                        </h2>
                        <p> 
                            Contact: {{ service.contact_1 }} 
                        </p>
                    </ion-label>
                    <p>
                        {{ service.description }}
                    </p>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
    import { mapActions, mapGetters, useStore } from "vuex"
    import { useRouter } from 'vue-router';
    import { ref } from 'vue';
    import { IonInput, IonContent, IonList, IonItem, IonLabel, IonHeader, IonTitle, IonToolbar, IonPage } from '@ionic/vue'
    import { computed } from "@vue/reactivity";
    import { visitors } from "@/store/visitors.store";
    import FilterService from '@/services/filter.service'; 

    export default {
        name: 'ExternalServicesDirectoryPage',
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
            const store = useStore();

            const router = useRouter();

            store.dispatch('externalServices/fetchExternalServices');

            let searchQuery = ref('');
            let benchmarkSelect = ref('');
            let constructSelect = ref('');
            let tagSelect = ref('');

            const filterServices = () => {
                let filteredServices = store.state.externalServices.externalServices;

                const fields = [
                    'name',
                    'description',
                    'contact_1'
                ];

                filteredServices = FilterService.searchFilter(filteredServices, searchQuery.value, fields);
                filteredServices = FilterService.stringValueFilter(filteredServices, 'benchmark', benchmarkSelect.value);
                filteredServices = FilterService.stringValueFilter(filteredServices, 'construct', constructSelect.value);
                filteredServices = FilterService.arrayValueFilter(filteredServices, 'tags', tagSelect.value);

                return filteredServices;
            }

            return {
                services: computed(() => {
                    return filterServices();
                }),
                searchQuery
            }
        }
    }
</script>
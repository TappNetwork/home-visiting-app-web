<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>
                    External Services Index 
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>
                    <ion-grid>
                        <ion-row>
                            <ion-select v-model="benchmarkSelect" placeholder="Benchmark">
                                <ion-select-option value="">
                                    All Benchmarks
                                </ion-select-option>
                                <ion-select-option v-for="benchmark in selectOptions.benchmarks"
                                                   :key="benchmark"
                                                   :value="benchmark">{{ benchmark }}</ion-select-option>
                            </ion-select>
                            <ion-select v-model="constructSelect" placeholder="Construct">
                                <ion-select-option v-for="construct in selectOptions.constructs"
                                                   :key="construct"
                                                   :value="construct">{{ construct }}</ion-select-option>
                                <ion-select-option value="">
                                    All Constructs
                                </ion-select-option>
                            </ion-select>
                            <ion-select v-model="tagSelect" placeholder="Tag">
                                <ion-select-option value="">
                                    All Tags
                                </ion-select-option>
                                <ion-select-option v-for="tag in selectOptions.tags"
                                                   :key="tag"
                                                   :value="tag">{{ tag }}</ion-select-option>
                            </ion-select>
                        </ion-row>
                        <ion-row>
                            <ion-item>
                                <ion-label>Search</ion-label>
                                <ion-input v-model="searchQuery"
                                            placeholder="Search Services"></ion-input>
                                <ion-button @click="clearFilters">
                                    Clear Filters
                                </ion-button>
                            </ion-item>
                        </ion-row>
                    </ion-grid>
                <ion-item v-for="service in services" :key="service.id" button @click="openServiceProfile(service.id)">
                    <ion-label>
                        <h2>
                            {{ service.name }}
                        </h2>
                        <p> 
                            Contact: {{ service.contact_1 }} 
                        </p>
                    </ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
    import { mapActions, mapGetters, useStore } from "vuex"
    import { useRouter } from 'vue-router';
    import { ref } from 'vue';
    import { IonButton, IonSelect, IonSelectOption, IonGrid, IonRow, IonInput, IonContent, IonList, IonItem, IonLabel, IonHeader, IonTitle, IonToolbar, IonPage } from '@ionic/vue'
    import { computed } from "@vue/reactivity";
    import { visitors } from "@/store/visitors.store";
    import FilterService from '@/services/filter.service'; 

    export default {
        name: 'ExternalServicesDirectoryPage',
        components: {
            IonButton,
            IonSelect,
            IonSelectOption,
            IonGrid,
            IonRow,
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

            const generateSelectOptions = () => {
                let selectOptions = {
                    benchmarks: [],
                    constructs: [],
                    tags: [],
                }

                let services = store.state.externalServices.externalServices;

                if (!services) return selectOptions;

                for (const service of services) {
                    FilterService.pushStringValueIfNotExisting(selectOptions.benchmarks, service.benchmark);
                    FilterService.pushStringValueIfNotExisting(selectOptions.constructs, service.construct);
                    FilterService.pushArrayValueIfNotExisting(selectOptions.tags, service.tags);
                }

                return selectOptions;
            }

            const clearFilters = () => {
                searchQuery.value = '';
                benchmarkSelect.value = '';
                constructSelect.value = '';
                tagSelect.value = '';
            }

            return {
                services: computed(() => {
                    return filterServices();
                }),

                selectOptions: computed(() => {
                    return generateSelectOptions();
                }),

                openServiceProfile: (id: string) => {
                    router.push('/referrals/' + id);
                },

                clearFilters,

                searchQuery,
                benchmarkSelect,
                constructSelect,
                tagSelect
            }
        }
    }
</script>
<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>
                    Home Visitor Directory
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <ion-grid>
                    <ion-row>
                        <ion-select v-model="countySelect" placeholder="County">
                            <ion-select-option value="">
                                All Counties 
                            </ion-select-option>
                            <ion-select-option v-for="county in selectOptions.counties"
                                               :key="county"
                                               :value="county">{{ county }}</ion-select-option>
                        </ion-select>
                        <ion-select v-model="languageSelect" placeholder="Language">
                            <ion-select-option value="">
                                All Languages
                            </ion-select-option>
                            <ion-select-option v-for="language in selectOptions.languages"
                                               :key="language"
                                               :value="language">{{ language }}</ion-select-option>
                        </ion-select>
                        <ion-select v-model="agencySelect" placeholder="Agency">
                            <ion-select-option value="">
                                All Agencies 
                            </ion-select-option>
                            <ion-select-option v-for="agency in selectOptions.agencies"
                                               :key="agency"
                                               :value="agency">{{ agency }}</ion-select-option>
                        </ion-select>
                        <ion-select v-model="certificationSelect" placeholder="Certification">
                            <ion-select-option value="">
                                All Certifications 
                            </ion-select-option>
                            <ion-select-option v-for="certification in selectOptions.certifications"
                                               :key="certification"
                                               :value="certification">{{ certification }}</ion-select-option>
                        </ion-select>
                        <ion-select v-model="supervisorSelect" placeholder="Supervisor">
                            <ion-select-option value="">
                                All Supervisors 
                            </ion-select-option>
                            <ion-select-option v-for="supervisor in selectOptions.supervisors"
                                               :key="supervisor"
                                               :value="supervisor">{{ supervisor }}</ion-select-option>
                        </ion-select>
                        <ion-select v-model="skillSelect" placeholder="Skill">
                            <ion-select-option value="">
                                All Skills 
                            </ion-select-option>
                            <ion-select-option v-for="skill in selectOptions.skills"
                                               :key="skill"
                                               :value="skill">{{ skill }}</ion-select-option>
                        </ion-select>
                    </ion-row>
                    <ion-row>
                        <ion-item>
                            <ion-label>Search:</ion-label>
                            <ion-input v-model="searchQuery"
                                       placeholder="Visitor Name"></ion-input>
                            <ion-button @click="clearFilters">Clear Filters</ion-button>
                        </ion-item>
                    </ion-row>
                </ion-grid>

                <ion-item v-for="visitor in visitors" :key="visitor.id" button @click="openVisitorProfile(visitor.id)">
                    <ion-avatar slot="start">
                        <img src="https://lwlies.com/wp-content/uploads/2017/04/avatar-2009.jpg" alt="">
                    </ion-avatar>
                    <ion-label>
                        <h2>
                            {{ visitor.name }}
                        </h2>
                        <p>
                            {{ visitor.program }}
                        </p>
                        <p>
                            Supervisor: {{ visitor.supervisor }}
                        </p>
                    </ion-label>    
                    <p>{{ visitor.counties[0] }}</p> 
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
    import { mapActions, mapGetters, useStore } from "vuex"
    import { useRouter } from 'vue-router';
    import { IonButton, IonInput, IonSelectOption, IonGrid, IonSelect, IonRow, IonAvatar, IonLabel, IonPage, IonHeader, IonContent, IonList, IonToolbar, IonTitle, IonItem } from '@ionic/vue';
    import { personCircleOutline } from "ionicons/icons";
    import { computed } from "@vue/reactivity";
    import { ref } from 'vue';
    import * as JsSearch from 'js-search';
    import { tSParenthesizedType } from "@babel/types";
    import FilterService from "@/services/filter.service";

    export default {
        name: 'HomeVisitorDirectoryPage',
        components: {
            IonButton,
            IonInput,
            IonSelectOption,
            IonGrid,
            IonSelect,
            IonRow,
            IonAvatar,
            IonPage, 
            IonLabel,
            IonHeader,
            IonContent,
            IonList,
            IonToolbar,
            IonTitle,
            IonItem
        },
        setup() {
            const store = useStore();

            const router = useRouter();

            store.dispatch('visitors/fetchVisitors');

            let countySelect = ref('');
            let agencySelect = ref('');
            let supervisorSelect = ref('');
            let certificationSelect = ref('');
            let skillSelect = ref('');
            let languageSelect = ref('');
            let searchQuery = ref('');

            const filterVisitors = () => {
                let filteredVisitors = store.state.visitors.visitors;

                filteredVisitors = FilterService.arrayValueFilter(filteredVisitors, 'counties', countySelect.value);
                filteredVisitors = FilterService.arrayValueFilter(filteredVisitors, 'skills', skillSelect.value);
                filteredVisitors = FilterService.arrayValueFilter(filteredVisitors, 'certifications', certificationSelect.value);
                filteredVisitors = FilterService.arrayValueFilter(filteredVisitors, 'languages', languageSelect.value);

                filteredVisitors = FilterService.stringValueFilter(filteredVisitors, 'program', agencySelect.value);
                filteredVisitors = FilterService.stringValueFilter(filteredVisitors, 'supervisor', supervisorSelect.value);

                filteredVisitors =  FilterService.searchFilter(filteredVisitors, searchQuery.value, ['name']);

                return filteredVisitors;
            }

            const clearFilters = () => {
                countySelect.value = '';
                agencySelect.value = '';
                supervisorSelect.value = '';
                certificationSelect.value = '';
                skillSelect.value = '';
                languageSelect.value = '';
                searchQuery.value = '';

                filterVisitors();

                console.log('clearfilters');
            }

            const generateSelectOptions = () => {
                let selectOptions = {
                    counties: [],
                    languages: [],
                    agencies: [],
                    supervisors: [],
                    skills: [],
                    certifications: []
                };

                let visitors = store.state.visitors.visitors;

                if (! visitors) return selectOptions;

                for (let visitor of visitors) {
                    FilterService.pushArrayValueIfNotExisting(selectOptions.counties, visitor.counties);
                    FilterService.pushArrayValueIfNotExisting(selectOptions.languages, visitor.languages);
                    FilterService.pushStringValueIfNotExisting(selectOptions.agencies, visitor.program);
                    FilterService.pushStringValueIfNotExisting(selectOptions.supervisors, visitor.supervisor);
                    FilterService.pushArrayValueIfNotExisting(selectOptions.skills, visitor.skills);
                    FilterService.pushArrayValueIfNotExisting(selectOptions.certifications, visitor.certifications);
                }

                return selectOptions;
            }

            return {
                visitors: computed(() => {
                    return filterVisitors();
                }),

                clearFilters,

                selectOptions: computed(() => {
                    return generateSelectOptions();
                }),

                openVisitorProfile: (id: string) => {
                        router.push('/home-visitor-directory/' + id);
                },

                countySelect,
                skillSelect,
                languageSelect,
                certificationSelect,
                agencySelect,
                supervisorSelect,
                searchQuery,

                personCircleOutline
            }
        }
    }
</script>
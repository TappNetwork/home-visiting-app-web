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
                        <ion-select placeholder="County">
                        </ion-select>
                        <ion-select placeholder="Language">
                        </ion-select>
                        <ion-select placeholder="Agency">
                        </ion-select>
                        <ion-select placeholder="Certification">
                        </ion-select>
                        <ion-select placeholder="Supervisor">
                        </ion-select>
                        <ion-select placeholder="">
                        </ion-select>
                        <ion-select placeholder="Agency">
                        </ion-select>
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
    import { mapActions, mapGetters } from "vuex"
    import { useRouter } from 'vue-router';
    import { IonGrid, IonSelect, IonRow, IonAvatar, IonLabel, IonPage, IonHeader, IonContent, IonList, IonToolbar, IonTitle, IonItem } from '@ionic/vue';
    import { personCircleOutline } from "ionicons/icons";
    import { useStore } from 'vuex';
    import { computed } from "@vue/reactivity";
    import * as JsSearch from 'js-search';
    import { tSParenthesizedType } from "@babel/types";

    export default {
        name: 'HomeVisitorDirectoryPage',
        components: {
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

            const pushIfNotExisting = (hayStack: string[], needleStack: string[]) => {
                for (let needle in needleStack) {
                    if (! hayStack.includes(needle)) {
                        hayStack.push(needle);
                    }
                }
            }
/*
            let search = new JsSearch.Search('id');

            search.addIndex('name');

            const allVisitors = store.state.visitors.visitors;

            for (let visitor in allVisitors) {
                search.addDocument(visitor);
            }
*/
            return {
                visitors: computed(() => {
                    return store.state.visitors.visitors;
                }),
                selectOptions: computed(() => {
                    let selectOptions = {
                        counties: [],
                        languages: [],
                    };

                    let visitors:object[] = store.state.visitors.visitors;

                    for (let visitor in visitors) {
                        // pushIfNotExisting(selectOptions.counties, visitor.counties)
                    }

                    return selectOptions;
                }),
                openVisitorProfile: (id: string) => {
                        router.push('/homevisitordirectory/' + id);
                },
                personCircleOutline
            }
        }
    }
</script>
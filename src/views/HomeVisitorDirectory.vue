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
                <ion-item v-for="visitor in visitors" :key="visitor.id" button @click="openVisitorProfile">
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
    import { IonAvatar, IonLabel, IonPage, IonHeader, IonContent, IonList, IonToolbar, IonTitle, IonItem } from '@ionic/vue'
    import { personCircleOutline } from "ionicons/icons";
    import { useStore } from 'vuex';
import { computed } from "@vue/reactivity";

    export default {
        name: 'HomeVisitorDirectoryPage',
        components: {
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

            store.dispatch('visitors/fetchVisitors');

            return {
                visitors: computed(() => {
                    return store.state.visitors.visitors;
                }),
                openVisitorProfile: () => {
                    console.log('open');
                },
                personCircleOutline
            }
        }
    }
</script>
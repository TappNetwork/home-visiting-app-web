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
            <ion-card v-for="notification in notifications" :key="notification.title">
                <ion-card-header>
                    <ion-card-title>
                        {{ notifiation.title }}
                    </ion-card-title>
                    <ion-card-subtitle>
                        {{ notification.date }}
                    </ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                    {{ notification.body }}
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
    import { mapActions, mapGetters } from "vuex"
    import { useRouter } from 'vue-router';
    import { IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonCard, IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
    import ApiService from '@/services/api.service';

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
            const notifications = ApiService.get('api/notifications');
        }
    }
</script>
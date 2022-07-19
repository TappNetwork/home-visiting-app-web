<template>
    <ion-page>
        Dashboard 
    </ion-page>
</template>

<script lang="ts">
    import { mapActions, mapGetters } from "vuex"
    import { useRouter } from 'vue-router';
    import { IonPage } from '@ionic/vue'

    export default {
        name: 'DashboardPage',
        components: { IonPage },
    }
</script>
<template>
    <ion-page>
        Resource Center
    </ion-page>
</template>

<script lang="ts">
    import { mapActions, mapGetters } from "vuex"
    import { useRouter } from 'vue-router';
    import { IonPage } from '@ionic/vue'

    export default {
        name: 'ResourceCenterPage',
        components: { IonPage },
    }
</script>
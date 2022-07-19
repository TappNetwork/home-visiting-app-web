<template>
    <ion-page>
        Profile
    </ion-page>
</template>

<script lang="ts">
    import { mapActions, mapGetters } from "vuex"
    import { useRouter } from 'vue-router';
    import { IonPage } from '@ionic/vue'

    export default {
        name: 'ProfilePage',
        components: { IonPage },
    }
</script>
<template>
    <ion-page>
        Forms
    </ion-page>
</template>

<script lang="ts">
    import { mapActions, mapGetters } from "vuex"
    import { useRouter } from 'vue-router';
    import { IonPage } from '@ionic/vue'

    export default {
        name: 'FormsPage',
        components: { IonPage },
    }
</script>
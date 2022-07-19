<template>
    <ion-page>
        Home Visitor Directory
    </ion-page>
</template>

<script lang="ts">
    import { mapActions, mapGetters } from "vuex"
    import { useRouter } from 'vue-router';
    import { IonPage } from '@ionic/vue'

    export default {
        name: 'HomeVisitorDirectoryPage',
        components: { IonPage },
    }
</script>
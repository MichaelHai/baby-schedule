<template>
  <v-app>
    <v-app-bar app>
      <v-img
        alt="logo"
        class="shrink mr-2"
        contain
        src="@/assets/logo.png"
        width="40"
      />
      <v-toolbar-title title>宝宝的生活</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>

    <sleeping-dialog/>
  </v-app>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import SleepingDialog from '@/components/SleepingDialog.vue';

  @Component({
    components: {SleepingDialog},
  })
  export default class App extends Vue {
  }
</script>

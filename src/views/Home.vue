<template>
  <div>
    <v-speed-dial
      bottom right
      direction="top"
      transition="slide-y-reverse-transition"
      fixed
    >
      <template v-slot:activator>
        <v-btn
          fab
          color="red"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        small
        @click.prevent="sleepDialog = true"
      >
        <v-icon>mdi-sleep</v-icon>
      </v-btn>
    </v-speed-dial>
    <start-sleep-dialog v-model="sleepDialog"/>
    <baby-activity-list :dates="allDates"/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {EventType} from '@/model';
  import StartSleepDialog from '@/components/StartSleepDialog.vue';
  import BabyActivityList from '@/components/BabyActivityList.vue';

  @Component({
    components: {BabyActivityList, StartSleepDialog},
  })
  export default class Home extends Vue {
    private sleepDialog: boolean = false;
    private readonly EventName: { [key: string]: string } = {
      [EventType.Sleep]: '睡',
      [EventType.Eat]: '吃',
      [EventType.WakeUp]: '醒',
    };

    private get allDates(): Array<string> {
      return Object.keys(this.$store.state.activities).sort().reverse();
    }
  }
</script>

<style scoped lang="less">

</style>

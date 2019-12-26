<template>
  <v-dialog scrollable v-model="shown" persistent>
    <v-card>
      <v-card-title>
        宝宝睡觉中...
      </v-card-title>
      <v-card-text>
        <v-subheader v-if="startTime">开始时间: {{ startTime.date }} {{ startTime.time }}</v-subheader>
        <date-and-time-picker v-model="dateAndTime"/>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn @click="wakeup">醒啦!</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from 'vue-property-decorator';
  import {ActivityType, DateAndTime, SleepActivity} from '@/model';
  import {Mutations, WakeupPayload} from '@/store';
  import DateAndTimePicker from '@/components/DateAndTimePicker.vue';
  import {currentDateAndTime} from '@/model/Utils';

  @Component({
    components: {DateAndTimePicker},
  })
  export default class SleepingDialog extends Vue {
    private dateAndTime: { date: string, time: string } = currentDateAndTime();

    @Watch('shown')
    public shownChanged() {
      if (this.shown) {
        this.dateAndTime = currentDateAndTime();
      }
    }

    private get currentActivity(): SleepActivity {
      return this.$store.state.currentActivity;
    }

    private get shown(): boolean {
      return this.currentActivity && this.currentActivity.type === ActivityType.Sleep;
    }

    private set shown(shown: boolean) {
      // do nothing
    }

    private get startTime(): DateAndTime | null {
      if (this.currentActivity) {
        return {
          date: this.currentActivity.startDate,
          time: this.currentActivity.startTime,
        };
      } else {
        return null;
      }
    }

    private wakeup() {
      this.$store.commit(Mutations.Wakeup, this.dateAndTime as WakeupPayload);
    }
  }
</script>

<style scoped lang="less">

</style>

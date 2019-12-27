<template>
  <v-list-item>
    <v-list-item-icon class="my-auto">
      <v-icon>mdi-sleep</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>
        {{ activity.startTime }}
        ~
        {{ activity.endTime }}
      </v-list-item-title>
      <v-list-item-subtitle>{{ duration }}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-content>
      <v-list-item-title>{{ sleepState }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {SleepActivity, SleepStateName} from '@/model';

  @Component
  export default class SleepActivityListItem extends Vue {
    @Prop()
    private activity!: SleepActivity;

    private createDate(dateStr: string, timeStr: string): Date {
      const date: Date = new Date();
      const dateSplitted: Array<string> = dateStr.split('-');
      date.setFullYear(Number(dateSplitted[0]));
      date.setMonth(Number(dateSplitted[1]) - 1);
      date.setDate(Number(dateSplitted[2]));

      const timeSplitted: Array<string> = timeStr.split(':');
      date.setHours(Number(timeSplitted[0]));
      date.setMinutes(Number(timeSplitted[1]));
      return date;
    }

    private get duration(): string {
      const start = this.createDate(this.activity.startDate, this.activity.startTime);
      const end = this.createDate(this.activity.endDate, this.activity.endTime);
      const durationMill = end.getTime() - start.getTime();
      const durationMinutes = durationMill / 1000 / 60;
      const durationHours = Math.floor(durationMinutes / 60);
      const durationRemainMinutes = Math.floor(durationMinutes % 60);
      if (durationHours === 0) {
        return `${durationRemainMinutes}分钟`;
      } else {
        return `${durationHours}小时 ${durationRemainMinutes}分钟`;
      }
    }

    private get sleepState(): string {
      return SleepStateName[this.activity.sleepState];
    }
  }
</script>

<style scoped lang="less">

</style>

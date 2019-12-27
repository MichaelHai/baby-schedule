<template>
  <v-list-item>
    <v-list-item-icon class="my-auto">
      <v-icon>mdi-sleep</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>
        {{ activity.startDate !== date ? '(-1天)' : ''}}{{ activity.startTime }}
        ~
        {{ activity.endTime }}{{ activity.endDate !== date ? '(+1天)' : ''}}
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
  import {createDate} from '@/model/Utils';

  @Component
  export default class SleepActivityListItem extends Vue {
    @Prop()
    private activity!: SleepActivity;
    @Prop()
    private date!: string;

    private get duration(): string {
      const start = createDate(this.activity.startDate, this.activity.startTime);
      const end = createDate(this.activity.endDate, this.activity.endTime);
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

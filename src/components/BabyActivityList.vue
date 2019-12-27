import { ActivityType } from '@/model'
<template>
  <v-list dense>
    <template v-for="date in dates">
      <v-subheader v-text="date" :key="date"/>
      <v-divider :key="`${date}_divider`"/>
      <template v-for="activity in activities[date]">
        <v-lazy dense :key="`${date}_${activity.startTime}`">
          <sleep-activity-list-item v-if="isSleep(activity.type)" :activity="activity" :date="date"/>
        </v-lazy>
        <v-divider :key="`${date}_${activity.startTime}__divider`" inset/>
      </template>
    </template>
  </v-list>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {ActivityType, BabyActivity} from '@/model';
  import SleepActivityListItem from '@/components/SleepActivityListItem.vue';

  @Component({
    components: {SleepActivityListItem},
  })
  export default class BabyActivityList extends Vue {
    @Prop()
    public dates!: Array<string>;

    private get activities(): { [date: string]: BabyActivity } {
      return this.$store.state.activities;
    }

    private isSleep(type: ActivityType): boolean {
      return type === ActivityType.Sleep;
    }
  }
</script>

<style scoped lang="less">

</style>

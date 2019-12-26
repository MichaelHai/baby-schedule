import { SleepState } from '@/model'
<template>
  <v-bottom-sheet
    v-model="shown"
    scrollable
  >
    <v-card>
      <v-card-text>
        <date-and-time-picker v-model="dateAndTime"/>

        <v-select
          v-model="sleepState"
          label="入睡状态"
          :items="AllSleepStates"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer/>
        <v-btn @click="confirm">入睡</v-btn>
      </v-card-actions>
    </v-card>
  </v-bottom-sheet>
</template>

<script lang="ts">
  import {Component, Model, Vue, Watch} from 'vue-property-decorator';
  import {DateAndTime, SleepState, SleepStateName} from '@/model';
  import {currentDateAndTime, toSelectOptions} from '@/model/Utils';
  import {Mutations, SleepPayload} from '@/store';
  import DateAndTimePicker from '@/components/DateAndTimePicker.vue';

  @Component({
    components: {DateAndTimePicker},
  })
  export default class StartSleepDialog extends Vue {
    private readonly AllSleepStates: Array<{ text: string, value: SleepState }> = toSelectOptions(Object.keys(SleepState), SleepStateName);

    @Model('input')
    public value!: boolean;

    private dateAndTime: DateAndTime = currentDateAndTime();
    private sleepState: SleepState = SleepState.EatToSleep;

    @Watch('value')
    public valueChanged() {
      if (this.value) {
        this.dateAndTime = currentDateAndTime();
      }
    }

    private get shown(): boolean {
      return this.value;
    }

    private set shown(shown: boolean) {
      this.$emit('input', shown);
    }

    private confirm() {
      this.shown = false;
      this.$store.commit(Mutations.Sleep, {
        date: this.dateAndTime.date,
        time: this.dateAndTime.time,
        sleepState: this.sleepState,
      } as SleepPayload);
    }
  }
</script>

<style scoped lang="less">

</style>

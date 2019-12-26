<template>
  <v-row>
    <v-menu
      v-model="datePicker"
      :nudge-right="40"
      transition="scale-transition"
      :close-on-content-click="false"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="date"
          label="日期"
          prepend-icon="mdi-calendar"
          readonly
          v-on="on"
        />
      </template>
      <v-date-picker v-model="date" @input="datePicker = false"/>
    </v-menu>
    <v-menu
      ref="timeMenu"
      :nudge-right="40"
      :close-on-content-click="false"
      :return-value.sync="time"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="time"
          label="时间"
          prepend-icon="mdi-clock"
          readonly
          v-on="on"
        />
      </template>
      <v-time-picker
        v-model="time"
        full-width
        @click:minute="$refs.timeMenu.save(time)"
      />
    </v-menu>
  </v-row>
</template>

<script lang="ts">
  import {Component, Model, Vue} from 'vue-property-decorator';
  import {DateAndTime} from '@/model';

  @Component
  export default class DateAndTimePicker extends Vue {
    @Model('input')
    private dateAndTime!: DateAndTime;
    private datePicker: boolean = false;

    private get date(): string {
      return this.dateAndTime.date;
    }

    private set date(date: string) {
      this.$emit('input', {date, time: this.dateAndTime.time});
    }

    private get time(): string {
      return this.dateAndTime.time;
    }

    private set time(time: string) {
      this.$emit('input', {date: this.dateAndTime.date, time});
    }
  }
</script>

<style scoped lang="less">

</style>

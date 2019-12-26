import { EventType } from '@/model'
<template>
  <div>
    <v-btn
      fab
      color="red"
      bottom
      right
      fixed
      @click.prevent="addEventDialog = true"
      class="filterButton"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-bottom-sheet
      v-model="addEventDialog"
      scrollable
    >
      <v-card>
        <v-card-text>
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
                  v-model="eventToAdd.date"
                  label="日期"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-on="on"
                />
              </template>
              <v-date-picker v-model="eventToAdd.date" @input="datePicker = false"/>
            </v-menu>
            <v-menu
              ref="timeMenu"
              :nudge-right="40"
              :close-on-content-click="false"
              :return-value.sync="eventToAdd.time"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="eventToAdd.time"
                  label="时间"
                  prepend-icon="mdi-clock"
                  readonly
                  v-on="on"
                />
              </template>
              <v-time-picker
                v-model="eventToAdd.time"
                full-width
                @click:minute="$refs.timeMenu.save(eventToAdd.time)"
              />
            </v-menu>
          </v-row>
          <v-select
            v-model="eventToAdd.type"
            :items="AllEvents"
            label="事件"
          />
          <template v-if="isSleep(eventToAdd.type)">
            <v-select
              v-model="eventToAdd.sleepState"
              label="入睡状态"
              :items="AllSleepStates"
            />
          </template>
        </v-card-text>
        <v-card-actions right>
          <v-spacer/>
          <v-btn @click="addBabyEvent">添加</v-btn>
        </v-card-actions>
      </v-card>
    </v-bottom-sheet>
    <v-list dense>
      <template v-for="date in allDays">
        <v-subheader v-text="date" :key="date"/>
        <v-lazy v-for="event in allEvents[date]" :key="`${event.date}_${event.time}`">
          <v-list-item dense>
            <v-list-item-content>
              <v-list-item-title v-text="event.time"/>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title v-text="EventName[event.type]"/>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-subtitle v-if="isSleep(event.type)" v-text="SleepStateName[event.sleepState]"/>
            </v-list-item-content>
          </v-list-item>
        </v-lazy>
        <v-divider :key="`${date}_divider`"/>
      </template>
    </v-list>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from 'vue-property-decorator';
  import {BabyEvent, EventType, SleepState} from '@/model';
  import {Mutations} from '@/store';

  @Component
  export default class Home extends Vue {
    private addEventDialog: boolean = false;
    private readonly EventName: { [key: string]: string } = {
      [EventType.Sleep]: '睡',
      [EventType.Eat]: '吃',
      [EventType.WakeUp]: '醒',
    };
    private readonly AllEvents: Array<{ text: string, value: EventType }> = this.toSelectOptions(Object.keys(EventType), this.EventName);
    private eventToAdd: BabyEvent = this.createNewBabyEvent();
    private readonly SleepStateName: { [key: string]: string } = {
      [SleepState.EatToSleep]: '奶睡',
      [SleepState.HoldToSleep]: '抱至熟睡',
      [SleepState.SleepBySelf]: '自己入睡',
    };
    private readonly AllSleepStates: Array<{ text: string, value: SleepState }> = this.toSelectOptions(Object.keys(SleepState), this.SleepStateName);

    private toSelectOptions<T>(values: Array<string>, nameMap: { [key: string]: string }): Array<{ text: string, value: T }> {
      return values.map((key) => {
        return {
          text: nameMap[key],
          value: key as unknown as T,
        };
      });
    }

    private datePicker: boolean = false;

    private leadingZero(value: number): string {
      return ('00' + value).slice(-2);
    }

    private isSleep(type: EventType): boolean {
      return type === EventType.Sleep;
    }

    @Watch('addEventDialog')
    private addEventDialogChanged() {
      if (this.addEventDialog) {
        this.eventToAdd = this.createNewBabyEvent();
      }
    }

    private createNewBabyEvent(): BabyEvent {
      return {
        type: EventType.Sleep,
        date: `${(new Date().getFullYear())}-${this.leadingZero(new Date().getMonth() + 1)}-${this.leadingZero(new Date().getDate())}`,
        time: `${this.leadingZero(new Date().getHours())}:${this.leadingZero(new Date().getMinutes())}`,
        sleepState: SleepState.EatToSleep,
      };
    }

    private addBabyEvent() {
      this.$store.commit(Mutations.AddBabyEvent, this.eventToAdd);
      this.addEventDialog = false;
    }

    private get allDays(): Array<string> {
      return Object.keys(this.$store.state.events).sort().reverse();
    }

    private get allEvents(): { [date: string]: Array<BabyEvent> } {
      return this.$store.state.events;
    }
  }
</script>

<style scoped lang="less">

</style>

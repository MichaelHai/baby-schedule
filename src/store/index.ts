import Vue from 'vue';
import Vuex, {StoreOptions} from 'vuex';
import VuexPersistence from 'vuex-persist';
import {ActivityType, BabyActivity, DateAndTime, SleepActivity, SleepState} from '@/model';

Vue.use(Vuex);

const vuexPersist = new VuexPersistence<BabyScheduleState>({
  key: 'babySchedule',
  storage: localStorage,
});

interface BabyScheduleState {
  currentActivity: Partial<BabyActivity> | null;
  activities: { [day: string]: Array<BabyActivity> };
}

export enum Mutations {
  Sleep = 'Sleep',
  Wakeup = 'Wakeup',
}

export interface SleepPayload {
  date: string;
  time: string;
  sleepState: SleepState;
}

export type WakeupPayload = DateAndTime;

function addActivity(state: BabyScheduleState, activity: BabyActivity) {
  addActivityToDay(state, activity.startDate, activity);
  if (activity.endDate !== activity.startDate) {
    addActivityToDay(state, activity.endDate, activity);
  }
}

function addActivityToDay(state: BabyScheduleState, date: string, activity: BabyActivity) {
  const activities = state.activities[date] || [];
  activities.push(activity);
  activities.sort((a1, a2) => a1.startTime < a2.startTime ? -1 : 1);
  Vue.set(state.activities, date, activities);
}

const options: StoreOptions<BabyScheduleState> = {
  state: {
    currentActivity: {},
    activities: {},
  },
  mutations: {
    [Mutations.Sleep]: (state, payload: SleepPayload) => {
      state.currentActivity = {
        type: ActivityType.Sleep,
        startDate: payload.date,
        startTime: payload.time,
        sleepState: payload.sleepState,
      } as SleepActivity;
    },
    [Mutations.Wakeup]: (state, payload: WakeupPayload) => {
      if (state.currentActivity) {
        if ((state.currentActivity as SleepActivity).sleepState) {
          const currentActivity = state.currentActivity as SleepActivity;
          currentActivity.endDate = payload.date;
          currentActivity.endTime = payload.time;
          Vue.set(state, 'currentActivity', null);
          addActivity(state, currentActivity);
        }
      }
    },
  },
  actions: {},
  modules: {},
  plugins: [vuexPersist.plugin],
};
export default new Vuex.Store(options);

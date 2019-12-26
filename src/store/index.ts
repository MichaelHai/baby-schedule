import Vue from 'vue';
import Vuex, {StoreOptions} from 'vuex';
import VuexPersistence from 'vuex-persist';
import {BabyEvent} from '@/model';

Vue.use(Vuex);

const vuexPersist = new VuexPersistence<BabyScheduleState>({
  key: 'babySchedule',
  storage: localStorage,
});

interface BabyScheduleState {
  events: { [date: string]: Array<BabyEvent> }
}

export enum Mutations {
  AddBabyEvent = 'AddBabyEvent',
}

const options: StoreOptions<BabyScheduleState> = {
  state: {
    events: {},
  },
  mutations: {
    [Mutations.AddBabyEvent]: (state, babyEvent: BabyEvent) => {
      if (state.events[babyEvent.date]) {
        const events = state.events[babyEvent.date];
        events.push(babyEvent);
        events.sort((e1, e2) => e1.time > e2.time ? 1 : -1);
        Vue.set(state.events, babyEvent.date, events);
      } else {
        Vue.set(state.events, babyEvent.date, [babyEvent]);
      }
    },
  },
  actions: {},
  modules: {},
  plugins: [vuexPersist.plugin],
};
export default new Vuex.Store(options);

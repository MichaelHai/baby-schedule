export enum EventType {
  Sleep = 'Sleep',
  Eat = 'Eat',
  WakeUp = 'WakeUp',
}

export enum ActivityType {
  Sleep = 'Sleep',
  Eat = 'Eat',
  Study = 'Study',
  Workout = 'Workout',
}

export enum SleepState {
  EatToSleep = 'EatToSleep',
  HoldToSleep = 'HoldToSleep',
  SleepBySelf = 'SleepBySelf',
}

export interface BabyActivity {
  type: ActivityType;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

export interface SleepActivity extends BabyActivity {
  sleepState: SleepState;
}

export interface DateAndTime {
  date: string;
  time: string;
}

export interface BabyEvent {
  type: EventType;
  date: string;
  time: string;
  sleepDetail?: {
    sleepState: SleepState;
  };
  eatDetail?: {
    side: 'left' | 'right';
  }
}

export const SleepStateName: { [key: string]: string } = {
  [SleepState.EatToSleep]: '奶睡',
  [SleepState.HoldToSleep]: '抱至熟睡',
  [SleepState.SleepBySelf]: '自己入睡',
};

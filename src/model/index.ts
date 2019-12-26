export enum EventType {
  Sleep = 'Sleep',
  Eat = 'Eat',
  WakeUp = 'WakeUp',
}

export enum SleepState {
  EatToSleep = 'EatToSleep',
  HoldToSleep = 'HoldToSleep',
  SleepBySelf = 'SleepBySelf',
}

export interface BabyEvent {
  type: EventType;
  date: string;
  time: string;
  sleepState?: SleepState;
}

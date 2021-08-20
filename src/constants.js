export  const  TIME_RATE =3000;
export const ICON = ['fish','poop','weather']
export const SCANE = ['day','rain']
export const RAIN_CHANCE = 0.9;
export const WAKE_TIME = 5;
export const SLEEP_TIME = 5;
export const getNextHungerTime = (clock)=> Math.floor(Math.random()*3)+5 + clock
export const getNextDiedTime = (clock)=> Math.floor(Math.random()*3)+5 + clock


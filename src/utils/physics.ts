import type { Planet } from '../types';

export const STANDARD_GRAVITY = 9.80665;
export const SPEED_OF_LIGHT_KM_S = 299_792.458;
export const AU_KM = 149_597_870.7;
export const EARTH_CIRCUMFERENCE_KM = 40_075;
export const EARTH_DISTANCE_MKM = 149.6;
export const DAYS_PER_YEAR = 365.25;

export interface ExtraBody {
  id: string;
  name: string;
  gravity: number;
  colors: [string, string, string];
}

export const EXTRA_BODIES: ExtraBody[] = [
  { id: 'moon', name: 'Луна', gravity: 1.62, colors: ['#ececec', '#a9a9a9', '#4f4f4f'] },
  { id: 'pluto', name: 'Плутон', gravity: 0.62, colors: ['#f2dfcc', '#b99a86', '#5e4638'] },
  { id: 'sun', name: 'Солнце', gravity: 274, colors: ['#fff3b0', '#ffb62e', '#d2531a'] },
];

/** «Вес» (в кг-силе) тела массой massKg при ускорении свободного падения gravity */
export function weightOn(massKg: number, gravity: number): number {
  return (massKg * gravity) / STANDARD_GRAVITY;
}

export function travelHours(distanceKm: number, speedKmH: number): number {
  return distanceKm / speedKmH;
}

export function lightSeconds(distanceKm: number): number {
  return distanceKm / SPEED_OF_LIGHT_KM_S;
}

export function daysBetween(from: Date, to: Date): number {
  return Math.floor((to.getTime() - from.getTime()) / 86_400_000);
}

/** Минимальное расстояние до планеты от Земли (орбиты считаем круговыми и компланарными) */
export function closestApproachKm(planet: Planet): number {
  return Math.abs(planet.distanceFromSunMkm - EARTH_DISTANCE_MKM) * 1_000_000;
}

/** Через сколько земных суток наступит следующий «день рождения» на планете */
export function daysToNextBirthday(ageDays: number, periodDays: number): number {
  return periodDays - (ageDays % periodDays);
}

export function addDays(date: Date, days: number): Date {
  const copy = new Date(date.getTime());
  copy.setDate(copy.getDate() + Math.round(days));
  return copy;
}

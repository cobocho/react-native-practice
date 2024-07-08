import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../constants/device';

export const dvw = (percent: number) => DEVICE_WIDTH * (percent / 100);

export const dvh = (percent: number) => DEVICE_HEIGHT * (percent / 100);

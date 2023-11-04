import { EventEmitter } from 'node:events';

import { singleton } from './singleton.server';

export type NotificationMsg = {
  id: number;
  type: '' | 'success' | 'info' | 'warning' | 'error';
  text: string;
};

export const emitter = singleton('emitter', () => new EventEmitter());

import type { LoaderFunctionArgs } from '@remix-run/node';

import { eventStream } from 'remix-utils/sse/server';

import {
  emitter,
  type NotificationMsg,
} from '#app/utils/server/emitter.server';

export async function loader({ request }: LoaderFunctionArgs) {
  return eventStream(request.signal, (send) => {
    function handleMsg(notification: NotificationMsg) {
      send({ event: 'toast', data: JSON.stringify(notification) });
    }

    emitter.on('notify', handleMsg);

    return () => {
      emitter.off('notify', handleMsg);
    };
  });
}

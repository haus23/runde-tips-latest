import { Form } from '@remix-run/react';

import { toast } from 'sonner';

import {
  emitter,
  type NotificationMsg,
} from '#app/utils/server/emitter.server';

export const handle = { viewPath: 'tipps/spiele' };

let ix = 0;

export function action() {
  const msg = {
    id: ++ix,
    type: 'success',
    text: 'Hurra, klappt für alle!',
  } satisfies NotificationMsg;
  emitter.emit('notify', msg);

  return null;
}

export default function MatchTipsRoute() {
  return (
    <div>
      <h2>Tipps für Spiel</h2>
      <div className="flex gap-x-4">
        <button onClick={() => toast('Worked for me')}>
          Send Toast for me
        </button>
        <Form method="post">
          <button>Send Toast for all</button>
        </Form>
      </div>
    </div>
  );
}

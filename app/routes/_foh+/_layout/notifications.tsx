import { useEffect } from 'react';

import { useEventSource } from 'remix-utils/sse/react';
import { toast, Toaster } from 'sonner';

import type { NotificationMsg } from '#utils/server/emitter.server';

export function Notifications() {
  const msg = useEventSource('/resources/notify', { event: 'toast' });

  useEffect(() => {
    if (msg) {
      // TODO: Zod-Scheme
      const notificationMsg = JSON.parse(msg) as NotificationMsg;
      toast(notificationMsg.text);
    }
  }, [msg]);
  return <Toaster />;
}

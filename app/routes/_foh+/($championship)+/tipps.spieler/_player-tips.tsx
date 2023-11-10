import { Item } from 'react-stately';

import { Command } from '#app/components/(ui)/command';

export const handle = { viewPath: 'tipps/spieler' };

export default function PlayerTipsRoute() {
  return (
    <div>
      <h2>Spieler - Tipps</h2>
      <Command>
        {/* Default: item.textValue not set, so use the children as textValue. We need to render children! */}
        <Item>Woohoo</Item>
        <Item>A small step for mankind ...</Item>
      </Command>
    </div>
  );
}

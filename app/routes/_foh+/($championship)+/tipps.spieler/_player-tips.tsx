import { Item } from 'react-stately';

import { Command } from '#app/components/(ui)/command';

export const handle = { viewPath: 'tipps/spieler' };

export default function PlayerTipsRoute() {
  const commands = ['Do', 'it', 'now'];
  return (
    <div>
      <h2>Spieler - Tipps</h2>
      {/* Problem jetzt: Map from incoming type (string now, better an object) to CollectionElement */}
      {/* Es gab sowas wie einen itemRenderer ...
      Der könnte die States bereitstellen (isSelected) ... */}
      {/* <Command children={commands} /> */}
    </div>
  );
}

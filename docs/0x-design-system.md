# Design System

Wiederverwendbare Komponenten werden im Ordner `#app/components/(ui)`
organisiert. Als Headless-Bibliothek wird `react-aria` aus dem Hause Adobe
eingesetzt. Soweit möglich werden Wrapper-Komponenten erstellt, die mit Hilfe
von Utilities wie `cva` und `twMerge` und den Klassen von Tailwind CSS gestyled
werden.

Solange ich noch keine praktikable Lösung gefunden habe, gibt es Ausnahmen:
zum Beispiel gibt es Features der `Link` und `NavLink` - Komponenten von
Remix, die sich nicht so einfach mit der `Link`-Komponente von React Aria
kombinieren lassen. In diesem Fall wird nur ein Design-Wrapper um die Remix-
Komponente gebaut. Um weitesgehend konsistent mit React Aria zu bleiben,
wird auf diesen Wrappern aber immer noch das logische Press-Event
implementiert. Falls die App-Entwicklung erfordert, werden weitere Features
der Aria-Komponenten mit eingebaut.

Vorlage für eine atomare Aria Komponenten (dabei denke ich, dass ich eine
`size`-Variante eher selten brauche):

```tsx
import { forwardRef } from 'react';

import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from 'react-aria-components';

import { cva, type VariantProps } from '#app/utils/tailwind';

const buttonVariants = cva({
  base: [''],
  variants: {
    variant: {
      default: '',
      primary: '',
      secondary: '',
      toolbar: '',
    },
    size: {
      default: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

interface ButtonProps
  extends AriaButtonProps,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <AriaButton
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button };
```

Ansonsten gilt: die Komponenten werden in Ordner organisiert. Obwohl ich schon
Artikel gelesen habe, die anderer Meinung sind, setze ich auf die
Strukturierung Atome-Moleküle-Organismen. Eine atomare Komponente besteht aus
genau einem ReactElement. Moleküke werden aus Atomen zusammengesetzt und sind
nicht _variabel_ im Sinne von: Wasser besteht aus zwei Wasserstoff-Atomen und
einem Sauerstoff-Atom (so ist das Textfeld eine Kombination aus einem Label
und einem Input). Organismen dahingehend sind weitergehende Strukturen die
mehrere Moleküle verwenden - zum Beispiel eine sich wiederholende User-Ansicht.
Diese Klassifizierung entspricht nicht ganz der chemischen, ist aber für mich
praktikabel.

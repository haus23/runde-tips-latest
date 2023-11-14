import { useState, type FormEvent } from 'react';
import { useLocation } from '@remix-run/react';

import {
  Dialog,
  DialogTrigger,
  ListBox,
  ListBoxItem,
  Modal,
  ModalOverlay,
  Text,
} from 'react-aria-components';

import { useChampionship } from '#app/utils/foh/use-championship';
import { useChampionships } from '#app/utils/foh/use-championships';
import { useViewSegment } from '#app/utils/route-handle';
import { cx } from '#app/utils/tailwind';

import { Button } from './(ui)/button';
import { TextField } from './(ui)/text-field';
import { Icon } from './icon';

export function ChampionshipSelect() {
  const { search } = useLocation();

  const championships = useChampionships();
  const current = useChampionship();
  const viewSegment = useViewSegment();

  const [isOpen, setIsOpenState] = useState(false);

  function setIsOpen(open: boolean) {
    setIsOpenState(open);
    if (!open) {
      setFilteredChampionships(championships);
    }
  }

  const [filteredChampionships, setFilteredChampionships] =
    useState(championships);

  function handleFilterChange(ev: FormEvent<HTMLInputElement>) {
    const filter = ev.currentTarget.value;
    setFilteredChampionships(
      championships.filter((c) =>
        c.name.toLocaleLowerCase('de').includes(filter.toLocaleLowerCase('de')),
      ),
    );
  }

  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button variant="toolbar" aria-label="Öffne Turnierauswahl">
        <div className="flex items-center gap-x-2">
          <Icon name="search" />
          <span className="hidden sm:block">Turnier</span>
        </div>
      </Button>
      <ModalOverlay className="fixed inset-0 backdrop-blur-sm" isDismissable>
        <Modal className="fixed inset-4 bottom-auto mx-auto max-w-xl rounded-md bg-white shadow-md">
          <Dialog>
            <TextField
              defaultValue=""
              autoFocus
              label="Turnierfilter"
              labelHidden
              placeholder="Turnier"
              className="mt-0 border-0 px-6 py-2.5 font-semibold sm:text-base"
              onInput={handleFilterChange}
            />
            <ListBox
              aria-label="Wähle ein Turnier"
              items={filteredChampionships}
              className="border-t p-2"
              renderEmptyState={() => (
                <span className="px-4 py-2">Kein Turnier gefunden.</span>
              )}
            >
              {(championship) => {
                const championshipSegment =
                  championship.slug === championships[0]?.slug
                    ? ''
                    : championship.slug;
                const pathname =
                  `/${[championshipSegment, viewSegment]
                    .filter(Boolean)
                    .join('/')}` + search;

                return (
                  <ListBoxItem
                    href={pathname}
                    className={cx(
                      'flex cursor-default select-none items-center justify-between rounded-md px-4 py-2 font-semibold data-[focused]:bg-stone-200',
                    )}
                    textValue={championship.name}
                  >
                    <Text slot="label">{championship.name}</Text>
                    {current.slug === championship.slug && (
                      <Icon name="check" />
                    )}
                  </ListBoxItem>
                );
              }}
            </ListBox>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}

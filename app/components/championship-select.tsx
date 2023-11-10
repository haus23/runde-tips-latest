import { useState, type FormEvent } from 'react';
import { useLocation, useNavigate, useRevalidator } from '@remix-run/react';

import {
  Dialog,
  DialogTrigger,
  Menu,
  MenuItem,
  Modal,
  ModalOverlay,
  Text,
  type Key,
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
  const navigate = useNavigate();
  const revalidator = useRevalidator();

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

  function handleSelection(slug: Key) {
    setIsOpen(false);
    const championshipSegment = slug === championships[0]?.slug ? '' : slug;
    revalidator.revalidate();
    navigate(
      {
        pathname: `/${[championshipSegment, viewSegment]
          .filter(Boolean)
          .join('/')}`,
        search,
      },
      { unstable_viewTransition: true },
    );
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
            <Menu
              aria-label="Wähle ein Turnier"
              selectionMode="single"
              disallowEmptySelection
              items={filteredChampionships}
              defaultSelectedKeys={[current.slug]}
              className="border-t p-2"
              onAction={handleSelection}
            >
              {(championship) => (
                <MenuItem
                  className={cx(
                    'flex cursor-default select-none items-center justify-between rounded-md px-4 py-2 font-semibold data-[focused]:bg-stone-200',
                  )}
                  id={championship.slug}
                  textValue={championship.name}
                >
                  {({ isSelected }) => (
                    <>
                      <Text slot="label">{championship.name}</Text>
                      {isSelected && <Icon name="check" />}
                    </>
                  )}
                </MenuItem>
              )}
            </Menu>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}

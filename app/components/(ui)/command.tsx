import { useSingleSelectListState, type SelectProps } from 'react-stately';

interface CommandProps<T extends object> extends SelectProps<T> {}

export function Command<T extends object>({ children }: CommandProps<T>) {
  const {
    collection,
    selectedItem,
    selectedKey,
    selectionManager,
    setSelectedKey,
  } = useSingleSelectListState({ children });

  return (
    <div>
      {[...collection].map((item) => (
        <div>{item.textValue}</div>
      ))}
    </div>
  );
}

import {
  useSingleSelectListState,
  type SingleSelectListProps,
} from 'react-stately';

interface CommandProps<T extends object> extends SingleSelectListProps<T> {}

export function Command<T extends object>({
  children,
  items,
}: CommandProps<T>) {
  // Map items[T] to CollectionItems<T>
  const {
    collection,
    selectedItem,
    selectedKey,
    selectionManager,
    setSelectedKey,
  } = useSingleSelectListState({ children, items });

  return (
    <div>
      {[...collection].map((item) => (
        <div key={item.key}>{item.textValue}</div>
      ))}
    </div>
  );
}

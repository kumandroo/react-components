import * as React from 'react';

import { UnselectedItem } from './UnselectedItem';
import { SelectedItem } from './SelectedItem';

type Item = {
  key: string;
  text: string;
};

type Props = {
  selectedItems: Item[];
  candidateItems: Item[];
  setSelectedItems: (items: Item[]) => void;
};

export const ToggleableDndList: React.FC<Props> = ({
  selectedItems,
  candidateItems,
  setSelectedItems,
}) => {
  const moveItem = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragItem = selectedItems[dragIndex];

      const newSelectedItems = [...selectedItems];
      newSelectedItems.splice(dragIndex, 1);
      newSelectedItems.splice(hoverIndex, 0, dragItem);
      setSelectedItems(newSelectedItems);
    },
    [selectedItems]
  );

  const unselect = (itemToUnselect: Item) =>
    setSelectedItems(
      selectedItems.filter(item => item.key !== itemToUnselect.key)
    );
  const select = (itemToSelect: Item) =>
    setSelectedItems([...selectedItems, itemToSelect]);

  const unselectedItems = candidateItems.filter(
    item => !selectedItems.find(i => i.key === item.key)
  );

  return (
    <div>
      {selectedItems.map((item, idx) => (
        <SelectedItem
          key={item.key}
          text={item.text}
          index={idx}
          id={item}
          moveItem={moveItem}
          toggle={() => unselect(item)}
        />
      ))}
      {unselectedItems.map(item => (
        <UnselectedItem
          key={item.key}
          text={item.text}
          toggle={() => select(item)}
        />
      ))}
    </div>
  );
};

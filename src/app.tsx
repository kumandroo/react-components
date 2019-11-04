import * as React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { ToggleableDndList } from './ToggleableDndList/ToggleableDndList';
import { Header } from 'semantic-ui-react';

export const App = () => {
  const candidates = [
    {
      key: '1',
      text: 'one',
    },
    {
      key: '2',
      text: 'two',
    },
    {
      key: '3',
      text: 'three',
    },
    {
      key: '4',
      text: 'four',
    },
    {
      key: '5',
      text: 'five',
    },
    {
      key: '6',
      text: 'six',
    },
  ];

  const [items, setItems] = React.useState([
    {
      key: '1',
      text: 'one',
    },
    {
      key: '2',
      text: 'two',
    },
    {
      key: '3',
      text: 'three',
    },
  ]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Header>Show Columns</Header>
      <ToggleableDndList
        selectedItems={items}
        setSelectedItems={setItems}
        candidateItems={candidates}
      />
    </DndProvider>
  );
};

import * as React from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { Form } from 'semantic-ui-react';

import { XYCoord } from 'dnd-core';

const style = {
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: '#dcdde1',
  cursor: 'move',
};

export interface SelectedItemProps {
  id: any;
  text: string;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  toggle: () => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const DragItemType = 'selected-item';

// SelectedItem is a toggleable, drag-and-droppable list item.
// Reference: http://react-dnd.github.io/react-dnd/examples/sortable/simple; code was adapted from this example.
export const SelectedItem: React.FC<SelectedItemProps> = ({
  id,
  text,
  index,
  moveItem,
  toggle,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: DragItemType,
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current!.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveItem(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: DragItemType, id, index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div ref={ref} style={{ ...style, opacity }}>
      <Form.Checkbox label={text} checked={true} onChange={toggle} />
    </div>
  );
};

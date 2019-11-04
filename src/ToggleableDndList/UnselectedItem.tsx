import * as React from 'react';
import { Form } from 'semantic-ui-react';

const style = {
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
};

export interface UnselectedItemProps {
  text: string;
  toggle: () => void;
}

export const UnselectedItem: React.FC<UnselectedItemProps> = ({
  text,
  toggle,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} style={style}>
      <Form.Checkbox label={text} checked={false} onChange={toggle} />
    </div>
  );
};

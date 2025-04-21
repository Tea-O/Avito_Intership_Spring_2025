import { RFieldProps } from './types.ts';

export const RField = (props: RFieldProps) => {
  return (
    <div>
      <p>{props.label}</p>
      {props.children}
    </div>
  );
};

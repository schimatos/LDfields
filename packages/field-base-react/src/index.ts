import type { LDfieldBase } from '@ldfields/field-base';

/**
 * A base interface for LDfield components in React.
 */
export interface LDfieldBaseReact<
  Props extends { [key: string]: string; },
  ExtraData = never
> extends LDfieldBase<JSX.Element, Props, ExtraData> {}

import type { LDfieldBase } from '../src/field-base';

/**
 * A generic field can be instantiated with any
 * fieldFor string and act on that field.
 */
export type GenericField<
  T,
  Props extends { [key: string]: string | undefined;},
  ExtraData = null
> = new (field: keyof Props & string) => LDfieldBase<T, Props, ExtraData>;

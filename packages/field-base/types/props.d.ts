import type { Constraints } from './constraints';

/**
 * The props that are required for the field component of the class
 */
export interface FieldProps<
  Props extends { [key: string]: string | undefined },
  ExtraData = never,
  T extends Partial<Props> = Partial<Props>
> {
  /**
   * The value props from the field
   */
  props: Props;
  /**
   * Any constraints that apply to the field
   * (pattern, in constraint etc.)
   */
  constraints?: Constraints<Props>;
  // Long term this should be something like Partial<Props>
  // however this is not possible at present because
  // Props extends { value: string } could be strictly instansiated
  // as { value: 'setValue' } so a type error is thrown. So cannot
  // be improved until something like this https://github.com/microsoft/TypeScript/issues/9252
  // becomes part of typescript.
  /**
   * The emitted change in value
   */
  onChange: (e: T) => void;
  /**
   * Additional data that is needed in order to display the field
   * e.g. a queryEngine to search for results
   */
  data?: ExtraData;
}

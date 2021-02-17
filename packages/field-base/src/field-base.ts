import type { Constraints, FieldProps } from '../types';

/**
 * Abstract class to define the interface for
 * and LDfield input
 */
export abstract class LDfieldBase<
  Rendered,
  Props extends { [key: string]: string | undefined },
  ExtraData = never
> {
  /**
   * The priority level the field has to be
   * displayed
   */
  priority = 0;

  /**
   * The components the field is capable of
   * modifying
   */
  abstract modifies: (keyof Props & string)[];

  /**
   * The compoenets the field is *designed* to
   * modify.
   *
   * In most cases this is the *same* as the
   * value of modifies, but there are instances,
   * e.g. when only a subset of field values can be modified,
   * where this is not the case.
   *
   * The value of targets *MUST* be a subset of the values
   * in modifies.
   * TODO: Use types to express the above condition
   */
  targets?: (keyof Props & string)[] | undefined;

  /**
   * @param priority The priority level with which
   * the given field is displayed.
   */
  constructor(priority?: number) {
    if (priority !== undefined) {
      this.priority = priority;
    }
  }

  get fieldTargets(): (keyof Props & string)[] {
    return this.targets ?? this.modifies;
  }

  /**
   * Whether the field supports editing for the current
   * entry.
   * @param props The props that this field would be given when rendered
   * @param constraints The constraints that are applied to the field
   * @param data Any additional data that the field requires e.g. queryEngine etc.
   * @return Whether or not the current configuration is supported by the field
   */
  abstract supports(props: Partial<Props>, constraints?: Constraints<Props>, data?: ExtraData):
    boolean;

  /**
   * Used to render the field
   */
  abstract Field(props: FieldProps<Props, ExtraData>): Rendered;
}

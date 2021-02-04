/**
 * Abstract class to define the interface for
 * and LDField input
 */
export abstract class LDfieldBase<Rendered, Props extends { [key: string]: string }> {
  /**
   * The priority level the field has to be
   * displayed
   */
  priority = 0;
  /**
   * The components the field is capable of
   * modifying
   */
  abstract modifies: string[];
  /**
   * Whether the field supports editing for the current
   * entry
   */
  abstract supports(props: Props, constraints?: Constraints<Props>): boolean;
  /**
   * Used to render the field
   */
  abstract Field(props: {
    props: Props;
    constraints?: Constraints<keyof Props>;
    onChange: (e: Props) => void;
  }): Rendered;
}

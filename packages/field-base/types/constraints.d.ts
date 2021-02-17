/**
 * Constraints that can be applied to an
 * LDfield.
 */
export interface Constraints<
  Props extends Record<string, string | undefined> = Record<string, string | undefined>,
  FieldConstraints extends Record<string, any> = Record<string, any>
> {
  /**
   * Restrictions that apply globally
   */
  restrictions?: { [K in keyof Props & string]?: FieldConstraints };
  /**
   * Field must satisfy *one* of the combinations
   */
  combinations?: { [K in keyof Props & string]?: FieldConstraints }[];
}

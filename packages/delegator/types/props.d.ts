/**
 * Constraints that can be applied
 */
export interface Constraints<
  Keys extends string = string,
  FieldConstraints extends Record<string, any> = Record<string, any>
> {
  /**
   * Restrictions that apply globally
   */
  restrictions?: { [K in Keys]?: FieldConstraints };
  /**
   * Field must satisfy *one* of the combinations
   */
  combinations?: readonly { [K in Keys]?: FieldConstraints }[];
}

/**
 * Set of conditions that can be applied
 * to a field setting
 */

/**
 * Requires the existance of another field
 * in order to appear
 */
export interface ExistanceCondition<T extends string = string> {
  readonly type: 'existance';
  readonly fieldFor: T;
}

/**
 * Requires that another field not exists
 * in order to appear
 */
export interface NonExistanceCondition<T extends string = string> {
  readonly type: 'nonexistance';
  readonly fieldFor: T;
}

/**
 * Requires that another field has one of
 * the values specified in the options
 */
export interface InCondition<T extends string = string> {
  readonly type: 'in';
  readonly fieldFor: T;
  readonly options: Record<string, boolean>;
}

/**
 * Non static conditions (i.e. not strictly true/false)
 */
export type LDfieldConditionNonStatic<T extends string = string> =
  | NonExistanceCondition<T>
  | ExistanceCondition<T>
  | InCondition<T>;

/**
 * Set of conditions that must *all* hold
 * true in order for the allowed/requried
 * condition to be met
 *
 * Alternatively boolean value can be set
 * for always true/false
 */
export type LDfieldCondition<T extends string = string> =
  | LDfieldConditionNonStatic<T>[]
  | boolean;

export interface LDfieldConditions<T extends string = string>{
  /**
   * When these conditions hold true the
   * field is *allowed* to occur
   */
  readonly allowed: LDfieldCondition<T>;
  /**
   * When these conditions hold true the
   * field *must* to occur
   */
  readonly required: LDfieldCondition<T>;
}

/**
 * Condition variant for a field
 */
export type ConditionType = keyof LDfieldConditions;

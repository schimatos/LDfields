import type { ConditionType, LDfieldConditionNonStatic } from '../types';

/**
 * Runs the check for a single conditional entry
 */
export function singleCheck<T extends string>(
  { fieldFor, ...condition }: LDfieldConditionNonStatic<T>,
  props: Record<T, string>,
  type: ConditionType,
  check: (fieldFor: T, type: ConditionType) => boolean,
) {
  switch (condition.type) {
    case 'in':
      // Value is in a set of values *and* the field is rendered
      return condition.options[props[fieldFor]] && check(fieldFor, type);
    case 'existance':
      // Field exists and field conditions are satisfied
      return props[fieldFor] !== undefined && check(fieldFor, type);
    case 'nonexistance':
      // Field does not exist and field conditions are not satisfied
      return props[fieldFor] === undefined || !check(fieldFor, type);
    default: {
      const type: never = condition;
      throw new Error(`Invalid condition type: ${(condition as any).type}`);
    }
  }
}

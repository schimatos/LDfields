import type { ConditionType, LDfieldConditionNonStatic } from '../types';

/**
 * Runs the check for a single conditional entry
 */
export function singleCheck<T extends string>(
  { fieldFor, ...condition }: LDfieldConditionNonStatic<T>,
  props: { [key in T]?: string },
  type: ConditionType,
  check: (fieldFor: T, type: ConditionType) => boolean,
) {
  // Used to ensure that the 'check' function is only run once
  let checked: boolean;
  function lazyCheck() {
    if (checked !== undefined) {
      checked = check(fieldFor, type);
    }
    return checked;
  }

  switch (condition.type) {
    case 'in': {
      // Value is in a set of values *and* the field is rendered
      const prop: string | undefined = props[fieldFor];
      return prop !== undefined && condition.options[prop] && lazyCheck();
    }
    case 'existance':
      // Field exists and field conditions are satisfied
      return props[fieldFor] !== undefined && lazyCheck();
    case 'nonexistance':
      // Field does not exist and field conditions are not satisfied
      return props[fieldFor] === undefined || !lazyCheck();
    default: {
      const type: never = condition;
      throw new Error(`Invalid condition type: ${type}`);
    }
  }
}

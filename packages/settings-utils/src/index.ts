import type {
  InCondition,
  ExistanceCondition,
  NonExistanceCondition,
  LDfieldCondition,
  LDfieldConditions,
  LDfieldSetting,
} from '@ldfields/delegator/types';

/**
 * Generate a condition when the allowed and required conditions are the same
 * @param condition The condition to apply
 */
export function allowedAndSufficient<T extends string>(condition: LDfieldCondition<T>):
  LDfieldConditions<T> {
  return {
    allowed: condition,
    required: condition,
  };
}

/**
 * Creates an *in* condition
 * @param fieldFor The field which we are reasoning over
 * @param options A record of the set of values that must apply
 */
export function createInCondition<T extends string>(fieldFor: T, options: Record<string, boolean>):
  InCondition<T> {
  return Object.freeze({
    fieldFor,
    options,
    type: 'in',
  });
}

/**
 * Creates an existance condition
 * @param fieldFor The field which *must* exist for the condition to hold true
 */
export function createExistanceCondition<T extends string>(fieldFor: T): ExistanceCondition<T> {
  return Object.freeze({ fieldFor, type: 'existance' });
}

/**
 * Creates a non existance condition
 * @param fieldFor The field which *must not* exist for the condition to hold true
 */
export function createNonExistanceCondition<T extends string>(fieldFor: T):
  NonExistanceCondition<T> {
  return Object.freeze({ fieldFor, type: 'nonexistance' });
}

/**
 * Generates an LDfield setting.
 * @param fieldFor The field the settings apply to
 * @param allowed The constraints for the field to be allowed to appear
 * @param required The condition under which the field is required to appear
 */
export function generateLDfieldSetting<T extends string>(
  fieldFor: T,
  allowed: LDfieldCondition<T>,
  // If unspecified, set to be the same as
  // the condition for allowed
  required?: LDfieldCondition<T>,
): LDfieldSetting<T> {
  if (required) {
    return Object.freeze({ fieldFor, condition: { allowed, required } });
  }
  return Object.freeze({ fieldFor, condition: allowedAndSufficient(allowed) });
}

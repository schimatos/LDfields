import {
  LDfieldSettingsRecord,
  LDfieldSettings,
  LDfieldConditionNonStatic
} from './types';

export function singleCheck<T extends string>(
  { fieldFor, ...condition }: LDfieldConditionNonStatic<T>,
  props: Record<T, string>,
  restrictionType: 'allowed' | 'required',
  check: (fieldFor: T, restrictionType: 'allowed' | 'required') => boolean
) {
  switch (condition.type) {
    case 'existance':
      // Field exists and field conditions are satisfied
      return typeof props[fieldFor] !== undefined && check(fieldFor, restrictionType);
    case 'nonexistance':
      // Field does not exist and field conditions are not satisfied
      return typeof props[fieldFor] == undefined || !check(fieldFor, restrictionType);
    case 'in':
      // Value is in a set of values *and* the field is rendered
      return condition.options[props[fieldFor]] && check(fieldFor, restrictionType);
    default: {
      const type: never = condition;
      throw new Error(`Invalid condition type: ${condition}`);
    }
  }
}

/**
 * Get the conditions that the field configuration
 * must satisfy.
 * @param settings The current LDfield settings
 * @param settingsRecord The current LDfield settings as a record
 * @param props The props to evaluate against
 * @return A list of the required fields (and order in which they)
 * should appear *and* a record of the *allowed* fields
 */
export function getConditions<T extends string>(
  settings: LDfieldSettings<T>,
  settingsRecord: LDfieldSettingsRecord<T>,
  props: Record<T, string>
) {
  /**
   * Cache to record whether each allowed/required
   * condition is met
   */
  const cache: Record<'allowed' | 'required', { [K in T]?: boolean }>
    = { allowed: {}, required: {} }

  /**
   * Checks whether an allowed/required condition holds true
   */
  function check(fieldFor: T, restrictionType: 'allowed' | 'required'): boolean {
    const cachedValue = cache[restrictionType][fieldFor];

    if (fieldFor in cache[restrictionType]) {
      if (typeof cachedValue === 'boolean') {
        return cachedValue;
      } else {
        throw new Error(`Circular condition involving ${fieldFor}`);
      }
    }

    /**
     * Set the cached value to undefined so that the
     * key is now in the object. This is to allow for
     * detection of circular conditions
     */
    cache[restrictionType][fieldFor] = undefined;

    const conditions = settingsRecord[fieldFor][restrictionType];
    const satisfied = typeof conditions === 'boolean' ?
      conditions :
      conditions.every(condition => singleCheck(condition, props, restrictionType, check))
    return cache[restrictionType][fieldFor] = satisfied;
  }

  /**
   * The fields that *must* be dispayed with the current
   * settings and props
   */
  const required: T[] = [];
  for (const { fieldFor } of settings) {
    if (check(fieldFor, 'allowed') && check(fieldFor, 'required')) {
      required.push(fieldFor);
    }
  }

  return { required, allowed: cache.allowed }
}

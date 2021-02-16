import { singleCheck } from './single-check';
import type {
  LDfieldSettingsRecord,
  LDfieldSettings,
  ConditionType,
} from '../types';

/**
 * Get the conditions that the field configuration
 * must satisfy.
 * @param settings The current LDfield settings
 * @param settingsRecord The current LDfield settings as a record
 * @param props The props to evaluate against
 * @return A list of the required fields (and order in which they)
 * should appear *and* a record of the *allowed* fields
 */
export function getConditions<Props extends { [key: string]: string }>(
  settings: LDfieldSettings<keyof Props & string>,
  settingsRecord: Partial<LDfieldSettingsRecord<keyof Props & string>>,
  props: Partial<Record<keyof Props & string, string>>,
) {
  /**
   * Cache to record whether each allowed/required
   * condition is met
   */
  const cache: Record<ConditionType, { [K in keyof Props & string]?: boolean }> = {
    allowed: {}, required: {},
  };

  /**
   * Checks whether an allowed/required condition holds true
   */
  function check(fieldFor: keyof Props & string, type: ConditionType): boolean {
    if (fieldFor in cache[type]) {
      const cachedValue = cache[type][fieldFor];

      // Reduce evaluation by returning cached
      // value if present
      if (typeof cachedValue === 'boolean') {
        return cachedValue;
      }
      // Throw new error if nested inside check for
      // the same field.
      const erroneous: string[] = [];
      for (const field in cache[type]) {
        if (cache[type][field] === undefined) {
          erroneous.push(field);
        }
      }
      throw new Error(`Circular condition involving: ${erroneous.join(', ')}`);
    }

    /**
     * Set the cached value to undefined so that the
     * key is now in the object. This is to allow for
     * detection of circular conditions.
     */
    cache[type][fieldFor] = undefined;

    const conditions = settingsRecord[fieldFor]?.[type];
    if (conditions === undefined) {
      throw new Error(`field '${fieldFor}' declared in array settings but not record settings`);
    }

    const satisfied = typeof conditions === 'boolean'
      ? conditions
      : conditions.every((condition) => singleCheck(condition, props, type, check));
    cache[type][fieldFor] = satisfied;
    return satisfied;
  }

  /**
   * The fields that *must* be dispayed with the current
   * settings and props
   */
  const required: (keyof Props & string)[] = [];
  for (const { fieldFor } of settings) {
    if (check(fieldFor, 'allowed') && check(fieldFor, 'required')) {
      required.push(fieldFor);
    }
  }

  return { required, allowed: cache.allowed };
}

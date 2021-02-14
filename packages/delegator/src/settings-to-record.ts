import type { LDfieldSettings, LDfieldSettingsRecord } from '../types';

/**
 * Generates a settings record based on a settings object
 */
export function settingsToRecord<T extends string = string>(settings: LDfieldSettings<T>):
Partial<LDfieldSettingsRecord<T>> {
  const record: Partial<LDfieldSettingsRecord<T>> = {};
  for (const setting of settings) {
    record[setting.fieldFor] = setting.condition;
  }
  return record;
}

import type { LDfieldConditions } from './conditions';

/**
 * LDfield setting for individual field
 * The generic parameter T is the union type of all field props
 */
export interface LDfieldSetting<T extends string = string> {
  /**
   * The field which the setting applies to
   */
  fieldFor: T;
  /**
   * The conditions under which the field is
   * to be allowed/required
   */
  condition: LDfieldConditions<T>;
}

/**
 * The type of a settings object
 * The generic parameter T is the union type of all field props
 */
export type LDfieldSettings<T extends string = string> = readonly LDfieldSetting<T>[];

/**
 * The settings object as a record
 * The generic parameter T is the union type of all field props
 */
export type LDfieldSettingsRecord<T extends string = string> = Record<T, LDfieldConditions<T>>;

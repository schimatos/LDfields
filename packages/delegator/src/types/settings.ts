import { LDfieldConditions } from './conditions';

/**
 * LDfield setting for individual field
 */
export interface LDfieldSetting<T extends string = string> {
  fieldFor: T;
  condition: LDfieldConditions<T>;
}

/**
 * The type of a settings object
 */
export type LDfieldSettings<T extends string = string> = readonly LDfieldSetting<T>[];

/**
 * The settings object as a record
 */
export type LDfieldSettingsRecord<T extends string = string> = Record<T, LDfieldConditions<T>>;

import type { LDfieldBase } from '@ldfields/field-base';
import type { GenericField } from '@ldfields/field-base/types';
import type { LDfieldSettings } from '../types';

/**
 * Instantiate all generic fields with all values from the settings
 * @param settings Standard ldfield settings
 * @param genericFields Generic ldfields
 */
export function instantiateGenericFields<
  T,
  Props extends { [key: string]: string },
  ExtraData = never
>(
  settings: LDfieldSettings<keyof Props & string>,
  genericFields?: GenericField<T, Props, ExtraData>[],
): LDfieldBase<T, Props, ExtraData>[] {
  if (!genericFields) {
    return [] as LDfieldBase<T, Props, ExtraData>[];
  }
  const fields: LDfieldBase<T, Props, ExtraData>[] = [];
  for (const GenericField of genericFields) {
    for (const { fieldFor } of settings) {
      fields.push(new GenericField(fieldFor));
    }
  }
  return fields;
}

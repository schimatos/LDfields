import type { LDfieldBase } from '@ldfields/field-base';
import type { GenericField } from '@ldfields/field-base/types';
import type { LDfieldSettings } from '../types';
import { instantiateGenericFields } from './instantiate-generic-fields';

/**
 * Gets all fields (sorted) for the LDfield delegator
 * @param settings The LDfield settings
 * @param fields The standard fields
 * @param genericFields The generic fields
 */
export function getSortedFields<T, Props extends { [key: string]: string }, ExtraData = never>(
  settings: LDfieldSettings<keyof Props & string>,
  fields?: LDfieldBase<T, Props, ExtraData>[],
  genericFields?: GenericField<T, Props, ExtraData>[],
): LDfieldBase<T, Props, ExtraData>[] {
  return (fields ? [
    ...fields,
    ...instantiateGenericFields<T, Props, ExtraData>(settings, genericFields),
  ] : instantiateGenericFields<T, Props, ExtraData>(settings, genericFields)).sort(
    (a, b) => b.priority - a.priority,
  );
}

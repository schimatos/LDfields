import type { LDfieldBase } from '@ldfields/field-base';
import type { GenericField } from '@ldfields/field-base/types';
import type { LDfieldSettings, LDfieldSettingsRecord } from '../types';
import { InputDelegator } from './input-delegator';
import { getSortedFields } from './get-sorted-fields';
import { settingsToRecord } from './settings-to-record';

/**
 * Factory that produces input delegators.
 * It pre computes the sorted fields and settings
 * record.
 */
export function InputDelegatorFactory<
  T,
  Props extends { [key: string]: string },
  ExtraData = never
>(
  settings: LDfieldSettings<keyof Props & string>,
  fields: LDfieldBase<T, Props, ExtraData>[],
  genericFields?: GenericField<T, Props, ExtraData>[],
  multiControl: boolean = false,
): new () => InputDelegator<T, Props, ExtraData> {
  const sortedFields = getSortedFields(settings, fields, genericFields);
  const settingsRecord = settingsToRecord(settings);
  return class {
    constructor(
      _settings?: LDfieldSettings<keyof Props & string>,
      _fields?: LDfieldBase<T, Props, ExtraData>[],
      _genericFields?: GenericField<T, Props, ExtraData>[],
      _multiControl?: boolean,
      _settingsRecord?: Partial<LDfieldSettingsRecord<keyof Props & string>>,
      _sortedFields?: LDfieldBase<T, Props, ExtraData>[],
    ) {
      return new InputDelegator(
        _settings ?? settings,
        _fields ?? fields,
        _genericFields ?? genericFields,
        _multiControl ?? multiControl,
        _settingsRecord ?? settingsRecord,
        _sortedFields ?? sortedFields,
      );
    }
  // TODO [Future]: Use cleaner solution than type casting here
  } as unknown as new () => InputDelegator<T, Props, ExtraData>;
}

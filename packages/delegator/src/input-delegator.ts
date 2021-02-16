import type { LDfieldBase } from '@ldfields/field-base';
import type { GenericField, Constraints } from '@ldfields/field-base/types';
import type { LDfieldSettings, LDfieldSettingsRecord } from '../types';
import { settingsToRecord } from './settings-to-record';
import { delegate } from './delegate';
import { getSortedFields } from './get-sorted-fields';
import { instantiateGenericFields } from './instantiate-generic-fields';

/**
 * Delegates the input selections
 */
export class InputDelegator<
  T,
  Props extends { [key: string]: string }, ExtraData = never,
  FieldConstraints extends Record<string, any> = Record<string, any>
> {
  private lastDelegation: LDfieldBase<T, Props, ExtraData>[] = [];

  private fields: LDfieldBase<T, Props, ExtraData>[];

  private settingsRecord: Partial<LDfieldSettingsRecord<keyof Props & string>>;

  /**
   * @param settings The settings used for delegation
   * @param fields The fields to be delegated
   * @param genericFields The generic fields to be delegated
   * @param multiControl Whether multiple fields can control the same prop entry
   * @param settingsRecord Pre computed settings record. Used to prevent duplicate
   * calculation when the input delegator is produced by a factory.
   * @param sortedFields Pre computed sorted fields. Used to prevent duplicate
   * calculation when the input delegator is produced by a factory.
   */
  constructor(
    private settings: LDfieldSettings<keyof Props & string>,
    fields?: LDfieldBase<T, Props>[],
    genericFields?: GenericField<T, Props, ExtraData>[],
    private multiControl: boolean = false,
    settingsRecord?: Partial<LDfieldSettingsRecord<keyof Props & string>>,
    sortedFields?: LDfieldBase<T, Props, ExtraData>[],
  ) {
    // TODO [Future Work]: Make these operations lazy
    this.fields = sortedFields
      ?? getSortedFields<T, Props, ExtraData>(settings, fields, genericFields);
    this.settingsRecord = settingsRecord ?? settingsToRecord(settings);
  }

  /**
   * Used to register additional fields to the delegator
   * @param fields Base ldfield fields
   */
  register(...fields: LDfieldBase<T, Props, ExtraData>[]) {
    this.fields = [...this.fields, ...fields].sort(
      (a, b) => b.priority - a.priority,
    );
  }

  /**
   * Used to register additional generic fields to the delegator
   * @param genericFields Base ldfield fields
   */
  registerGeneric(...genericFields: GenericField<T, Props, ExtraData>[]) {
    this.fields = [...this.fields, ...instantiateGenericFields(this.settings, genericFields)].sort(
      (a, b) => b.priority - a.priority,
    );
  }

  delegate = (
    props: Partial<Props>,
    constraints?: Constraints<Props, FieldConstraints>,
    data?: ExtraData,
  ) => {
    const { selections: delegation, modifiable, required } = delegate<
        Props,
        T,
        ExtraData,
        FieldConstraints
      >(
        props,
        constraints,
        this.fields,
        this.multiControl,
        this.settings,
        this.settingsRecord,
        data,
      );
    // Used to flag whether the delegation has changed from
    // the previous call
    let delegationChange = false;
    if (
      // Testing for change from previous delegation
      this.lastDelegation.length !== delegation.length
      || !this.lastDelegation.every((elem, i) => elem === delegation[i])
    ) {
      delegationChange = true;
      this.lastDelegation = delegation;
    }
    // If it is same as before, return the previous object, this
    // is to avoid unecessary updates triggered by useReducer in React
    return {
      delegation: this.lastDelegation, modifiable, required, delegationChange,
    };
  };
}

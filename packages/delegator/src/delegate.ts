import type { Constraints } from '@ldfields/field-base/types';
import type { LDfieldBase } from '@ldfields/field-base';
import type { LDfieldSettings, LDfieldSettingsRecord } from '../types';
import { getConditions } from './check-conditions';

/**
 * Delegates the fields which are to be displayed
 */
export function delegate<
  Props extends { [key: string]: string | undefined},
  Rendered,
  ExtraData,
  FieldConstraints extends Record<string, any> = Record<string, any>
>(
  props: Partial<Props>,
  constraints: Constraints<Props, FieldConstraints> = {},
  fields: LDfieldBase<Rendered, Props, ExtraData>[],
  multiControl: boolean,
  settings: LDfieldSettings<keyof Props & string>,
  settingsRecord: Partial<LDfieldSettingsRecord<keyof Props & string>>,
  data?: ExtraData,
) {
  const { allowed, required } = getConditions<Props>(settings, settingsRecord, props);
  // Fields that already have a controller selected
  const taken: { [key in keyof Props & string]?: true } = {};
  const selections: LDfieldBase<Rendered, Props, ExtraData>[] = [];

  for (const fieldFor of required) {
    // Make sure that the field is not
    // already covered by a component that
    // edits mutliple entries.
    if (!taken[fieldFor]) {
      const selection = fields.find(
        (field) => (
          // Doesn't modify an fields that it is not allowed to
          field.modifies.every(
            (modifies) => allowed[modifies] && (multiControl || !taken[modifies]),
          )
          // Can modify the target field
          && field.fieldTargets.includes(fieldFor)
          // Supports the given props and constraints
          && field.supports(props, constraints, data)
        ),
      );
      if (selection) {
        // TODO: Test whether selection.modifies or selection.fieldTargets
        // is most apprioriate here
        for (const modifier of selection.fieldTargets) {
          taken[modifier] = true;
        }
        selections.push(selection);
      } else {
        throw new Error(
          `No field selection available when assigning '${fieldFor}'`,
        );
      }
    }
  }

  return { selections, modifiable: taken, required };
}

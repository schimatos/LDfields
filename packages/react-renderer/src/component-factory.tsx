import React from 'react';
import type { LDfieldBase } from '@ldfields/field-base';
import type { FieldProps } from '@ldfields/field-base/types';

/**
 * Renders the set of components based on the delegated fields.
 * @param components The set of LDfield bases.
 */
export function ComponentFactory<
  Props extends { [key: string]: string | undefined; },
  ExtraData = never
>(
  components: LDfieldBase<JSX.Element, Props, ExtraData>[],
) {
  return ({ onChange, ...props }: FieldProps<Props, ExtraData>) => (
    <>
      {
        components.map((Field: LDfieldBase<JSX.Element, Props, ExtraData>, i: number) => (
            <Field.Field
              {...props}
              label={`${Field.fieldTargets.map(x => /[a-z]+$/i.exec(x)?.[0] ?? '').join('-')}`}
              key={i}
              onChange={(p) => onChange({ ...props.props, ...p })}
            />
        ))
      }
    </>
  );
}

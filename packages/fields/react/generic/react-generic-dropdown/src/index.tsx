import React, { useEffect } from 'react';
import { LDfieldGenericBase } from '@ldfields/generic-field-base';
import type { Constraints, FieldProps } from '@ldfields/field-base/types';
import { useState } from '@jeswr/use-state';

function fieldFactory<
  Props extends { [key: string]: string | undefined; },
  ExtraData
>(
  modifier: string,
  getIn: (constraints: Constraints<Props, Record<string, any>> | undefined) => string[],
) {
  return function Field({
    props, onChange, label, constraints,
  }: FieldProps<Props, ExtraData>) {
    // const [value, setValue] = useState<string>(props[modifier] ?? '');
    // useEffect(() => {
    //   setValue(props.value ?? '');
    // }, [props.value]);
    return (
      <>
        <select
          value={props[modifier] ?? ''}
          aria-label={label}
          onChange={(e) => {
            // TODO [FUTURE]: Remove type casting
            console.log('onChange triggered')
            onChange({ [modifier]: e.target.value } as Partial<Props>)
          }}
          // onBlur={() => {
          //   // TODO [Future]: Remove type casting
          //   onChange({ [modifier]: value } as Partial<Props>);
          // }}
        >
          {getIn(constraints).map((opt) => (
            <option value={opt} key={opt}>{opt}</option>
          ))}
        </select>
      </>
    );
  };
}

export class GenericDropdownInput<
  Props extends { [key: string]: string | undefined; },
  ExtraData = never,

> extends LDfieldGenericBase<JSX.Element, Props> {
  priority = 60;

  in(constraints: Constraints<Props, Record<string, any>> | undefined) {
    return constraints?.restrictions?.[this.modifies[0]]?.in;
  }

  /**
   * Checks whether the relevant in constraint is an array of strings
   */
  supports(props: Props, constraints: Constraints<Props, Record<string, any>>) {
    const inConstraint = this.in(constraints);
    return this.modifies.length === 1
      && Array.isArray(inConstraint)
      && inConstraint.every((elem) => typeof elem === 'string');
  }

  Field = fieldFactory<Props, ExtraData>(this.modifier, (constraints) => this.in(constraints))
}

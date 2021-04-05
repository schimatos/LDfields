import React, { useEffect } from 'react';
import { LDfieldGenericBase } from '@ldfields/generic-field-base';
import type { FieldProps } from '@ldfields/field-base/types';
import { useState } from '@jeswr/use-state';

function fieldFactory<
  Props extends { [key: string]: string | undefined; },
  ExtraData
>(modifier: string) {
  return function Field({ props, onChange, label }: FieldProps<Props, ExtraData>) {
    const [value, setValue] = useState<string>(props[modifier] ?? '');
    useEffect(() => {
      setValue(props[modifier] ?? '');
    }, [props[modifier]]);
    // console.log(value)
    return (
      <>
        <label>{label ?? (modifier ? /[a-z]*$/i.exec(modifier)?.[0] : '')}</label>
        <input
          value={value}
          aria-label={label}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onBlur={() => {
            // TODO [Future]: Remove type casting
            onChange({ [modifier]: value } as Partial<Props>);
          }}
        />
      </>
    );
  };
}

export class BasicInput<
  Props extends { [key: string]: string | undefined; },
  ExtraData = never,

> extends LDfieldGenericBase<JSX.Element, Props> {
  supports() {
    return true;
  }

  Field = fieldFactory<Props, ExtraData>(this.modifier)
}

import React, { useEffect } from 'react';
import { LDfieldGenericBase } from '@ldfields/generic-field-base';
import type { FieldProps } from '@ldfields/field-base/types';
import { useState } from '@jeswr/use-state';

export class BasicInput<
  Props extends { [key: string]: string | undefined; },
  ExtraData = never,

> extends LDfieldGenericBase<JSX.Element, Props> {
  supports() {
    return true;
  }

  Field = ({ props, onChange }: FieldProps<Props, ExtraData>) => {
    const [value, setValue] = useState<string>(props[this.modifier] ?? '');
    useEffect(() => {
      setValue(props.value ?? '');
    }, [props.value]);
    return (
      <>
        <label>{this.modifier ? /[a-z]*$/i.exec(this.modifier)?.[0] : ''}</label>
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onBlur={() => {
            // TODO [Future]: Remove type casting
            onChange({ [this.modifier]: value } as Partial<Props>);
          }}
        />
      </>
    );
  };
}

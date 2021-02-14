import React from 'react';
import type { FieldProps } from '@ldfields/field-base/types';
import { DatatypeInput } from '@ldfields/datatype-field-base';
// TODO: Use typed on2ts values here
import xsd from '@ontologies/xsd';

// TODO: Finish up this
export class GenericDatatypeField<
  Props extends { [key: string]: string; termType: string; datatype: string; value: string; },
  ExtraData = never,
> extends DatatypeInput<JSX.Element, Props, ExtraData> {
  priority = 50;

  supportedDatatypes = {
    [xsd.integer.value]: true,
    [xsd.float.value]: true,
    [xsd.decimal.value]: true,
    [xsd.dateTime.value]: true,
  };

  // eslint-disable-next-line class-methods-use-this
  Field({ props, onChange }: FieldProps<Props>) {
    // TODO: Bring in min count, min length etc.
    return (
      <input
        type={props.datatype === xsd.dateTime.value ? 'dateTime' : 'number'}
        value={props.value}
        onChange={(e) => {
          onChange({ value: e.target.value });
        }}
      />
    );
  }
}

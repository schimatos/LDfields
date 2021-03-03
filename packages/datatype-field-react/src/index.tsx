import React from 'react';
import type { FieldProps } from '@ldfields/field-base/types';
import { DatatypeInput } from '@ldfields/datatype-field-base';
import supportedDatatypes from './data/supports-mapping.json';
import datatypeMapping from './data/datatype-mapping.json';

export class GenericDatatypeField<
  Props extends {
    [key: string]: string | undefined;
    termType: string | undefined; // 'Literal';
    datatype: string | undefined; // keyof typeof supportedDatatypes;
    value: string | undefined;
  },
  ExtraData = never,
> extends DatatypeInput<JSX.Element, Props, ExtraData> {
  priority = 50;

  supportedDatatypes = supportedDatatypes;

  // eslint-disable-next-line class-methods-use-this
  Field({ props: { datatype, value }, onChange }: FieldProps<Props, ExtraData>) {
    // TODO [Future]: Bring in min count, min length etc.
    if (datatype === undefined) {
      throw new Error('Datatype should be defined for the generic datatype field');
    }
    return (
      <input
        // TODO [Future]: Remove type casting here
        // @ts-ignore
        type={(datatypeMapping as Record<string, string | undefined>)[datatype]}
        value={value}
        onChange={(e) => {
          // TODO [Future]: Remove type casting here
          onChange({ value: e.target.value } as Partial<Props>);
        }}
      />
    );
  }
}

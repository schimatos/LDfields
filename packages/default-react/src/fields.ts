// import { GenericDatatypeField } from '@ldfields/react-datatype-field';
import type { Props } from '@ldfields/default-settings/types';
import type { LDfieldBase } from '@ldfields/field-base';
import { GenericDatatypeField } from '@ldfields/react-datatype-field';
import type { ExtraData } from './index';

export const fields: LDfieldBase<JSX.Element, Props, ExtraData>[] = [
  // TODO: Rename?
  new GenericDatatypeField<Props, ExtraData>(),
];

import { BasicInput } from '@ldfields/react-generic-basic-input';
import { GenericDropdownInput } from '@ldfields/react-generic-dropdown';
import type { GenericField } from '@ldfields/field-base/types';
import type { Props } from '@ldfields/default-settings/types';
import type { ExtraData } from './index';

export const genericFields: GenericField<JSX.Element, Props, ExtraData>[] = [
  BasicInput,
  GenericDropdownInput
];

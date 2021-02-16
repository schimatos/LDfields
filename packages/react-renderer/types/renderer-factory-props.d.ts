import type { LDfieldSettings } from '@ldfields/delegator/types';
import type { GenericField } from '@ldfields/field-base/types';
import type { LDfieldBase } from '@ldfields/field-base';

export interface RendererFactoryProps<
  Props extends { [key: string]: string; },
  ExtraData = never
> {
  settings: LDfieldSettings<keyof Props & string>;
  fields?: LDfieldBase<JSX.Element, Props, ExtraData>[];
  genericFields?: GenericField<JSX.Element, Props, ExtraData>[];
  /**
   * @experimental
   */
  defaultProps: Props;
}

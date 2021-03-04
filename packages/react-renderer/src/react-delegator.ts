import type { InputDelegator } from '@ldfields/delegator';
import type { Constraints } from '@ldfields/field-base/types';
import type { GetComponentOut, InitParams } from '../types';
import { ComponentFactory } from './component-factory';

export class ReactInputDelegator<
  Props extends { [key: string]: string | undefined },
  ExtraData = never
> {
  GetComponent: (
    ...[props, constraints, data]: InitParams<Props, ExtraData>
  ) => GetComponentOut<Props, ExtraData>;

  private delegator;

  private Component = ComponentFactory<Props, ExtraData>([]);

  constructor(
    InputDelegator: new () => InputDelegator<
      JSX.Element,
      Props,
      ExtraData,
      Constraints<Props>
    >,
  ) {
    this.delegator = new InputDelegator().delegate;

    this.GetComponent = (
      ...props: InitParams<Props, ExtraData>
    ): GetComponentOut<Props, ExtraData> => {
      const {
        modifiable,
        required,
        delegation,
        delegationChange,
      } = this.delegator(...props);
      return {
        modifiable,
        required,
        delegationChange,
        Component: delegationChange
          ? ComponentFactory(delegation)
          : this.Component,
      };
    };
  }
}

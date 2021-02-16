import type { InputDelegator } from '@ldfields/delegator';
import type { Constraints } from '@ldfields/field-base/types';
import type { GetComponentOut, InitParams, RendererState } from '../types';
import { ComponentFactory } from './component-factory';

class ReactInputDelegator<
  Props extends { [key: string]: string; },
  ExtraData = never
> {
  GetComponent: (...[props, constraints, data]: InitParams<Props, ExtraData>) => GetComponentOut<
    Props,
    ExtraData
  >;

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

    this.GetComponent = (...props: InitParams<Props, ExtraData>):
      GetComponentOut<Props, ExtraData> => {
      const {
        modifiable, required, delegation, delegationChange,
      } = this.delegator(...props);
      return {
        modifiable,
        required,
        delegationChange,
        Component: delegationChange ? ComponentFactory(delegation) : this.Component,
      };
    };
  }
}

/**
 * Factory to generate the init function for a reducer
 * @param InputDelegator LDfield input delegator.
 */
export function initFactory<
  Props extends { [key: string]: string; },
  ExtraData = never
>(
  InputDelegator: new () => InputDelegator<
    JSX.Element,
    Props,
    ExtraData,
    Constraints<Props>
  >,
) {
  const { GetComponent } = new ReactInputDelegator(InputDelegator);
  // TODO [Future]: Add constraint type parameters
  return function init([props, constraints, data]: InitParams<Props, ExtraData>):
    RendererState<Props, ExtraData> {
    return {
      GetComponent,
      ...GetComponent(props, constraints, data),
      cache: [props],
      props,
    };
  };
}

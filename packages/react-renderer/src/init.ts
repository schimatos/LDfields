import type { InputDelegator } from '@ldfields/delegator';
import type { Constraints } from '@ldfields/field-base/types';
import type { InitParams, RendererState } from '../types';
import { ReactInputDelegator } from './react-delegator';

/**
 * Factory to generate the init function for a reducer
 * @param InputDelegator LDfield input delegator.
 */
export function initFactory<
  Props extends { [key: string]: string | undefined; },
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

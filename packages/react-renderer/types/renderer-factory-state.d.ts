import type { LDfieldBase } from '@ldfields/field-base';
import type { Constraints, FieldProps } from '@ldfields/field-base/types';
import type { InitParams } from './init-params';

interface GetComponentOut<
  Props extends { [key: string]: string | undefined; },
  ExtraData = never
> {
  Component: (props: FieldProps<Props, ExtraData>) => JSX.Element;
  modifiable: { [key in keyof Props & string]?: true | undefined; };
  required: (keyof Props & string)[];
  delegationChange: boolean;
  delegation: LDfieldBase<JSX.Element, Props, ExtraData>[];
}

export type RendererState<
  Props extends { [key: string]: string | undefined; },
  ExtraData = never
> = {
  GetComponent: (...props: InitParams<Props, ExtraData>) => GetComponentOut<Props, ExtraData>
  cache: Partial<Props>[];
  props: Partial<Props>;
} & GetComponentOut<Props, ExtraData>

export interface RendererActionsPropUpdate<
  Props extends { [key: string]: string | undefined; }
> {
  type: 'propUpdate'
  props: Partial<Props>;
  /**
   * Optional function to trigger while the update is being made internally
   */
  onChange?: (e: Partial<Props>) => void
}

export interface RendererActionsDelegate<
  Props extends { [key: string]: string | undefined; },
  ExtraData = never
> {
  type: 'delegate'
  props: Partial<Props>;
  constraints?: Constraints<Props>;
  data?: ExtraData
}

export type RendererActions<
  Props extends { [key: string]: string | undefined; },
  ExtraData = never
> =
  | RendererActionsPropUpdate<Props>
  | RendererActionsDelegate<Props, ExtraData>

export type ReducerFunction<
  Props extends { [key: string]: string | undefined; },
  ExtraData = never
> = (
  s: RendererState<Props, ExtraData>, a: RendererActions<Props, ExtraData>
) => RendererState<Props, ExtraData>

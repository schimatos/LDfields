import type { Constraints, FieldProps } from '@ldfields/field-base/types';
import type { InitParams } from './init-params';

interface GetComponentOut<
  Props extends { [key: string]: string; },
  ExtraData = never
> {
  Component: (props: FieldProps<Props, ExtraData>) => JSX.Element;
  modifiable: { [key in keyof Props & string]?: true | undefined; };
  required: (keyof Props & string)[];
  delegationChange: boolean;
}

export type RendererState<
  Props extends { [key: string]: string; },
  ExtraData = never
> = {
  GetComponent: (...props: InitParams<Props, ExtraData>) => GetComponentOut<Props, ExtraData>
  cache: Partial<Props>[];
  props: Partial<Props>;
} & GetComponentOut<Props, ExtraData>

export interface RendererActionsPropUpdate<Props extends { [key: string]: string; }> {
  type: 'propUpdate'
  props: Partial<Props>;
}

export interface RendererActionsDelegate<
  Props extends { [key: string]: string; },
  ExtraData = never
> {
  type: 'delegate'
  props: Partial<Props>;
  constraints?: Constraints<Props>;
  data?: ExtraData
}

export type RendererActions<
  Props extends { [key: string]: string; },
  ExtraData = never
> =
  | RendererActionsPropUpdate<Props>
  | RendererActionsDelegate<Props, ExtraData>

export type ReducerFunction<
  Props extends { [key: string]: string; },
  ExtraData = never
> = (
  s: RendererState<Props, ExtraData>, a: RendererActions<Props, ExtraData>
) => RendererState<Props, ExtraData>

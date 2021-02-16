import type { Constraints } from '@ldfields/field-base/types';
import type { RendererState } from './renderer-factory-state';

export type InitParams<Props extends { [key: string]: string; }, ExtraData = never> = [
  Partial<Props>,
  Constraints<Props> | undefined,
  ExtraData | undefined
];

export type InitFunc<Props extends { [key: string]: string; }, ExtraData = never> = (
  ...props: InitParams<Props, ExtraData>
) => RendererState<Props>;

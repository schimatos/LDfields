// import React from 'react';
// import { ErrorBoundary } from 'react-error-boundary';
import type { LDfieldBase } from '@ldfields/field-base';
// import type { FieldProps } from '@ldfields/field-base/types';

/**
 * Renders the set of components based on the delegated fields.
 * @param components The set of LDfield bases.
 */
export function ComponentFactory<
  Props extends { [key: string]: string | undefined; },
  ExtraData = never
>(
  components: LDfieldBase<JSX.Element, Props, ExtraData>[],
) {
  return components;
  // return ({ onChange, ...props }: FieldProps<Props, ExtraData>) => (
  //   <>
  //     {
  //       components.map((Field: LDfieldBase<JSX.Element, Props, ExtraData>, i: number) => (
  //         <ErrorBoundary
  //           FallbackComponent={() => (
  //             <>
  //             {
  //               Field.fieldTargets.map((target) => (
  //                 <input
  //                   aria-label={target}
  //                   value={props.props[target]}
  //                   onChange={(p) => onChange({ ...props.props, [target]: p.target.value })}
  //                 />
  //               ))
  //             }
  //             </>
  //           )}
  //         >
  //         <Field.Field {...props} key={i} onChange={(p) => onChange({ ...props.props, ...p })} />
  //         </ErrorBoundary>
  //       ))
  //     }
  //   </>
  // );
}

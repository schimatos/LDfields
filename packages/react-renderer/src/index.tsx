import React, { useEffect, useReducer } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { InputDelegatorFactory } from '@ldfields/delegator';
import type { FieldProps } from '@ldfields/field-base/types';
import type { LDfieldBase } from '@ldfields/field-base';
import type {
  RendererFactoryProps, ReducerFunction, RendererActions, RendererState,
} from '../types';
import { initFactory } from './init';

function reducer<
  Props extends { [key: string]: string | undefined; },
  ExtraData
>(s: RendererState<Props, ExtraData>, a: RendererActions<Props, ExtraData>):
  RendererState<Props, ExtraData> {
  switch (a.type) {
    case 'propUpdate': {
      return { ...s, cache: [a.props, ...s.cache], props: a.props };
    }
    case 'delegate': {
      const delegation = s.GetComponent(a.props, a.constraints, a.data);
      if (!delegation.delegationChange) {
        return { ...s, ...delegation };
      }
      const props: Partial<Props> = {};
      for (const prop in a.props) {
        if (delegation.modifiable[prop]) {
          props[prop] = a.props[prop];
        }
      }
      for (const prop of delegation.required) {
        if (props[prop] === undefined) {
          const value = s.cache.find((cache) => cache[prop])?.[prop];
          if (value !== undefined) {
            props[prop] = value;
          } else {
            // TODO: GET DEFAULT VALUE
          }
        }
      }
      // TODO: Create function with create constraints
      if (a.constraints?.restrictions) {
        for (const p in a.constraints.restrictions) {
          if (
            typeof p === 'string'
            && a.constraints.restrictions[p]?.in !== undefined
            && !a.constraints.restrictions?.[p]?.in.includes(props[p])
          ) {
            props[p as keyof Props] = a.constraints?.restrictions[p]?.in[0];
          }
        }
      }
      return {
        ...s,
        ...delegation,
        props,
      };
    }
    default: {
      const action: never = a;
      throw new Error(`Invalid reducer action ${action}`);
    }
  }
}

export function LDfieldRendererFactory<
  Props extends { [key: string]: string | undefined; },
  ExtraData = never
>({
  settings, fields, genericFields, defaultProps,
}: RendererFactoryProps<Props, ExtraData>) {
  const InputDelegator = InputDelegatorFactory(settings, fields, genericFields);

  return function Renderer({
    props, constraints, onChange, data,
  }: FieldProps<Props, ExtraData>) {
    // @ts-ignore
    // const [{ Component, ...state }, dispatch] = useReducer((x) => x, {
    const state = {
      Component: [],
      props,
      constraints,
    };
    // );

    //   useReducer<
    //   ReducerFunction<Props, ExtraData>
    // >(
    //   reducer,
    //   initFactory<Props, ExtraData>(InputDelegator)([props, constraints, data]),
    // );

    const stringifiedProps = JSON.stringify(props);
    const stringifiedConstraints = JSON.stringify(constraints ?? '');

    // TODO: add test for error case
    // encountered where this overrides change
    // during render
    useEffect(() => {
      // @ts-ignore
      // dispatch({ props, constraints, type: 'delegate' });
    }, [props, constraints, stringifiedProps, stringifiedConstraints]);

    return (
      <fieldset onBlur={
        () => { onChange(state.props); }
      }>
      {
        [].map((Field: LDfieldBase<JSX.Element, Props, ExtraData>, i: number) => (
          <ErrorBoundary
            FallbackComponent={() => (
              <>
              {
                Field.fieldTargets.map((target) => (
                  <input
                    key={i}
                    aria-label={target}
                    value={state.props[target]}
                    onChange={(p) => onChange({ ...state.props, [target]: p.target.value })}
                  />
                ))
              }
              </>
            )}
          >
          <Field.Field
            {...state}
            key={i}
            onChange={(p) => onChange({ ...state.props, ...p })}
          />
          </ErrorBoundary>
        ))
      }
      </fieldset>
    );
  };
}

// {
//   // @ts-ignore
//   components.delegation.map((Field, i) => {
//     const newProps = {};
//     for (const elem of Field.modifies) {
//       if (typeof props[elem] !== 'string') {
//         newProps[elem] = '';
//       } else {
//         newProps[elem] = props[elem];
//       }
//     }
//     return (
//       <>
//         <Field.Field
//           // TODO: Check key selection
//           // Getting erros with just field.id
//           // which SHOULD NOT HAPPEN
//           key={
//             // shortid()
//             `${Field.id}-${i}-${shortid()}`
//           }
//           props={newProps}
//           constraints={constraints}
//           data={data}
//           onChange={(p) => {
//             const values = { ...props, ...p };
//             let nextComponents = delegator.delegate(
//               values,
//               constraints,
//             );
//             const output = {};
//             for (const elem in values) {
//               // console.log(components);
//               // @ts-ignore
//               if (nextComponents.modifiable[elem]) {
//                 output[elem] = values[elem];
//               }
//             }
//             let changeMade = true;
//             while (changeMade) {
//               changeMade = false;
//               // @ts-ignore
//               nextComponents = delegator.delegate(output, constraints);
//               for (const modifier of nextComponents.required) {
//                 if (
//                   typeof output[modifier] !== 'string'
//                   && typeof propsCache[modifier] === 'string'
//                 ) {
//                   changeMade = true;
//                   output[modifier] = state.cache[modifier];
//                 }
//               }
//             }

//             // TODO: Add 'inferencing' here

//             // @ts-ignore
// dispatch({
//   type: 'propUpdate',
//   props: p,
// });
//             onChange(output);
//           }}
//         />
//       </>
//     );
//   })
// }

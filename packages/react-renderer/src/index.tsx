import React, { useState, useReducer } from 'react';
import type { InputDelegator } from '@ldfields/delegator';
import { InputDelegatorFactory } from '@ldfields/delegator';
import type { FieldProps } from '@ldfields/field-base/types';
import type {
  RendererFactoryProps, ReducerFunction, RendererActions, RendererState, InitParams,
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

function useRendererReducer<
  Props extends { [key: string]: string | undefined; },
  ExtraData = never
>(
  Delegator: new () => InputDelegator<JSX.Element, Props, ExtraData, Record<string, any>>,
  ...props: InitParams<Props, ExtraData>
) {
  return useReducer<
        ReducerFunction<Props, ExtraData>,
        InitParams<Props, ExtraData>
      >(
        reducer,
        props,
        initFactory<Props, ExtraData>(Delegator),
      );
}

function Component(x: any) {
  const [s, d] = useState('');
  return <>{s}</>
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
    // const [{ Component, ...state }, dispatch] = useRendererReducer<Props, ExtraData>(
    //   InputDelegator, props, constraints, data,
    // );

    function dispatch(x: any) {
      return x;
    }

    const state = {
      props, constraints, data,
    };

    // TODO: add test for error case
    // encountered where this overrides change
    // during render
    // useEffect(() => {
    //   dispatch({ props, constraints, type: 'delegate' });
    // }, [JSON.stringify(props), JSON.stringify(constraints ?? '')]);

    return (
      <fieldset onBlur={() => { onChange(state.props); }}>
        <Component
          props={{ ...defaultProps, ...state.props }}
          data={data}
          onChange={(p: Partial<Props>) => {
            const update: RendererActions<Props, ExtraData> = {
              type: 'propUpdate',
              props: p,
            };
            dispatch(update);
          }}
        />
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

import type { LDfieldSettings } from '@ldfields/delegator/types';
import type { GenericField, FieldProps } from '@ldfields/field-base/types';
import type { LDfieldBase } from '@ldfields/field-base';
import { InputDelegatorFactory } from '@ldfields/delegator';
import React from 'react';

export function LDfieldRendererFactory<
  Rendered,
  Props extends { [key: string]: string; },
  ExtraData = never
>({
  settings,
  fields,
  genericFields,
}: {
  settings: LDfieldSettings<keyof Props & string>;
  fields?: LDfieldBase<Rendered, Props, ExtraData>[];
  genericFields?: GenericField<Rendered, Props, ExtraData>[];
}) {
  const InputDelegator = InputDelegatorFactory(settings, fields, genericFields);
  return function Renderer({
    props,
    constraints,
    onChange,
    data,
  }: FieldProps<Props, ExtraData>) {
    // @ts-ignore
    const [
      {
        Component, components, delegator, propsCache,
      },
      dispatch,
    ] = useReducer<(
      s: {
          components;
          delegator;
        },
      a: {
          props;
          constraints?;
        }
    ) => {
        components;
        delegator;
      }
      >(
      (s, a) => {
        // TODO: Implement this so that property caching works
        // @ts-ignore
        if (a.type === 'propUpdate') {
          return {
            ...s,
            propsCache: {
              // @ts-ignore
              ...s.propsCache,
              // @ts-ignore
              ...a.props,
            },
          };
        }
        const components = s.delegator.delegate(a.props, a.constraints);
        if (components === s.components) {
          // console.log("not refreshed");
          return s;
        }
        // console.log("refreshing");
        const toUnCache = {};
        let runUnCache = false;
        for (const delegation of components.delegation) {
          for (const elem of delegation.modifies) {
            // @ts-ignore
            if (
              typeof props[elem] !== 'string'
              // @ts-ignore
              && typeof s.propsCache[elem] === 'string'
            ) {
              runUnCache = true;
              // @ts-ignore
              toUnCache[elem] = s.propsCache[elem];
            }
          }
        }
        if (runUnCache) {
          const values = { ...toUnCache, ...props };
          const output = {};
          for (const elem in values) {
            // console.log(components);
            // @ts-ignore
            if (components.modifiable[elem]) {
              output[elem] = values[elem];
            }
          }
          // TODOL Clean up
          // onChange(output)
        }
        return {
          delegator: s.delegator,
          // @ts-ignore
          propsCache: s.propsCache,
          components,
          Component: ComponentFactory(components),
        };
      },
      // @ts-ignore
      [props, constraints, data],
      init(settings, fields, genericFields),
      );

    // TODO: add test for error case
    // encountered where this overrides change
    // during render
    useEffect(() => {
      // @ts-ignore
      dispatch({ props, constraints });
      // TODO: Do this in general and less hacky
      const newProps = { ...props };
      let changed = false;
      if (constraints?.restrictions) {
        for (const p in constraints.restrictions) {
          if (
            'in' in constraints.restrictions[p]
            && !constraints.restrictions[p].in.includes(props[p])
          ) {
            changed = true;
            newProps[p] = constraints.restrictions[p].in[0];
            // onChange({ [p]: constraints.restrictions[p].in[0] })
          }
        }
      }
      if (changed) {
        console.log('on change issued by usee effect', [JSON.stringify(props), JSON.stringify(constraints ?? '')]);
        // onChange(newProps);
      }
    }, [JSON.stringify(props), JSON.stringify(constraints ?? '')]);

    // const [propsCache, setProps] = useReducer((s, a) => {
    //   return { ...s, ...a }
    // }, {})

    // useEffect(() => {
    //   setProps(props);
    // }, [JSON.stringify(props)])

    // useEffect(() => {
    //   // @ts-ignore
    // for (const delegation of components.delegation) {
    //   for (const elem of delegation.modifies) {
    //     if (typeof props[elem] !== 'string' && typeof propsCache[elem] === 'string') {
    //       onChange({ elem: propsCache[elem] })
    //     }
    //   }
    // }

    //   // @ts-ignore
    // }, [components.delegation])

    // console.log("inside field customiser", props, components);
    return (
      <fieldset onBlur={() => {
        // TODO: Fix this - it is only a temporary solution
        // @ts-ignore
        const values = { ...props, ...propsCache };
        // @ts-ignore
        let nextComponents = delegator.delegate(
          values,
          constraints,
        );
        const output = {};
        for (const elem in values) {
          // console.log(components);
          // @ts-ignore
          if (nextComponents.modifiable[elem]) {
            output[elem] = values[elem];
          }
        }
        let changeMade = true;
        while (changeMade) {
          changeMade = false;
          // @ts-ignore
          nextComponents = delegator.delegate(output, constraints);
          for (const modifier of nextComponents.required) {
            if (
              typeof output[modifier] !== 'string'
                && typeof propsCache[modifier] === 'string'
            ) {
              changeMade = true;
              // console.log(
              //   modifier,
              //   output[modifier],
              //   propsCache[modifier]
              // );
              output[modifier] = propsCache[modifier];
            }
          }
        }

        // TODO: Add 'inferencing' here

        // delegator.delegate(output, constraints);

        console.log('onChange issued by field');
        // onChange(output);
      }}>
        {
          // @ts-ignore
          components.delegation.map((Field, i) => {
            const newProps = {};
            for (const elem of Field.modifies) {
              if (typeof props[elem] !== 'string') {
                newProps[elem] = '';
              } else {
                newProps[elem] = props[elem];
              }
            }
            // console.log(Field.id, newProps, props, components);
            return (
              <>
                <Field.Field
                  // TODO: Check key selection
                  // Getting erros with just field.id
                  // which SHOULD NOT HAPPEN
                  key={
                    // shortid()
                    `${Field.id}-${i}-${shortid()}`
                  }
                  props={newProps}
                  constraints={constraints}
                  data={data}
                  onChange={(p) => {
                    const values = { ...props, ...p };
                    // @ts-ignore
                    let nextComponents = delegator.delegate(
                      values,
                      constraints,
                    );
                    const output = {};
                    for (const elem in values) {
                      // console.log(components);
                      // @ts-ignore
                      if (nextComponents.modifiable[elem]) {
                        output[elem] = values[elem];
                      }
                    }
                    let changeMade = true;
                    while (changeMade) {
                      changeMade = false;
                      // @ts-ignore
                      nextComponents = delegator.delegate(output, constraints);
                      for (const modifier of nextComponents.required) {
                        if (
                          typeof output[modifier] !== 'string'
                          && typeof propsCache[modifier] === 'string'
                        ) {
                          changeMade = true;
                          // console.log(
                          //   modifier,
                          //   output[modifier],
                          //   propsCache[modifier]
                          // );
                          output[modifier] = propsCache[modifier];
                        }
                      }
                    }

                    // TODO: Add 'inferencing' here

                    // delegator.delegate(output, constraints);

                    // @ts-ignore
                    dispatch({
                      type: 'propUpdate',
                      props: p,
                    });
                    console.log('onChange issued by field');
                    onChange(output);
                  }}
                />
              </>
            );
          })
        }
      </fieldset>
      // @ts-ignore
      // <Component
      //   props={props}
      //   constraints={constraints}
      //   onChange={onChange}
      // />
    );
  };
}

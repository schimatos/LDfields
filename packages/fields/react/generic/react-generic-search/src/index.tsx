// import React, { useEffect } from 'react';
// import { LDfieldGenericBase } from '@ldfields/generic-field-base';
// import type { FieldProps } from '@ldfields/field-base/types';
// import { useState } from '@jeswr/use-state';
// import type { IQueryEngine } from '@comunica/types';
// import Selector from 'sparql-search-bar';

// function fieldFactory<
//   Props extends { [key: string]: string | undefined; },
//   ExtraData extends { queryEngine: Promise<IQueryEngine>,  }
// >(modifier: string) {
//   return function Field({ props, onChange, label, data }: FieldProps<Props, ExtraData>) {
//     const [value, setValue] = useState<string>(props[modifier] ?? '');
//     useEffect(() => {
//       setValue(props.value ?? '');
//     }, [props.value]);
//     return (
//       <>
//         <label>{label ?? (modifier ? /[a-z]*$/i.exec(modifier)?.[0] : '')}</label>
//         <Selector
//           // TODO: Fix type casting here
//           queryEngine={data?.queryEngine as Promise<IQueryEngine>}
//           onChange={onChange}

//         />
//       </>
//     );
//   };
// }

// export class BasicInput<
//   Props extends { [key: string]: string | undefined; },
//   ExtraData = never,

// > extends LDfieldGenericBase<JSX.Element, Props> {
//   priority = 50;

//   supports() {
//     return true;
//   }

//   Field = fieldFactory<Props, ExtraData>(this.modifier)
// }

export {};

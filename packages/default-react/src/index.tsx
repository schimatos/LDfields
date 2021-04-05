import React from 'react';
import { defaultSettings as settings } from '@ldfields/default-settings';
import { rdf, rdfs } from '@ldfields/default-settings/lib/enums';
import type { Props } from '@ldfields/default-settings/types';
import { LDfieldRendererFactory } from '@ldfields/react-renderer';
import { RDFToProps, propsToRDF } from '@ldfields/props-rdf-conversion';
import type { Data } from '@ldfields/props-rdf-conversion/types';
import type { Constraints } from '@ldfields/field-base/types';
import { fields } from './fields';
import { genericFields } from './generic-fields';

const defaultProps: Props = {
  value: '',
  termType: 'Literal',
  datatype: '',
  language: '',
  [rdf.type]: '',
  [rdfs.label]: '',
};

export interface ExtraData {
  queryEngine?: any; // ActorInitSparql;
  pathFactory?: any;
}

const RawInput = LDfieldRendererFactory<Props, ExtraData>({
  settings, genericFields, fields, defaultProps,
});

interface InputProps {
  props: Data;
  onChange(e: Data): void;
  constraints: Constraints<Props>;
  data?: ExtraData;
}

function Input({
  props, onChange, constraints, data,
}: InputProps): JSX.Element {
  /**
   * Manually add the term type constraints
   */
  // TODO [FUTURE]: Handle this more generically
  let inTermtypes = ['NamedNode', 'BlankNode', 'Literal'];
  const inConstraint = constraints.restrictions?.termType?.in;
  if (Array.isArray(inConstraint) && inConstraint.every((x) => typeof x === 'string')) {
    const newTermTypes = [];
    for (const term of inTermtypes) {
      if (inConstraint.includes(term)) {
        newTermTypes.push(term);
      }
    }
    inTermtypes = newTermTypes;
  }
  return <RawInput
    props={RDFToProps(props)}
    onChange={(d) => onChange(propsToRDF(d))}
    data={data}
    constraints={{
      ...constraints,
      restrictions: {
        ...constraints.restrictions,
        termType: {
          ...(constraints.restrictions?.termType ?? {}),
          in: inTermtypes,
        },
      },
    }}
  />;
}

export {
  fields,
  genericFields,
  settings,
  RawInput,
};

export default Input;

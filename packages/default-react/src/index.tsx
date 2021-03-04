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
  return <RawInput
    props={RDFToProps(props)}
    onChange={(d) => onChange(propsToRDF(d))}
    data={data}
    constraints={constraints}
  />;
}

export {
  fields,
  genericFields,
  settings,
  RawInput,
};

export default Input;

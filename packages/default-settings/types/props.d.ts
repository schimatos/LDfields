import type { rdf, rdfs } from '../src/enums';

export interface BaseProps {
  value: string;
  termType: 'BlankNode' | 'NamedNode' | 'Literal';
  datatype: string | undefined;
  language: string | undefined;
  [rdf.type]: string | undefined;
  [rdfs.label]: string | undefined;
}

export interface ResourceProps {
  termType: 'NamedNode' | 'Literal';
  datatype: undefined;
  language: string | undefined;
  [rdf.type]: string | undefined;
  [rdfs.label]: string | undefined;
}

export interface DatatypeProps {
  termType: 'Literal';
  datatype: string;
  // Perhaps make defined iff the datatype
  language: string | undefined;
  [rdf.type]: undefined;
  [rdfs.label]: undefined;
}

export interface LangStringProps {
  termType: 'Literal';
  datatype: rdf.langString;
  // Perhaps make defined iff the datatype
  language: string;
}

export interface NonLangStringProps {
  termType: 'Literal';
  datatype: Exclude<string, rdf.langString>;
  // Perhaps make defined iff the datatype
  language: string;
}

type DataTypeType = DatatypeProps & (LangStringProps | NonLangStringProps);

// TODO: GO TO THE EFFORT OF ADDING IN THE RESTRICTION SHOWN HERE
export type Props = {
  value: string;
  termType: 'BlankNode' | 'NamedNode' | 'Literal';
  datatype: string | undefined;
  language: string | undefined;
  [rdf.type]: string | undefined;
  [rdfs.label]: string | undefined;
};// BaseProps & (ResourceProps | DatatypeProps);

export type PropTerm = keyof Props

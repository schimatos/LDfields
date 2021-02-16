import type { rdf, rdfs } from '../src/enums';

export interface Props {
  value: string;
  termType: 'BlankNode' | 'NamedNode' | 'Literal';
  datatype: string;
  language: string;
  [rdf.type]: string;
  [rdfs.label]: string;
}

export type PropTerm = keyof Props

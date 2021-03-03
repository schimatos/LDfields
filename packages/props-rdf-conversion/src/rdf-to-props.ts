import { namedNode } from '@rdfjs/data-model';
import type {
  Quad,
} from 'rdf-js';
import type { MetadataProps, Data } from '../types';

enum rdf {
  term = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#term',
  type = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
}

enum rdfs {
  label = 'http://www.w3.org/2000/01/rdf-schema#label',
}

// TODO: Double check this type
export function RDFToProps(data: Data): Partial<MetadataProps> {
  const { term, annotations } = data;
  if (term === undefined) {
    return {};
  }
  switch (term.termType) {
    case 'BlankNode':
    case 'NamedNode': {
      const type = annotations.find(
        (t: Quad) => t.subject.equals(term)
          && t.predicate.equals(namedNode(rdf.type))
          && t.object.termType === 'NamedNode',
      )?.object.value;
      const label = annotations.find(
        (t: Quad) => t.subject.equals(term)
          && t.predicate.equals(namedNode(rdfs.label))
          && t.object.termType === 'Literal',
      )?.object.value;
      return {
        value: term.value,
        termType: term.termType,
        ...(type ? { [rdf.type]: type } : {}),
        ...(label ? { [rdfs.label]: label } : {}),
      };
    }
    case 'Literal': {
      return {
        value: term.value,
        termType: 'Literal',
        datatype: term.datatype.value,
        ...(term.language ? { language: term.language } : {}),
      };
    }
    default: {
      // TODO: Make this an error again once
      // fields are fixed
      // return {
      //   value: data.term.value,
      //   termType: 'Literal',
      //   datatype: data.term.datatype,
      //   language: data.term.language,
      // };
      const t: never = term;
      throw new Error(`Unexpected term ${t}`);
    }
  }
}

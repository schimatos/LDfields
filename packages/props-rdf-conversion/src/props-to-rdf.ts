import { namedNode, literal, blankNode } from '@rdfjs/data-model';
import { getAnnotations } from './get-annotations';
import type { MetadataProps, Data } from '../types';

enum rdf {
  term = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#term',
  type = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  langString = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString',
}

export function propsToRDF(metadata: Partial<MetadataProps>): Data {
  if (typeof metadata.termType !== 'string' || typeof metadata.value !== 'string') {
    return {
      term: undefined,
      annotations: [],
    };
  }
  switch (metadata.termType) {
    case 'BlankNode':
    case 'NamedNode': {
      const term = (metadata.termType === 'BlankNode' ? blankNode : namedNode)(metadata.value);
      return {
        term,
        annotations: getAnnotations(metadata, term),
      };
    }
    case 'Literal': {
      return {
        term: literal(
          metadata.value,
          metadata.datatype === rdf.langString
            ? (metadata.language ?? metadata.datatype)
            : metadata.datatype,
        ),
        annotations: [],
      };
    }
    default: {
      // TODO: SEE IF DEFAULTING BEHAVIOR BELOW IS NECESSARY
      // return {
      //   term: literal(
      //     metadata.value,
      //     metadata.datatype === rdf.langString
      //       ? (metadata.language ?? metadata.datatype)
      //       : metadata.datatype
      //   ),
      //   annotations: [],
      // };
      const m: never = metadata.termType;
      throw new Error(`Invalid termType: ${m}`);
    }
  }
}

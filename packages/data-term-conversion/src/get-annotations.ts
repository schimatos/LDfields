import { namedNode, literal, quad } from '@rdfjs/data-model';
import type { NamedNode, BlankNode } from 'rdf-js';

enum rdf {
  term = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#term',
  type = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
}

enum rdfs {
  label = 'http://www.w3.org/2000/01/rdf-schema#label',
}

export function getAnnotations<
  Props extends { [key: string]: string; }
>(metadata: Props, term: NamedNode | BlankNode) {
  const annotations = [];
  if (rdf.type in metadata) {
    // TODO [Future]: Handle case where class is a blank node
    annotations.push(quad(term, namedNode(rdf.type), namedNode(metadata[rdf.type])));
  }
  if (rdfs.label in metadata) {
    annotations.push(
      quad(term, namedNode(rdfs.label), literal(metadata[rdfs.label], metadata.language)),
    );
  }
  return annotations;
}

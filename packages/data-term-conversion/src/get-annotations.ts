import { namedNode, literal, quad } from '@rdfjs/data-model';
import type { NamedNode, BlankNode } from 'rdf-js';

const enum rdf {
  term = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#term',
  type = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
}

const enum rdfs {
  label = 'http://www.w3.org/2000/01/rdf-schema#label',
}

export function getAnnotations<
  T extends string
>(metadata: { [K in T]?: string }, term: NamedNode | BlankNode) {
  const annotations = [];
  if (rdf.type in metadata) {
    // TODO [Future]: Handle case where class is a blank node
    annotations.push(
      quad(
        term,
        namedNode(rdf.type),
        namedNode(metadata['http://www.w3.org/1999/02/22-rdf-syntax-ns#type']),
      ),
    );
  }
  if (rdfs.label in metadata) {
    annotations.push(
      quad(term, namedNode(rdfs.label), literal(metadata[rdfs.label], metadata.language)),
    );
  }
  return annotations;
}

import { namedNode, literal, quad } from '@rdfjs/data-model';
import type { NamedNode, BlankNode } from 'rdf-js';

enum rdf {
  term = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#term',
  type = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
}

enum rdfs {
  label = 'http://www.w3.org/2000/01/rdf-schema#label',
}

export function getAnnotations<Props extends { [key: string]: string | undefined; }>(
  metadata: Props,
  term: NamedNode | BlankNode,
) {
  const annotations = [];
  const { [rdf.type]: type, [rdfs.label]: label } = metadata;
  if (typeof type === 'string') {
    // TODO [Future]: Handle case where class is a blank node
    annotations.push(quad(term, namedNode(rdf.type), namedNode(type)));
  }
  if (typeof label === 'string') {
    annotations.push(
      quad(term, namedNode(rdfs.label), literal(label, metadata.language)),
    );
  }
  return annotations;
}

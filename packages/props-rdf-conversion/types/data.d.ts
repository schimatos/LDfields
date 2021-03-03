import type {
  Literal, NamedNode, BlankNode, Quad,
} from 'rdf-js';

export type Data = {
  term: BlankNode;
  annotations: Quad[];
} | {
  term: NamedNode<string>;
  annotations: Quad[];
} | {
  term: Literal;
  annotations: Quad[];
} | {
  term: undefined,
  annotations: Quad[];
}

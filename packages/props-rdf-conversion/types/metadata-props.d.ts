// TODO FUTURE: Consider consilidating with react renderer props.
export type MetadataProps = {
  [key: string]: string;
  value: string;
  termType: 'BlankNode';
} | {
  [key: string]: string;
  value: string;
  termType: 'Literal';
} | {
  [key: string]: string;
  value: string;
  termType: 'NamedNode';
}

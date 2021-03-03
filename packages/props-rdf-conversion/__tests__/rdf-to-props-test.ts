import {
  namedNode, quad, literal, blankNode,
} from '@rdfjs/data-model';
import { RDFToProps } from '../src';

enum rdf {
  term = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#term',
  type = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  langString = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString',
}

enum rdfs {
  label = 'http://www.w3.org/2000/01/rdf-schema#label',
}

describe('Testing rdf to props', () => {
  it('Should work with undefind terms', () => {
    expect(
      RDFToProps({ annotations: [], term: undefined }),
    ).toEqual({});
    expect(
      RDFToProps({
        annotations: [
          quad(
            namedNode('http://example.org#Jesse'),
            namedNode(rdf.type),
            namedNode('http://example.org#Person'),
          ),
        ],
        term: undefined,
      }),
    ).toEqual({});
  });
  it('Should work with literal terms', () => {
    expect(
      RDFToProps({
        annotations: [],
        term: literal('1', 'http://example.org#CustomNumericType'),
      }),
    ).toEqual({
      value: '1',
      termType: 'Literal',
      datatype: 'http://example.org#CustomNumericType',
    });
    expect(
      RDFToProps({
        annotations: [],
        term: literal('Jesse Wright', 'en'),
      }),
    ).toEqual({
      value: 'Jesse Wright',
      termType: 'Literal',
      datatype: rdf.langString,
      language: 'en',
    });
  });
  it('Should work with named nodes', () => {
    expect(
      RDFToProps({
        annotations: [],
        term: namedNode('http://example.org#Jesse'),
      }),
    ).toEqual({
      value: 'http://example.org#Jesse',
      termType: 'NamedNode',
    });
    expect(
      RDFToProps({
        annotations: [
          quad(
            namedNode('http://example.org#Jesse'),
            namedNode(rdf.type),
            namedNode('http://example.org#Person'),
          ),
        ],
        term: namedNode('http://example.org#Jesse'),
      }),
    ).toEqual({
      value: 'http://example.org#Jesse',
      termType: 'NamedNode',
      [rdf.type]: 'http://example.org#Person',
    });
    expect(
      RDFToProps({
        annotations: [
          quad(
            namedNode('http://example.org#Jesse'),
            namedNode(rdf.type),
            namedNode('http://example.org#Person'),
          ),
          quad(
            namedNode('http://example.org#Jesse'),
            namedNode(rdfs.label),
            literal('Jesse Wright'),
          ),
        ],
        term: namedNode('http://example.org#Jesse'),
      }),
    ).toEqual({
      value: 'http://example.org#Jesse',
      termType: 'NamedNode',
      [rdf.type]: 'http://example.org#Person',
      [rdfs.label]: 'Jesse Wright',
    });
  });
  it('Should work with blank nodes', () => {
    expect(
      RDFToProps({
        annotations: [],
        term: blankNode('http://example.org#Jesse'),
      }),
    ).toEqual({
      value: 'http://example.org#Jesse',
      termType: 'BlankNode',
    });
    expect(
      RDFToProps({
        annotations: [
          quad(
            blankNode('http://example.org#Jesse'),
            namedNode(rdf.type),
            namedNode('http://example.org#Person'),
          ),
        ],
        term: blankNode('http://example.org#Jesse'),
      }),
    ).toEqual({
      value: 'http://example.org#Jesse',
      termType: 'BlankNode',
      [rdf.type]: 'http://example.org#Person',
    });
    expect(
      RDFToProps({
        annotations: [
          quad(
            blankNode('http://example.org#Jesse'),
            namedNode(rdf.type),
            namedNode('http://example.org#Person'),
          ),
          quad(
            blankNode('http://example.org#Jesse'),
            namedNode(rdfs.label),
            literal('Jesse Wright'),
          ),
        ],
        term: blankNode('http://example.org#Jesse'),
      }),
    ).toEqual({
      value: 'http://example.org#Jesse',
      termType: 'BlankNode',
      [rdf.type]: 'http://example.org#Person',
      [rdfs.label]: 'Jesse Wright',
    });
  });
});

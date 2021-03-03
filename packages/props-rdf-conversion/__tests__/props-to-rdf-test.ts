import {
  namedNode, quad, literal, blankNode,
} from '@rdfjs/data-model';
import { propsToRDF } from '../src';

enum rdf {
  term = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#term',
  type = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  langString = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString',
}

enum rdfs {
  label = 'http://www.w3.org/2000/01/rdf-schema#label',
}

describe('Testing props to rdf', () => {
  it('Should work with named node entries', () => {
    expect(propsToRDF({
      value: 'http://example.org/Jesse',
      termType: 'NamedNode',
    })).toEqual({
      term: namedNode('http://example.org/Jesse'),
      annotations: [],
    });
    expect(propsToRDF({
      value: 'http://example.org/Jesse',
      termType: 'NamedNode',
      [rdf.type]: 'http://example.org/Person',
    })).toEqual({
      term: namedNode('http://example.org/Jesse'),
      annotations: [
        quad(
          namedNode('http://example.org/Jesse'),
          namedNode(rdf.type),
          namedNode('http://example.org/Person'),
        ),
      ],
    });
    expect(propsToRDF({
      value: 'http://example.org/Jesse',
      termType: 'NamedNode',
      [rdf.type]: 'http://example.org/Person',
      [rdfs.label]: 'Jesse Wright',
    })).toEqual({
      term: namedNode('http://example.org/Jesse'),
      annotations: [
        quad(
          namedNode('http://example.org/Jesse'),
          namedNode(rdf.type),
          namedNode('http://example.org/Person'),
        ),
        quad(
          namedNode('http://example.org/Jesse'),
          namedNode(rdfs.label),
          literal('Jesse Wright'),
        ),
      ],
    });
    expect(propsToRDF({
      value: 'http://example.org/Jesse',
      termType: 'NamedNode',
      [rdf.type]: 'http://example.org/Person',
      [rdfs.label]: 'Jesse Wright',
      language: 'en',
    })).toEqual({
      term: namedNode('http://example.org/Jesse'),
      annotations: [
        quad(
          namedNode('http://example.org/Jesse'),
          namedNode(rdf.type),
          namedNode('http://example.org/Person'),
        ),
        quad(
          namedNode('http://example.org/Jesse'),
          namedNode(rdfs.label),
          literal('Jesse Wright', 'en'),
        ),
      ],
    });
  });
  it('Should work with blank node entries', () => {
    expect(propsToRDF({
      value: 'http://example.org/Jesse',
      termType: 'BlankNode',
    })).toEqual({
      term: blankNode('http://example.org/Jesse'),
      annotations: [],
    });
    expect(propsToRDF({
      value: 'http://example.org/Jesse',
      termType: 'BlankNode',
      [rdf.type]: 'http://example.org/Person',
    })).toEqual({
      term: blankNode('http://example.org/Jesse'),
      annotations: [
        quad(
          blankNode('http://example.org/Jesse'),
          namedNode(rdf.type),
          namedNode('http://example.org/Person'),
        ),
      ],
    });
    expect(propsToRDF({
      value: 'http://example.org/Jesse',
      termType: 'BlankNode',
      [rdf.type]: 'http://example.org/Person',
      [rdfs.label]: 'Jesse Wright',
    })).toEqual({
      term: blankNode('http://example.org/Jesse'),
      annotations: [
        quad(
          blankNode('http://example.org/Jesse'),
          namedNode(rdf.type),
          namedNode('http://example.org/Person'),
        ),
        quad(
          blankNode('http://example.org/Jesse'),
          namedNode(rdfs.label),
          literal('Jesse Wright'),
        ),
      ],
    });
  });
  it('Should work with literal entries', () => {
    expect(propsToRDF({
      value: '1',
      termType: 'Literal',
    })).toEqual({
      term: literal('1'),
      annotations: [],
    });
    expect(propsToRDF({
      value: '1',
      termType: 'Literal',
      datatype: rdf.langString,
      language: 'en',
    })).toEqual({
      term: literal('1', 'en'),
      annotations: [],
    });
    expect(propsToRDF({
      value: '1',
      termType: 'Literal',
      datatype: 'http://example.org#myDataType',
      language: 'en',
    })).toEqual({
      term: literal('1', namedNode('http://example.org#myDataType')),
      annotations: [],
    });
  });
});

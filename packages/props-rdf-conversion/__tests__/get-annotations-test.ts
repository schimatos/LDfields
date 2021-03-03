import {
  quad, namedNode, blankNode, literal,
} from '@rdfjs/data-model';
import { getAnnotations } from '../src';

enum rdf {
  term = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#term',
  type = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
}

enum rdfs {
  label = 'http://www.w3.org/2000/01/rdf-schema#label',
}

describe('Testing get annotations', () => {
  it('Should have no annotations with no metadata', () => {
    expect(getAnnotations({}, namedNode('http://example.org#Jesse'))).toEqual([]);
    expect(getAnnotations({}, blankNode('1'))).toEqual([]);
  });
  it('Should have correct annotations with type', () => {
    expect(getAnnotations({
      [rdf.type]: 'http://example.org#Person',
    }, namedNode('http://example.org#Jesse'))).toEqual([
      quad(
        namedNode('http://example.org#Jesse'),
        namedNode(rdf.type),
        namedNode('http://example.org#Person'),
      ),
    ]);
    expect(getAnnotations({
      [rdf.type]: 'http://example.org#Person',
    }, blankNode('http://example.org#Jesse'))).toEqual([
      quad(
        blankNode('http://example.org#Jesse'),
        namedNode(rdf.type),
        namedNode('http://example.org#Person'),
      ),
    ]);
  });
  it('Should have correct annotations with label', () => {
    expect(getAnnotations({
      [rdfs.label]: 'Jesse Wright',
    }, namedNode('http://example.org#Jesse'))).toEqual([
      quad(
        namedNode('http://example.org#Jesse'),
        namedNode(rdfs.label),
        literal('Jesse Wright'),
      ),
    ]);
    expect(getAnnotations({
      [rdfs.label]: 'Jesse Wright',
      language: 'en',
    }, namedNode('http://example.org#Jesse'))).toEqual([
      quad(
        namedNode('http://example.org#Jesse'),
        namedNode(rdfs.label),
        literal('Jesse Wright', 'en'),
      ),
    ]);
    expect(getAnnotations({
      [rdfs.label]: 'Jesse Wright',
    }, blankNode('http://example.org#Jesse'))).toEqual([
      quad(
        blankNode('http://example.org#Jesse'),
        namedNode(rdfs.label),
        literal('Jesse Wright'),
      ),
    ]);
  });
});

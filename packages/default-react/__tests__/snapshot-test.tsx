import React from 'react';
import renderer from 'react-test-renderer';
import { axe, toHaveNoViolations } from 'jest-axe';
import { literal, namedNode, quad } from '@rdfjs/data-model';
import Input from '../src';

expect.extend(toHaveNoViolations);

describe('Testing the snapshot changes of fields', () => {
  it('Should have no violations on the default render for empty props', async () => {
    const tree = renderer.create(
      <Input
        onChange={() => {}}
        constraints={{}}
        props={{
          term: undefined,
          annotations: [],
        }}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should have no violations on the default render for namedNode props', async () => {
    const tree = renderer.create(
      <Input
        onChange={() => {}}
        constraints={{}}
        props={{
          term: namedNode('http://example.org#Jesse'),
          annotations: [],
        }}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should have no violations on the default render for namedNode props + label', async () => {
    const tree = renderer.create(
      <Input
        onChange={() => {}}
        constraints={{}}
        props={{
          term: namedNode('http://example.org#Jesse'),
          annotations: [
            quad(
              namedNode('http://example.org#Jesse'),
              namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
              literal('Jesse'),
            ),
          ],
        }}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should have no violations on the default render for literal', async () => {
    const tree = renderer.create(
      <Input
        onChange={() => {}}
        constraints={{}}
        props={{
          term: literal('Jesse'),
          annotations: [],
        }}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should have no violations on the default render for integer literal', async () => {
    const tree = renderer.create(
      <Input
        onChange={() => {}}
        constraints={{}}
        props={{
          term: literal('0', 'http://www.w3.org/2001/XMLSchema#integer'),
          annotations: [],
        }}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

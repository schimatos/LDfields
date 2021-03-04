import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { literal, namedNode, quad } from '@rdfjs/data-model';
import Input from '../src';

expect.extend(toHaveNoViolations);

describe('Testing the accessibility of fields', () => {
  it('Should have no violations on the default render for empty props', async () => {
    const { container } = render(
      <Input
        onChange={() => {}}
        constraints={{}}
        props={{
          term: undefined,
          annotations: [],
        }}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Should have no violations on the default render for namedNode props', async () => {
    const { container } = render(
      <Input
        onChange={() => {}}
        constraints={{}}
        props={{
          term: namedNode('http://example.org#Jesse'),
          annotations: [],
        }}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Should have no violations on the default render for namedNode props + label', async () => {
    const { container } = render(
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
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Should have no violations on the default render for literal', async () => {
    const { container } = render(
      <Input
        onChange={() => {}}
        constraints={{}}
        props={{
          term: literal('Jesse'),
          annotations: [],
        }}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Should have no violations on the default render for integer literal', async () => {
    const { container } = render(
      <Input
        onChange={() => {}}
        constraints={{}}
        props={{
          term: literal('0', 'http://www.w3.org/2001/XMLSchema#integer'),
          annotations: [],
        }}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

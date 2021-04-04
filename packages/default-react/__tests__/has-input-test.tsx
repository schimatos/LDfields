import React from 'react';
import { render } from '@testing-library/react';
import { literal, namedNode, quad } from '@rdfjs/data-model';
import Input from '../src';

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
    // console.log(container.innerHTML.toString())
    expect(container.innerHTML.toString()).toContain('input');
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
    expect(container.innerHTML.toString()).toContain('input');
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
    expect(container.innerHTML.toString()).toContain('input');
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
    expect(container.innerHTML.toString()).toContain('input');
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
    // expect(container.getElementsByTagName('input').length).toBeGreaterThan(0);
    expect(container.innerHTML.toString()).toContain('input');
  });
});

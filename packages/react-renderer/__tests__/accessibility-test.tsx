import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { LDfieldRendererFactory } from '../src';

const EmptyRenderer = LDfieldRendererFactory({
  settings: [],
  fields: [],
  genericFields: [],
  defaultProps: {},
});

const SingleOptionalFieldRenderer = LDfieldRendererFactory<{ value: string }>({
  settings: [{
    fieldFor: 'value',
    condition: {
      allowed: false, required: false,
    },
  }],
  fields: [],
  genericFields: [],
  defaultProps: {
    value: '',
  },
});

const SingleFieldRenderer = LDfieldRendererFactory<{ value: string }>({
  settings: [{
    fieldFor: 'value',
    condition: {
      allowed: true, required: true,
    },
  }],
  fields: [{
    priority: 0,
    modifies: ['value'],
    fieldTargets: ['value'],
    supports() {
      return true;
    },
    Field() {
      return <input aria-label="foo" />;
    },
  }],
  genericFields: [],
  defaultProps: {
    value: '',
  },
});

expect.extend(toHaveNoViolations);

describe('Testing the accessibility of fields', () => {
  it('Should have no violations on the default render for empty props', async () => {
    const { container } = render(
      <EmptyRenderer
        onChange={() => {}}
        constraints={{}}
        props={{}}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Should have no violations on the default render for optional single field', async () => {
    const { container } = render(
      <SingleOptionalFieldRenderer
        onChange={() => {}}
        constraints={{}}
        props={{}}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Should have no violations on the default render for single field', async () => {
    const { container } = render(
      <SingleFieldRenderer
        onChange={() => {}}
        constraints={{}}
        props={{}}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Should have no violations on the default render for single field with props', async () => {
    const { container } = render(
      <SingleFieldRenderer
        onChange={() => {}}
        constraints={{}}
        props={{
          value: 'hello',
        }}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

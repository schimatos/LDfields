import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
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
});

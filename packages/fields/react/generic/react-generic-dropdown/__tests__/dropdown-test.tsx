import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { GenericDropdownInput } from '../src';

expect.extend(toHaveNoViolations);

describe('Testing the accessibility of generic dropdown field', () => {
  it('Should have no violations for valid input', async () => {
    const Instance = new GenericDropdownInput('value');
    const { Field } = Instance;
    const { container } = render(
      <Field
        onChange={() => {}}
        constraints={{
          restrictions: {
            value: {
              in: ['1', '2', '3', '4'],
            },
          },
        }}
        props={{
          value: '3',
        }}
        label={'foo'}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('dropdown-input supports tests', () => {
  it('true tests', () => {
    const Instance = new GenericDropdownInput('value');
    expect(Instance.supports({}, {
      restrictions: {
        value: {
          in: [],
        },
      },
    })).toBe(true);
  });
  it('false tests', () => {
    const Instance = new GenericDropdownInput('value');
    expect(Instance.supports({}, {
      restrictions: {
        termType: {
          in: [],
        },
      },
    })).toBe(false);
    expect(Instance.supports({}, {
      restrictions: {
        termType: {
          in: 'hello',
        },
      },
    })).toBe(false);
    expect(Instance.supports({}, {
      restrictions: {
        termType: {},
      },
    })).toBe(false);
    expect(Instance.supports({}, {})).toBe(false);
  });
});

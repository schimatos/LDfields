import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { defaultSettings } from '@ldfields/default-settings';
import { LDfieldRendererFactory } from '../src';

const DefaultSettingRenderer = LDfieldRendererFactory<{ [key: string]: string }>({
  settings: defaultSettings,
  fields: [{
    priority: 0,
    modifies: ['value'],
    fieldTargets: ['value'],
    supports() {
      return true;
    },
    Field() {
      return <input aria-label="value" />;
    },
  }, {
    priority: 0,
    modifies: ['termType'],
    fieldTargets: ['termType'],
    supports() {
      return true;
    },
    Field() {
      return <input aria-label="termType" />;
    },
  }, {
    priority: 0,
    modifies: ['label'],
    fieldTargets: ['label'],
    supports() {
      return true;
    },
    Field() {
      return <input aria-label="label" />;
    },
  }, {
    priority: 0,
    modifies: ['datatype'],
    fieldTargets: ['datatype'],
    supports() {
      return true;
    },
    Field() {
      return <input aria-label="datatype" />;
    },
  }],
  genericFields: [],
  defaultProps: {},
});

expect.extend(toHaveNoViolations);

describe('Testing the accessibility of fields', () => {
  it('Should have no violations on the default render for empty props', async () => {
    const { container } = render(
      <DefaultSettingRenderer
        onChange={() => {}}
        constraints={{}}
        props={{}}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

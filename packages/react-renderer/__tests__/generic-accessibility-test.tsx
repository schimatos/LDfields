import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { defaultSettings } from '@ldfields/default-settings';
import { LDfieldRendererFactory } from '../src';

const DefaultSettingRenderer = LDfieldRendererFactory<{ [key: string]: string }>({
  settings: defaultSettings,
  fields: [],
  genericFields: [class {
    priority = 0;

    fieldFor: string = '';

    get modifies() {
      return [this.fieldFor];
    }

    get fieldTargets() {
      return this.modifies;
    }

    supports() {
      return true;
    }

    Field = () => <input aria-label={this.fieldFor} />;

    constructor(value: string) {
      this.fieldFor = value;
    }
  }],
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

  it('Should have no violations on the default render for namedNode', async () => {
    const { container } = render(
      <DefaultSettingRenderer
        onChange={() => {}}
        constraints={{}}
        props={{
          value: 'http://example.org#Jesse',
          termType: 'NamedNode',
        }}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

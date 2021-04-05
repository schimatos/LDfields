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

    Field = ({ props, onChange }: {
        props: Partial<Record<string, string>>;
        onChange: (value: any) => void;
      }) => (
      <>
        <label htmlFor={this.fieldFor}>{this.fieldFor}</label>
        <input id={this.fieldFor} value={props[this.fieldFor] ?? ''} onChange={onChange} />
      </>
    );

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
    const [value, termType] = container.getElementsByTagName('input');
    expect(value.value).toBe('http://example.org#Jesse');
    expect(termType.value).toBe('NamedNode');
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

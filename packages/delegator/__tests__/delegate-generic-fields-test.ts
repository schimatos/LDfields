import * as BasicInputSrc from '@ldfields/react-generic-basic-input';
import { defaultSettings, defaultSettingsAsRecord } from './data/settings';
import {
  delegate,
  getSortedFields,
} from '../src';

describe('Testing the delegate function on default settings', () => {
  const { selections, modifiable, required } = delegate<{ [key: string]: string }, any, never>(
    {
      value: 'http://example.org',
      termType: 'NamedNode',
    },
    {},
    getSortedFields(defaultSettings, [], [BasicInputSrc.BasicInput]),
    false,
    defaultSettings,
    defaultSettingsAsRecord,
  );

  it('Should have a nontrivial array of selections', () => {
    expect(selections.length).toBeGreaterThanOrEqual(1);
  });

  it('Should have each selection entry as a an instance of basic input', () => {
    for (const selection of selections) {
      expect(selection).toBeInstanceOf(BasicInputSrc.BasicInput);
    }
    expect.assertions(selections.length);
  });

  it('should have each selections editor entries as modifiable', () => {
    for (const selection of selections) {
      for (const modifier of selection.modifies) {
        expect(modifiable[modifier]).toBe(true);
      }
    }
  });

  it('should have each target entry as required', () => {
    for (const selection of selections) {
      if (selection.fieldTargets.length === 1) {
        const fieldFor: string = selection.fieldTargets[0];
        expect(required.includes(fieldFor)).toBe(true);
      }
    }
  });

  it('Should have instansiated the generic field once for each setting', () => {
    // TODO [Future]: Set up mocks correctly so that this test can be run
    // expect(BasicInput).toHaveBeenCalledTimes(defaultSettings.length);
  });
});

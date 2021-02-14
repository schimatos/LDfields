import { defaultSettings, defaultSettingsAsRecord } from './data/settings';
import {
  delegate,
} from '../src';

describe('Testing error handling', () => {
  it('Shoud throw an error when not all necessary fields are available', () => {
    function errorFunc() {
      delegate<{ [key: string]: string }, any, never>(
        {
          value: 'http://example.org',
          termType: 'NamedNode',
        },
        {},
        [],
        false,
        defaultSettings,
        defaultSettingsAsRecord,
      );
    }
    expect(errorFunc).toThrowError(
      new Error('No field selection available when assigning \'value\''),
    );
  });
});

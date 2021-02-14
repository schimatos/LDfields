import { settingsToRecord, getConditions } from '@ldfields/delegator';
import { defaultSettings } from '../src';

describe('Testing for circular dependencies', () => {
  it('Should not have any circular dependencies', () => {
    const defaultSettingsAsRecord = settingsToRecord(defaultSettings);
    expect(() => {
      // This assumes that get conditions maintains the circular condition check
      getConditions(defaultSettings, defaultSettingsAsRecord, {});
    }).not.toThrowError();
  });
});

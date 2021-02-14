import { defaultSettings, defaultSettingsAsRecord } from './data/settings';
import { settingsToRecord } from '../src';

describe('Testing', () => {
  it('Should take an empty array to an empty object', () => {
    expect(settingsToRecord([])).toEqual({});
  });

  it('Handle single setting that is always allowed & required', () => {
    expect(settingsToRecord([{
      fieldFor: 'value',
      condition: { required: true, allowed: true },
    }])).toEqual({
      value: { required: true, allowed: true },
    });
  });

  it('Should take the default settings to the default settings as a record', () => {
    expect(settingsToRecord(defaultSettings)).toEqual(defaultSettingsAsRecord);
  });
});

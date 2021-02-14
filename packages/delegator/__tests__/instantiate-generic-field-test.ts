import { BasicInput } from '@ldfields/react-generic-basic-input';
import { defaultSettings } from './data/settings';
import {
  instantiateGenericFields,
} from '../src/instantiate-generic-fields';

describe('Testing with empty inputs', () => {
  it('Should return an empty array when the settins or generic input array are emtpy', () => {
    expect(instantiateGenericFields([], [])).toEqual([]);
    expect(instantiateGenericFields([])).toEqual([]);
    expect(instantiateGenericFields(defaultSettings)).toEqual([]);
    expect(instantiateGenericFields([], [BasicInput])).toEqual([]);
  });
});

import {
  InputDelegator,
} from '../src';
import * as sortedFieldsSrc from '../src/get-sorted-fields';
import * as settingsRecordSrc from '../src/settings-to-record';

describe('Testing delegator factory', () => {
  const getSortedFieldsSpy = jest.spyOn(sortedFieldsSrc, 'getSortedFields');
  const settingsToRecordSpy = jest.spyOn(settingsRecordSrc, 'settingsToRecord');

  const delegator = new InputDelegator([], []);
  const secondDelegator = new InputDelegator([], []);
  const firstDelegation = delegator.delegate({});
  const secondDelegation = delegator.delegate({});

  const thirdDelegation = secondDelegator.delegate({});
  const fourthDelegation = secondDelegator.delegate({});

  it('Should delegate empty arrays to empty parameters', () => {
    expect(firstDelegation).toEqual({
      delegation: [], modifiable: {}, required: [],
    });
    expect(secondDelegation).toEqual({
      delegation: [], modifiable: {}, required: [],
    });
    expect(thirdDelegation).toEqual({
      delegation: [], modifiable: {}, required: [],
    });
    expect(fourthDelegation).toEqual({
      delegation: [], modifiable: {}, required: [],
    });
  });
  it('Should return the *same object* when there is no change to the delegation result', () => {
    expect(firstDelegation.delegation === secondDelegation.delegation).toEqual(true);
    expect(thirdDelegation.delegation === fourthDelegation.delegation).toEqual(true);
    expect(firstDelegation.delegation !== thirdDelegation.delegation).toEqual(true);
    expect(secondDelegation.delegation !== fourthDelegation.delegation).toEqual(true);
  });
  it('Should only call the sorting and record conversion functions once', () => {
    expect(getSortedFieldsSpy).toHaveBeenCalledTimes(2);
    expect(settingsToRecordSpy).toHaveBeenCalledTimes(2);
  });
});

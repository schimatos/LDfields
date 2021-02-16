import {
  InputDelegatorFactory,
} from '../src';
import * as sortedFieldsSrc from '../src/get-sorted-fields';
import * as settingsRecordSrc from '../src/settings-to-record';

describe('Testing delegator factory', () => {
  const getSortedFieldsSpy = jest.spyOn(sortedFieldsSrc, 'getSortedFields');
  const settingsToRecordSpy = jest.spyOn(settingsRecordSrc, 'settingsToRecord');

  const InputDelegator = InputDelegatorFactory([], []);
  const delegator = new InputDelegator();
  const secondDelegator = new InputDelegator();
  const firstDelegation = delegator.delegate({});
  const secondDelegation = delegator.delegate({});

  const thirdDelegation = secondDelegator.delegate({});
  const fourthDelegation = secondDelegator.delegate({});

  it('Should delegate empty arrays to empty parameters', () => {
    expect(firstDelegation).toEqual({
      // Note that delegationChange is false since the default delegation is [],
      // TODO [FUTURE]: See if this is the *wanted* behavior
      delegation: [], modifiable: {}, required: [], delegationChange: false,
    });
    expect(secondDelegation).toEqual({
      delegation: [], modifiable: {}, required: [], delegationChange: false,
    });
    expect(thirdDelegation).toEqual({
      delegation: [], modifiable: {}, required: [], delegationChange: false,
    });
    expect(fourthDelegation).toEqual({
      delegation: [], modifiable: {}, required: [], delegationChange: false,
    });
  });
  it('Should return the *same object* when there is no change to the delegation result', () => {
    expect(firstDelegation.delegation === secondDelegation.delegation).toEqual(true);
    expect(thirdDelegation.delegation === fourthDelegation.delegation).toEqual(true);
    expect(firstDelegation.delegation !== thirdDelegation.delegation).toEqual(true);
    expect(secondDelegation.delegation !== fourthDelegation.delegation).toEqual(true);
  });
  it('Should only call the sorting and record conversion functions once', () => {
    expect(getSortedFieldsSpy).toHaveBeenCalledTimes(1);
    expect(settingsToRecordSpy).toHaveBeenCalledTimes(1);
  });
  // });
});

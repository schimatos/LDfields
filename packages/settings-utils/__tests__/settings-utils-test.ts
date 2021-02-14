import type {
  InCondition,
  ExistanceCondition,
  NonExistanceCondition,
} from '@ldfields/delegator/types';
import {
  allowedAndSufficient,
  createInCondition,
  createExistanceCondition,
  createNonExistanceCondition,
  generateLDfieldSetting,
} from '../src';

// TODO: Probabily need to add 'it' test in here

describe('Testing in condition creation', () => {
  it('Should create termType in condition', () => {
    const condition: InCondition<'termType'> = {
      fieldFor: 'termType',
      type: 'in',
      options: {
        Literal: true,
      },
    };

    expect(createInCondition('termType', { Literal: true })).toEqual(condition);
  });
});

describe('Testing existance condition creation', () => {
  const condition: ExistanceCondition<'termType'> = {
    fieldFor: 'termType',
    type: 'existance',
  };

  expect(createExistanceCondition('termType')).toEqual(condition);
});

describe('Testing nonxistance condition creation', () => {
  const condition: NonExistanceCondition<'termType'> = {
    fieldFor: 'termType',
    type: 'nonexistance',
  };

  expect(createNonExistanceCondition('termType')).toEqual(condition);
});

describe('Testing testing allowed and sufficient condition creation', () => {
  expect(allowedAndSufficient(true)).toEqual({ allowed: true, required: true });
});

describe('Testing generate ldfield setting function', () => {
  expect(generateLDfieldSetting('value', true)).toEqual({
    fieldFor: 'value',
    condition: {
      allowed: true, required: true,
    },
  });

  expect(generateLDfieldSetting('value', true, [
    createInCondition('termType', { Literal: true }),
  ])).toEqual({
    fieldFor: 'value',
    condition: {
      allowed: true,
      required: [{
        fieldFor: 'termType',
        type: 'in',
        options: {
          Literal: true,
        },
      }],
    },
  });
});

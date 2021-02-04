import * as checkConditionModule from '../src/check-conditions';
import { InCondition, LDfieldSettings } from '../src/types';

function allowedAndSufficient<T>(
  condition: T
) {
  return Object.freeze({
    allowed: condition,
    required: condition,
  });
}

const datatypeCondition: InCondition = Object.freeze({
  type: "in",
  fieldFor: "termType",
  options: Object.freeze({
    Literal: true,
  }),
});

const termTypeCondition: InCondition = Object.freeze({
  type: "in",
  fieldFor: "termType",
  options: {
    BlankNode: true,
    NamedNode: true,
  },
})

const languageCondition: InCondition = Object.freeze({
  type: "in",
  fieldFor: "datatype",
  options: {
    ['rdf.langString']: true,
  },
})

const labelCondition: InCondition = Object.freeze({
  fieldFor: "termType",
  type: "in",
  options: {
    NamedNode: true,
    BlankNode: true,
  },
})


/**
 * The default settings for the LDfield
 */
const defaultSettings: LDfieldSettings = [
  Object.freeze({
    fieldFor: "value",
    condition: allowedAndSufficient(true),
  }),
  Object.freeze({
    fieldFor: "termType",
    condition: allowedAndSufficient(true),
  }),
  Object.freeze({
    fieldFor: "datatype",
    condition: allowedAndSufficient([datatypeCondition]),
  }),
  Object.freeze({
    fieldFor: 'rdf.type',
    condition: allowedAndSufficient([termTypeCondition]),
  }),
  Object.freeze({
    fieldFor: "language",
    condition: allowedAndSufficient([languageCondition]),
  }),
  Object.freeze({
    fieldFor: 'rdfs.label',
    condition: {
      allowed: [labelCondition],
      required: false,
    },
  }),
];

const defaultSettingsAsRecord = {
  "value": allowedAndSufficient(true),
  "termType": allowedAndSufficient(true),
  "datatype": allowedAndSufficient([datatypeCondition]),
  "rdf.type": allowedAndSufficient([termTypeCondition]),
  "language": allowedAndSufficient([languageCondition]),
  "rdfs.label": Object.freeze({
    allowed: [labelCondition],
    required: false,
  })
} as const;

describe('Testing algorithmic complexity', () => {
  it('Make sure that number of calls to singleCheck is <= #totalConditions', () => {
    const singleCheck = jest.spyOn(checkConditionModule, 'singleCheck')
    const check = jest.spyOn(checkConditionModule.getConditions.prototype, 'check')
    
    checkConditionModule.getConditions(
      defaultSettings,
      defaultSettingsAsRecord,
      {
        value: 'Test Value',
        termType: 'Literal'
      }
    )
    // expect(singleCheck).toHaveBeenCalled();
    expect(singleCheck).toHaveBeenCalledTimes(defaultSettings.length);
  })
})

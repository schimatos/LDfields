import type { InCondition, LDfieldSettings } from '../../types';

function allowedAndSufficient<T>(
  condition: T,
) {
  return Object.freeze({
    allowed: condition,
    required: condition,
  });
}

const datatypeCondition: InCondition = Object.freeze({
  type: 'in',
  fieldFor: 'termType',
  options: Object.freeze({
    Literal: true,
  }),
});

const termTypeCondition: InCondition = Object.freeze({
  type: 'in',
  fieldFor: 'termType',
  options: {
    BlankNode: true,
    NamedNode: true,
  },
});

const languageCondition: InCondition = Object.freeze({
  type: 'in',
  fieldFor: 'datatype',
  options: {
    'rdf.langString': true,
  },
});

const labelCondition: InCondition = Object.freeze({
  fieldFor: 'termType',
  type: 'in',
  options: {
    NamedNode: true,
    BlankNode: true,
  },
});

/**
 * The default settings for the LDfield
 */
export const defaultSettings: LDfieldSettings = [
  Object.freeze({
    fieldFor: 'value',
    condition: allowedAndSufficient(true),
  }),
  Object.freeze({
    fieldFor: 'termType',
    condition: allowedAndSufficient(true),
  }),
  Object.freeze({
    fieldFor: 'datatype',
    condition: allowedAndSufficient([datatypeCondition]),
  }),
  Object.freeze({
    fieldFor: 'rdf.type',
    condition: allowedAndSufficient([termTypeCondition]),
  }),
  Object.freeze({
    fieldFor: 'language',
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

export const defaultSettingsAsRecord = {
  value: allowedAndSufficient(true),
  termType: allowedAndSufficient(true),
  datatype: allowedAndSufficient([datatypeCondition]),
  'rdf.type': allowedAndSufficient([termTypeCondition]),
  language: allowedAndSufficient([languageCondition]),
  'rdfs.label': Object.freeze({
    allowed: [labelCondition],
    required: false,
  }),
} as const;

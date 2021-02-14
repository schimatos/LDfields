import type {
  LDfieldSettings,
} from '@ldfields/delegator/types';
import {
  createInCondition,
  generateLDfieldSetting,
} from '@ldfields/settings-utils';

// TODO: Import this from on2ts
const enum rdf {
  type = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  langString = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString'
}

const enum rdfs {
  label = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#label'
}

type PropTerm =
  | 'value'
  | 'termType'
  | 'datatype'
  | 'language'
  | rdf.type
  | rdfs.label

/**
 * The default settings for the LDfield
 */
export const defaultSettings: LDfieldSettings<PropTerm> = [
  generateLDfieldSetting<PropTerm>('value', true),
  generateLDfieldSetting<PropTerm>('termType', true),
  generateLDfieldSetting<PropTerm>('datatype', [
    createInCondition('termType', { Literal: true }),
  ]),
  generateLDfieldSetting<PropTerm>(rdf.type, [
    createInCondition('termType', { BlankNode: true, NamedNode: true }),
  ]),
  generateLDfieldSetting<PropTerm>('language', [
    createInCondition('datatype', { [rdf.langString]: true }),
  ]),
  generateLDfieldSetting<PropTerm>(rdfs.label, [
    createInCondition('termType', { BlankNode: true, NamedNode: true }),
  ], false),
];

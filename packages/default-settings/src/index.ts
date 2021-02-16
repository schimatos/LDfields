import type {
  LDfieldSettings,
} from '@ldfields/delegator/types';
import {
  createInCondition,
  generateLDfieldSetting,
} from '@ldfields/settings-utils';
import type { PropTerm } from '../types';
import { rdf, rdfs } from './enums';

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

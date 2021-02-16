import { defaultSettings as settings } from '@ldfields/default-settings';
import { rdf, rdfs } from '@ldfields/default-settings/lib/enums';
import type { Props } from '@ldfields/default-settings/types';
import { LDfieldRendererFactory } from '@ldfields/react-renderer';
import { fields } from './fields';
import { genericFields } from './generic-fields';

const defaultProps: Props = {
  value: '',
  termType: 'Literal',
  datatype: '',
  language: '',
  [rdf.type]: '',
  [rdfs.label]: '',
};

export default LDfieldRendererFactory({ settings, genericFields, fields, defaultProps });

export {
  fields,
  genericFields,
  settings,
};

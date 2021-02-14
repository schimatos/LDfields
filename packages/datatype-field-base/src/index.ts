import { LDfieldBase } from '@ldfields/field-base';

/**
 * LDField input specifically for datatype inputs
 */
export abstract class DatatypeInput<
  Rendered,
  Props extends {
    termType: string;
    datatype: string;
    value: string;
    [key: string]: string;
  },
  ExtraData = never
> extends LDfieldBase<Rendered, Props, ExtraData> {
  /**
   * The datatype(s) that the field supports.
   */
  abstract supportedDatatypes: Record<string, boolean>;

  /**
   * The field entries that the Datatype input
   * is capable of modifying.
   */
  modifies: (keyof Props & string)[] = ['value'];

  supports(props: Props) {
    return props.termType === 'Literal' && this.supportedDatatypes[props.datatype];
  }
}

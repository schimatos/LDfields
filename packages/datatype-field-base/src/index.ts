import { LDfieldBase } from '@ldfields/field-base';

/**
 * LDField input specifically for datatype inputs
 */
export abstract class DatatypeInput<
  Rendered,
  Props extends {
    termType: string | undefined;
    datatype: string | undefined;
    value: string | undefined;
    [key: string]: string | undefined;
  },
  ExtraData = never
> extends LDfieldBase<Rendered, Props, ExtraData> {
  /**
   * The datatype(s) that the field supports.
   */
  abstract supportedDatatypes: Partial<Record<string, boolean>>;

  /**
   * The field entries that the Datatype input
   * is capable of modifying.
   */
  modifies: (keyof Props & string)[] = ['value'];

  supports({ termType, datatype }: Props) {
    return termType === 'Literal'
      && datatype !== undefined
      && this.supportedDatatypes[datatype] === true;
  }
}

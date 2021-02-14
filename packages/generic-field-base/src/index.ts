import { LDfieldBase } from '@ldfields/field-base';
import type { GenericField } from '@ldfields/field-base/types';

export abstract class LDfieldGenericBase<
  Rendered,
  Props extends { [key: string]: string; },
  ExtraData = never,
> extends LDfieldBase<Rendered, Props, ExtraData> {
  // TODO [Future]: Express what is below as a type constraint.
  // GenericField<Rendered, Props, ExtraData> should be the signature
  // of the constructor.
  // implements GenericField<Rendered, Props, ExtraData>
  constructor(public modifier: keyof Props & string) {
    super();
  }

  get modifies() {
    return [this.modifier];
  }

  // set modifies(value) {
  //   // TODO: see if this can be removed
  //   // or add error handling behavior
  //   // console.log("set modifies called with ", value);
  // }
}

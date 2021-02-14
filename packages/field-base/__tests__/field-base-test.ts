import { LDfieldBase } from '../src';
import { FieldProps } from '../types';

describe('field-base', () => {
  class MyField extends LDfieldBase<string, { [key: string]: string }> {
    Field() {
      return 'RENDERED FIELD';
    }

    modifies = ['a', 'b'];

    supports() {
      return true;
    }
  }

  const MyFieldInstance = new MyField();

  it('Should use the modifies array for targets when targets are not specified', () => {
    expect(MyFieldInstance.fieldTargets).toEqual(['a', 'b']);
  });

  it('Should use targets for fieldTargets when specified', () => {
    const MySecondFieldInstance = new MyField();
    MySecondFieldInstance.targets = ['value'];
    expect(MySecondFieldInstance.fieldTargets).toEqual(['value']);
  });
});

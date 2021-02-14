import { DatatypeInput } from '../src';

// TODO [FUTURE]: More in depth testing

describe('Testing datatype-field-base', () => {
  class MyDatatypeClass extends DatatypeInput<
    string,
    { value: string, datatype: 'xsd:string', termType: 'Literal' }
  > {
    supportedDatatypes = {
      'xsd:string': true,
    }

    Field() {
      return 'FIELD';
    }
  }

  const myInstance = new MyDatatypeClass();

  it('should not support any props without a literal', () => {
    expect(myInstance.supports({
      value: 'test',
      // @ts-expect-error
      termType: 'BlankNode',
      datatype: 'xsd:string',
    })).toBe(false);
    // @ts-expect-error
    expect(myInstance.supports({
      value: 'test',
      datatype: 'xsd:string',
    })).toBe(false);
    expect(myInstance.supports({
      // @ts-expect-error
      termType: 'BlankNode',
      datatype: 'xsd:string',
    })).toBe(false);
    expect(myInstance.supports({
      value: 'test',
      // @ts-expect-error
      termType: 'NamedNode',
      datatype: 'xsd:string',
    })).toBe(false);
  });

  it('should not support any props without a datatype of xsd:string', () => {
    // @ts-expect-error
    expect(myInstance.supports({
      value: 'test',
      termType: 'Literal',
    })).toBe(false);
    // @ts-expect-error
    expect(myInstance.supports({})).toBe(false);
    expect(myInstance.supports({
      termType: 'Literal',
      // @ts-expect-error
      datatype: 'string',
    })).toBe(false);
  });

  it('Should be supported when the termType is literal and the datatype is xsd:string', () => {
    expect(myInstance.supports({ termType: 'Literal', datatype: 'xsd:string', value: 'hello' }))
      .toBe(true);
    // @ts-ignore
    expect(myInstance.supports({ termType: 'Literal', datatype: 'xsd:string' }))
      .toBe(true);
  });
});

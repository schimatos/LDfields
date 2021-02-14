import * as checkConditionModule from '../src/check-conditions';
import * as singleCheckModule from '../src/single-check';
import { defaultSettings, defaultSettingsAsRecord } from './data/settings';

describe('Testing with default LDfield settings', () => {
  it('Should give value and termType field with empty props', () => {
    const { required } = checkConditionModule.getConditions(
      defaultSettings,
      defaultSettingsAsRecord,
      {},
    );

    expect(required).toEqual(['value', 'termType']);
  });
  it('Should create class field with termtype NamedNode', () => {
    const { required, allowed } = checkConditionModule.getConditions(
      defaultSettings,
      defaultSettingsAsRecord,
      {
        value: 'http://example.org#ArminHaller',
        termType: 'NamedNode',
      },
    );

    expect(required).toEqual(['value', 'termType', 'rdf.type']);
    expect(allowed['rdfs.label']).toBe(true);
  });
  it('Should create datatype field with termtype literal', () => {
    const { required } = checkConditionModule.getConditions(
      defaultSettings,
      defaultSettingsAsRecord,
      {
        value: 'http://example.org#ArminHaller',
        termType: 'Literal',
      },
    );

    expect(required).toEqual(['value', 'termType', 'datatype']);
  });
  it('Should create language field with rdf.langString', () => {
    const { required, allowed } = checkConditionModule.getConditions(
      defaultSettings,
      defaultSettingsAsRecord,
      {
        value: 'http://example.org#ArminHaller',
        termType: 'Literal',
        datatype: 'rdf.langString',
      },
    );

    expect(required).toEqual(['value', 'termType', 'datatype', 'language']);
    expect(allowed['rdfs.label']).toBe(false);
  });
});

describe('Testing algorithmic complexity', () => {
  it('Make sure that number of calls to singleCheck is <= #totalConditions', () => {
    const singleCheck = jest.spyOn(singleCheckModule, 'singleCheck');

    checkConditionModule.getConditions(
      defaultSettings,
      defaultSettingsAsRecord,
      {
        value: 'Test Value',
        termType: 'Literal',
      },
    );
    expect(singleCheck).toHaveBeenCalled();
    // TODO: Remove magic number; it should *not* be increased
    expect(singleCheck).toHaveBeenCalledTimes(5);
  });
});

describe('Testing error throwing behavior', () => {
  function erroring() {
    return checkConditionModule.getConditions(
      [{
        fieldFor: 'a',
        condition: {
          allowed: [{
            type: 'existance',
            fieldFor: 'b',
          }],
          required: false,
        },
      }, {
        fieldFor: 'b',
        condition: {
          allowed: [{
            type: 'existance',
            fieldFor: 'a',
          }],
          required: false,
        },
      }],
      {
        a: {
          allowed: [{
            type: 'existance',
            fieldFor: 'b',
          }],
          required: false,
        },
        b: {
          allowed: [{
            type: 'existance',
            fieldFor: 'a',
          }],
          required: false,
        },
      },
      {
        a: 'hello',
        b: 'hello',
      },
    );
  }

  function erroringExtended() {
    return checkConditionModule.getConditions(
      [{
        fieldFor: 'value',
        condition: {
          allowed: true,
          required: true,
        },
      }, {
        fieldFor: 'a',
        condition: {
          allowed: [{
            type: 'existance',
            fieldFor: 'b',
          }],
          required: false,
        },
      }, {
        fieldFor: 'b',
        condition: {
          allowed: [{
            type: 'existance',
            fieldFor: 'a',
          }],
          required: false,
        },
      }],
      {
        a: {
          allowed: [{
            type: 'existance',
            fieldFor: 'b',
          }],
          required: false,
        },
        b: {
          allowed: [{
            type: 'existance',
            fieldFor: 'a',
          }],
          required: false,
        },
        value: {
          allowed: true, required: true,
        },
      },
      {
        a: 'hello',
        b: 'hello',
      },
    );
  }

  it('should throw error on circular reference', () => {
    expect(erroring).toThrowError(new Error('Circular condition involving: a, b'));
  });

  it('should throw error on circular reference (after non circular reference)', () => {
    expect(erroringExtended).toThrowError(new Error('Circular condition involving: a, b'));
  });

  it('should enforce the non existance condition', () => {
    const erroring = () => checkConditionModule.getConditions(
      [...defaultSettings, {
        fieldFor: 'finalField',
        condition: {
          required: [{
            type: 'nonexistance',
            fieldFor: 'value',
          }],
          allowed: true,
        },
      }],
      defaultSettingsAsRecord,
      {
        value: 'Test Value',
        termType: 'Literal',
      },
    );
    expect(erroring).toThrow(
      new Error('field \'finalField\' declared in array settings but not record settings'),
    );
  });

  it('Should throw error on single check with invlid type', () => {
    const erroring = () => singleCheckModule.singleCheck<'foo'>({
      fieldFor: 'foo',
      // @ts-expect-error
      type: 'fooType',
    }, {}, 'required', () => true);
    expect(erroring).toThrowError(new Error('Invalid condition type: fooType'));
  });
});

describe('Testing non existance parameter', () => {
  it('should enforce the non existance condition', () => {
    const { required, allowed } = checkConditionModule.getConditions(
      [...defaultSettings, {
        fieldFor: 'finalField',
        condition: {
          required: [{
            type: 'nonexistance',
            fieldFor: 'value',
          }],
          allowed: true,
        },
      }],
      {
        ...defaultSettingsAsRecord,
        finalField: {
          required: [{
            type: 'nonexistance',
            fieldFor: 'value',
          }],
          allowed: true,
        },
      },
      {
        value: 'Test Value',
        termType: 'Literal',
      },
    );
    expect(allowed.finalField).toBe(true);
    expect(required).toEqual(['value', 'termType', 'datatype']);
  });
});

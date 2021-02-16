import * as BasicInputSrc from '@ldfields/react-generic-basic-input';
import { defaultSettings } from './data/settings';
import {
  getSortedFields,
  InputDelegator,
} from '../src';

describe('Testing the delegate function on default settings', () => {
  const delegator = new InputDelegator(
    defaultSettings,
    [],
    [BasicInputSrc.BasicInput],
  );

  const { delegation, modifiable, required } = delegator.delegate(
    {
      value: 'http://example.org',
      termType: 'NamedNode',
    },
  );

  const blankNodeDelegation = delegator.delegate(
    {
      value: 'http://example.org',
      termType: 'BlankNode',
    },
  );

  it('Should have a nontrivial array of selections', () => {
    expect(delegation.length).toBeGreaterThanOrEqual(1);
    expect(blankNodeDelegation.delegation.length).toBeGreaterThanOrEqual(1);
  });

  it('Should have each selection entry as a an instance of basic input', () => {
    for (const selection of delegation) {
      expect(selection).toBeInstanceOf(BasicInputSrc.BasicInput);
    }
    expect.assertions(delegation.length);
  });
  it('Should have each selection entry as a an instance of basic input [Blank Node]', () => {
    for (const selection of blankNodeDelegation.delegation) {
      expect(selection).toBeInstanceOf(BasicInputSrc.BasicInput);
    }
    expect.assertions(blankNodeDelegation.delegation.length);
  });

  it('should have each selections editor entries as modifiable', () => {
    for (const selection of delegation) {
      for (const modifier of selection.modifies) {
        expect(modifiable[modifier]).toBe(true);
      }
    }
  });

  it('should have each selections editor entries as modifiable [Blank Node]', () => {
    for (const selection of blankNodeDelegation.delegation) {
      for (const modifier of selection.modifies) {
        expect(blankNodeDelegation.modifiable[modifier]).toBe(true);
      }
    }
  });

  it('should have each target entry as required', () => {
    for (const selection of delegation) {
      if (selection.fieldTargets.length === 1) {
        const fieldFor: string = selection.fieldTargets[0];
        expect(required.includes(fieldFor)).toBe(true);
      }
    }
  });

  it('should have each target entry as required [Blank ode]', () => {
    for (const selection of blankNodeDelegation.delegation) {
      if (selection.fieldTargets.length === 1) {
        const fieldFor: string = selection.fieldTargets[0];
        expect(blankNodeDelegation.required.includes(fieldFor)).toBe(true);
      }
    }
  });

  it('Should have instansiated the generic field once for each setting', () => {
    // TODO [Future]: Set up mocks correctly so that this test can be run
    // expect(BasicInput).toHaveBeenCalledTimes(defaultSettings.length);
  });
});

describe('Testing the delegate function on default settings [Using register generic]', () => {
  const delegator = new InputDelegator(
    defaultSettings,
    [],
  );

  delegator.registerGeneric(BasicInputSrc.BasicInput);

  const { delegation, modifiable, required } = delegator.delegate(
    {
      value: 'http://example.org',
      termType: 'NamedNode',
    },
  );

  it('Should have a nontrivial array of selections', () => {
    expect(delegation.length).toBeGreaterThanOrEqual(1);
  });

  it('Should have each selection entry as a an instance of basic input', () => {
    for (const selection of delegation) {
      expect(selection).toBeInstanceOf(BasicInputSrc.BasicInput);
    }
    expect.assertions(delegation.length);
  });

  it('should have each selections editor entries as modifiable', () => {
    for (const selection of delegation) {
      for (const modifier of selection.modifies) {
        expect(modifiable[modifier]).toBe(true);
      }
    }
  });

  it('should have each target entry as required', () => {
    for (const selection of delegation) {
      if (selection.fieldTargets.length === 1) {
        const fieldFor: string = selection.fieldTargets[0];
        expect(required.includes(fieldFor)).toBe(true);
      }
    }
  });

  it('Should have instansiated the generic field once for each setting', () => {
    // TODO [Future]: Set up mocks correctly so that this test can be run
    // expect(BasicInput).toHaveBeenCalledTimes(defaultSettings.length);
  });
});

describe('Testing the delegate function on default settings [Using register field]', () => {
  const delegator = new InputDelegator(
    defaultSettings,
    [],
  );

  delegator.register(...getSortedFields(defaultSettings, [], [BasicInputSrc.BasicInput]));

  const { delegation, modifiable, required } = delegator.delegate(
    {
      value: 'http://example.org',
      termType: 'NamedNode',
    },
  );

  it('Should have a nontrivial array of selections', () => {
    expect(delegation.length).toBeGreaterThanOrEqual(1);
  });

  it('Should have each selection entry as a an instance of basic input', () => {
    for (const selection of delegation) {
      expect(selection).toBeInstanceOf(BasicInputSrc.BasicInput);
    }
    expect.assertions(delegation.length);
  });

  it('should have each selections editor entries as modifiable', () => {
    for (const selection of delegation) {
      for (const modifier of selection.modifies) {
        expect(modifiable[modifier]).toBe(true);
      }
    }
  });

  it('should have each target entry as required', () => {
    for (const selection of delegation) {
      if (selection.fieldTargets.length === 1) {
        const fieldFor: string = selection.fieldTargets[0];
        expect(required.includes(fieldFor)).toBe(true);
      }
    }
  });

  it('Should have instansiated the generic field once for each setting', () => {
    // TODO [Future]: Set up mocks correctly so that this test can be run
    // expect(BasicInput).toHaveBeenCalledTimes(defaultSettings.length);
  });
});

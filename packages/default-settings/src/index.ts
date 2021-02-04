function allowedAndSufficient<T extends LDFieldCondition>(
  condition: T //, priority: number
): LDFieldConditions {
  return {
    allowed: condition,
    required: condition, //, priority
  };
}

/**
 * The default settings for the LDfield
 */
const defaultSettings: LDFieldSettings = [
  Object.freeze({
    fieldFor: "value",
    condition: allowedAndSufficient(true),
  }),
  Object.freeze({
    fieldFor: "termType",
    condition: allowedAndSufficient(true),
  }),
  Object.freeze({
    fieldFor: "datatype",
    condition: allowedAndSufficient([
      {
        type: "in",
        fieldFor: "termType",
        options: {
          Literal: true,
        },
      },
    ]),
  }),
  Object.freeze({
    fieldFor: rdf.type,
    condition: allowedAndSufficient([
      {
        type: "in",
        fieldFor: "termType",
        options: {
          BlankNode: true,
          NamedNode: true,
        },
      },
    ]),
  }),
  Object.freeze({
    fieldFor: "language",
    condition: allowedAndSufficient([
      {
        type: "in",
        fieldFor: "datatype",
        options: {
          [rdf.langString]: true,
        },
      },
    ]),
  }),
  Object.freeze({
    fieldFor: rdfs.label,
    condition: {
      allowed: [
        {
          fieldFor: "termType",
          options: {
            NamedNode: true,
            BlankNode: true,
          },
        },
      ],
      required: false,
    },
  }),
] as const;

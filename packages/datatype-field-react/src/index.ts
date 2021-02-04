export class GenericDatatype extends DatatypeInput {
  priority = 50;

  supportedDatatypes = {
    [xsd.integer]: true,
    [xsd.float]: true,
    [xsd.decimal]: true,
    [xsd.dateTime]: true,
  };

  Field({ props, constraints, onChange }) {
    // TODO: Bring in min count, min length etc.
    return (
      <input
        type={props.datatype === xsd.dateTime ? "dateTime" : "number"}
        value={props.value}
        onChange={(e) => {
          onChange({ value: e.target.value });
        }}
      />
    );
  }
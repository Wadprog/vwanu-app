import React from "react";
import { useFormikContext } from "formik";

// Custom dependencies
import Error from "./Error";
import MultiSelect from "../MultiSelect";
import FieldParams from "./fieldParams";
import { ListItem } from "../../../types";

interface MultiSelectorProps extends FieldParams {
  items: ListItem[];
}
const MultiSelector: React.FC<MultiSelectorProps> = ({
  name,
  items,
  ...otherProps
}) => {
  const { setFieldTouched, setFieldValue, errors, touched } =
    useFormikContext<any>();

  return (
    <>
      <MultiSelect
        items={items}
        onBlur={() => setFieldTouched(name)}
        onSelect={(values: Pick<ListItem, "value">[]) =>
          setFieldValue(name, values)
        }
        {...otherProps}
      />

      <Error
        error={typeof errors[name] === "string" ? errors[name] : undefined}
        visible={typeof touched[name] === "boolean" ? touched[name] : false}
      />
    </>
  );
};

export default MultiSelector;

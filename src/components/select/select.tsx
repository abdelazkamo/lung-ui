import Select, { ActionMeta, SingleValue } from "react-select";

const Selectsearch = (props: {
  label: string;
  items: object[];
  value?: object;
  onChange?:
    | ((newValue: SingleValue<object>, actionMeta: ActionMeta<object>) => void)
    | undefined;
}) => {
  const { label, items } = props;
  return (
    <div>
      <Select
        onChange={props.onChange}
        value={props.value}
        options={items}
        placeholder={label}
        isSearchable
        noOptionsMessage={() => "No city found"}
        // styles={{
        //   control: (provided, state) => ({
        //     ...provided,
        //     borderColor: state.isFocused ? "black" : "grey",
        //     height: "45px",
        //     "&:hover": { borderColor: "black" },
        //   }),
        //   menu: (provided) => ({
        //     ...provided,
        //     backgroundColor: "white",
        //   }),
        //   option: (provided, state) => ({
        //     ...provided,
        //     backgroundColor: state.isSelected ? "#2dd36f" : "transparent",
        //     "&:hover": {
        //       backgroundColor: state.isSelected ? "#2dd36f" : "lightblue",
        //     },
        //   }),
        // }}
      />
    </div>
  );
};

export default Selectsearch;

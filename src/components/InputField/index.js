import { Fragment, useState } from "react";
import { makeStyles } from "@mui/styles";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import { isValidPhoneNumber } from "libphonenumber-js";
import CreatableSelect from "react-select/creatable";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 15,
    "& .MuiInputBase-root.Mui-disabled": {
      // backgroundColor: (props) => props.disabledColor || 'red',
    },
  },
  container: {
    borderColor: "#ccc",
    backgroundColor: (props) => (props.disabled ? "" : props.background),
    height: 44,
  },
  inputLabel: {
    marginTop: "-45px",
    marginLeft: "-15px",
    color: (props) => props.labelColor || "",
    "&.focused": {
      color: "#ccc",
    },
  },
  smallLabel: {
    fontSize: "0.8rem",
    marginTop: -38,
  },
  phoneContainer: {
    backgroundColor: (props) => (props.disabled ? "#eee" : "#fff"),
  },
}));
// React Select Styles

const Input = (props) => {
  const {
    maxLength,
    control,
    name,
    label,
    disabled,
    editable,
    rules,
    type,
    helperText,
    placeholder,
    isPhone,
    isEmail,
    splitCountryCode,
    multiline,
    isSelect,
    isMulti,
    isCreatable,
    selectOptions,
    selectDefaultValue,
    customSelectStyles,
    rows,
    notDisplay,
    startAdornment,
    endAdornment,
    onKeyPress = null,
    onChange = false,
    value = false,
    autoHeight = false,
    isOptionDisabled,
  } = props;
  const customStyles = {
    control: (base, props) => {
      // console.log(props, 'PROPS!!!');
      return {
        ...base,
        height: autoHeight ? "auto" : 44,
        ...(autoHeight ? { paddingTop: 2, paddingBottom: 2 } : {}),
        minHeight: 44,
        fontSize: "0.9rem",
        color: props.isDisabled ? "#fff" : "#aaa",
        backgroundColor: props.isDisabled ? "transparent" : "#fff",
        // borderColor: isError ? "red" : undefined
      };
    },
  };

  const classes = useStyles(props);

  const [showPassword, setShowPassword] = useState(false);
  const [currentCountry, setCurrentCountry] = useState({
    dialCode: "49",
    iso2: "de",
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, isDirty, isTouched } }) => (
        <FormControl
          className={classes.root}
          style={{
            display: notDisplay ? "none" : undefined,
          }}
          fullWidth
        >
          <InputLabel
            shrink={false}
            className={classes.inputLabel}
            style={{ color: error ? "red" : null }}
            htmlFor={name}
            placeholder={placeholder || name}
          >
            {label}
          </InputLabel>
          <Grid container alignItems="center">
            {isPhone ? (
              <Grid item xs={12}>
                <PhoneInput
                  type="tel"
                  placeholder="phone"
                  country={"de"}
                  {...field}
                  onChange={(value, country) => {
                    if (!country?.dialCode || !country?.countryCode) {
                      alert(JSON.stringify(country));
                    }
                    const phoneToSave = splitCountryCode
                      ? value.replace(
                          country?.dialCode,
                          `${country?.dialCode} `
                        )
                      : value;
                    field.onChange(phoneToSave);
                    setCurrentCountry({
                      dialCode: country?.dialCode,
                      iso2: country?.countryCode,
                    });
                  }}
                  isValid={!error}
                  inputStyle={{
                    width: "100%",
                    height: "44px",
                    backgroundColor: disabled ? "transparent" : "white",
                    color: disabled ? "rgba(0, 0, 0, 0.38)" : undefined,
                  }}
                  enableSearch={true}
                  disabled={disabled}
                  editable={editable}
                />
              </Grid>
            ) : isSelect && onChange ? (
              <Grid xs={12} item>
                <Select
                  options={selectOptions}
                  styles={{ ...customStyles, ...customSelectStyles }}
                  {...(onchange ? field : null)}
                  defaultValue={selectDefaultValue}
                  isSearchable
                  isMulti={isMulti}
                  isDisabled={disabled}
                  placeholder={placeholder}
                  onChange={onChange}
                  {...(value ? { value: value } : null)}
                  isOptionDisabled={isOptionDisabled}
                />
              </Grid>
            ) : isCreatable ? (
              <Grid xs={12} item>
                <CreatableSelect
                  options={selectOptions}
                  styles={{ ...customStyles, ...customSelectStyles }}
                  {...field}
                  defaultValue={selectDefaultValue}
                  isSearchable
                  isMulti={isMulti}
                  isDisabled={disabled}
                  placeholder={placeholder}
                  isOptionDisabled={isOptionDisabled}
                />
              </Grid>
            ) : isSelect ? (
              <Grid xs={12} item>
                <Select
                  options={selectOptions}
                  styles={{ ...customStyles, ...customSelectStyles }}
                  {...field}
                  defaultValue={selectDefaultValue}
                  isSearchable
                  isMulti={isMulti}
                  isDisabled={disabled}
                  placeholder={placeholder}
                  isOptionDisabled={isOptionDisabled}
                />
              </Grid>
            ) : (
              <Grid item xs={isPhone ? 8 : 12}>
                <OutlinedInput
                  inputProps={maxLength && { maxLength: maxLength }}
                  className={classes.container}
                  id={name}
                  onKeyPress={onKeyPress}
                  placeholder={placeholder || label}
                  variant="outlined"
                  {...field}
                  disabled={!!disabled}
                  editable={!!editable}
                  fullWidth
                  multiline={multiline}
                  rows={multiline ? (rows ? rows : 4) : undefined}
                  type={
                    type === "password" && showPassword === false
                      ? "password"
                      : type === "password" && showPassword
                      ? "text"
                      : type
                  }
                  error={!!error}
                  startAdornment={
                    startAdornment && (
                      <InputAdornment position="start">
                        {startAdornment}
                      </InputAdornment>
                    )
                  }
                  endAdornment={
                    type === "password" ? (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ) : (
                      <Fragment>
                        {endAdornment && (
                          <InputAdornment position="end">
                            {endAdornment}
                          </InputAdornment>
                        )}
                      </Fragment>
                    )
                  }
                />
              </Grid>
            )}
          </Grid>
          <FormHelperText error={!helperText || !!error}>
            {error ? error.message : helperText ? helperText : null}
          </FormHelperText>
        </FormControl>
      )}
      rules={{
        validate: isPhone
          ? (value) => {
              const isRequired = !!rules?.required;
              const { dialCode, iso2 } = currentCountry;
              if (!isRequired && (!value || value === dialCode)) {
                return true;
              } else if (value && iso2 && dialCode) {
                const isValid = isValidPhoneNumber(value, iso2?.toUpperCase());
                return isValid ? true : "phone number is not valid";
              } else {
                return undefined;
              }
            }
          : type === "email"
          ? (value) => {
              const isRequired = !!rules?.required;
              if (!isRequired && !value) {
                return true;
              } else if (value) {
                const emailRegex =
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; // TODO: update regex
                if (value.match(emailRegex)) {
                  return true;
                } else return "email_is_not_valid";
              } else {
                return false;
              }
            }
          : undefined,
        ...rules,
      }}
      classes={{
        root: {
          marginBottom: "1rem",
        },
      }}
    />
  );
};

Input.defaultProps = {
  editable: true,
  commonUse: true,
  type: "text",
  labelSize: "normal",
  required: true,
};

export default Input;

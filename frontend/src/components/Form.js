import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import React from "react";

import { Icon } from "@iconify/react";
import userAvatar from "@iconify-icons/carbon/user-avatar";
import urlIcon from "@iconify-icons/akar-icons/link-chain";

import closedCaptionAlt from "@iconify/icons-carbon/closed-caption-alt";
import "./Form.css";

const Form = () => {
  const [values, setValues] = React.useState({
    name: "",
    url: "",
    caption: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (event) => {
    const data = JSON.stringify({
      name: values.name,
      url: values.url,
      caption: values.caption,
    });

    const requestOptions = {
      method: "POST",
      body: data,
    };

    fetch("https://xmeme174.herokuapp.com/memes", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <FormControl>
        <div className="field">
          <TextField
            label="Name"
            variant="outlined"
            placeholder="Name"
            value={values.name}
            onChange={handleChange("name")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon
                    icon={userAvatar}
                    style={{ color: "#48147b", fontSize: "40px" }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="field">
          <TextField
            label="Url"
            variant="outlined"
            placeholder="URL"
            value={values.url}
            onChange={handleChange("url")}
            className="field"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon
                    icon={urlIcon}
                    style={{ color: "#48147b", fontSize: "40px" }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="field">
          <TextField
            label="Caption"
            placeholder="Caption"
            variant="outlined"
            value={values.caption}
            className="field"
            onChange={handleChange("caption")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon
                    icon={closedCaptionAlt}
                    style={{ color: "#48147b", fontSize: "40px" }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </FormControl>
    </form>
  );
};

export default Form;

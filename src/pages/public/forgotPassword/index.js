import React from "react";
import PageLayout from "../../../components/layout/PageLayout";
import Form from "./Form";
import Previews from "./Previews";

const ForgotPassword = () => (
  <PageLayout form={<Form />} previews={<Previews />} />
);

export default ForgotPassword;

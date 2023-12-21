import React from "react";
import InvoiceForm from "../components/InvoiceForm";
import { useParams, useLocation } from "react-router-dom";

const Invoice = () => {
  const params = useParams();
  const location = useLocation();
  const isCopy = location.pathname.includes("create");
  const isEdit = location.pathname.includes("edit");
  const invoiceId = params.id;

  return <InvoiceForm isCopy={isCopy} isEdit={isEdit} invoiceId={invoiceId} />;
};

export default Invoice;

import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiPencil, BiTrash } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import InvoiceModal from "../components/InvoiceModal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteInvoice } from "../redux/invoice-slice";
import { useInvoices } from "../hooks/useInvoices";

const InvoiceList = () => {
  const { invoiceList, getOneInvoice } = useInvoices();
  const isListEmpty = invoiceList.length === 0;
  const [copyId, setCopyId] = useState("");
  const navigate = useNavigate();
  const [editMode] = useState(false);
  const [bulk, setBulk] = useState([]);

  const handleCopyClick = () => {
    const invoice = getOneInvoice(copyId);
    if (!invoice) {
      alert("Please enter the valid invoice id.");
    } else {
      navigate(`/create/${copyId}`);
    }
  };

  return (
    <>
      {isListEmpty ? (
        <div className="d-flex flex-column align-items-center h-100 text-blue App d-flex flex-column align-items-center justify-content-center w-100">
          <Alert variant="success">Swipe assignment by Krishna Gopal</Alert>

          <h1 className="fw-bold pb-2 pb-md-4">
            No invoices, Go and Create One
          </h1>
          <Link to="/create">
            <Button variant="primary"> + Create Invoice</Button>
          </Link>
        </div>
      ) : (
        <Row className="flex flex-col h-screen">
          <center>
            <Alert variant="success">
              Swipe assignment by <b>Krishna Gopal</b>
            </Alert>
          </center>
          <Col className="mx-auto px-4">
            <Card className="d-flex p-3 p-md-4 my-3 my-md-4 p-sm-3 border-0 rounded-0">
              <div className="d-flex flex-column">
                <div className="d-flex flex-column flex-md-row py-4 py-md-0 align-items-center justify-content-between">
                  <h3 className="fw-bold pb-2 pb-md-4">Invoice List</h3>
                  <div className="d-flex flex-column flex-sm-row gap-4">
                    <Link to="/create">
                      <Button variant="primary">+ Create New Invoice</Button>
                    </Link>
                    <div className="d-flex border px-2 rounded">
                      <input
                        type="text"
                        value={copyId}
                        onChange={(e) => setCopyId(e.target.value)}
                        placeholder="Enter Invoice ID"
                        className="bg-white border-0"
                        style={{
                          height: "40px",
                          outline: "none",
                        }}
                      />
                      <Button variant="dark" onClick={handleCopyClick}>
                        Copy Invoice
                      </Button>
                    </div>
                  </div>
                </div>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Invoice No.</th>
                      <th>Bill To</th>
                      <th>Due Date</th>
                      <th>Total Amt.</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceList.map((invoice) => (
                      <InvoiceRow
                        key={invoice.id}
                        invoice={invoice}
                        navigate={navigate}
                        editMode={editMode}
                      />
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

const InvoiceRow = ({ invoice, navigate, editMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteClick = (invoiceId) => {
    dispatch(deleteInvoice(invoiceId));
  };

  const handleEditClick = () => {
    navigate(`/edit/${invoice.id}`);
  };

  const openModal = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <tr>
      <td className="flex align-items-center">{invoice.invoiceNumber}</td>
      <td className="fw-norma">{invoice.billTo}</td>
      <td className="fw-normal">{invoice.dateOfIssue}</td>
      <td className="fw-normal">
        {invoice.currency}
        {invoice.total}
      </td>
      <td style={{ width: "5%" }}>
        <Button variant="outline-primary" onClick={handleEditClick}>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <BiPencil />
          </div>
        </Button>
      </td>
      <td style={{ width: "5%" }}>
        <Button variant="danger" onClick={() => handleDeleteClick(invoice.id)}>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <BiTrash />
          </div>
        </Button>
      </td>
      <td style={{ width: "5%" }}>
        <Button variant="secondary" onClick={openModal}>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <BsEyeFill />
          </div>
        </Button>
      </td>
      <InvoiceModal
        showModal={isOpen}
        closeModal={closeModal}
        info={{
          isOpen,
          id: invoice.id,
          currency: invoice.currency,
          currentDate: invoice.currentDate,
          invoiceNumber: invoice.invoiceNumber,
          dateOfIssue: invoice.dateOfIssue,
          billTo: invoice.billTo,
          billToEmail: invoice.billToEmail,
          billToAddress: invoice.billToAddress,
          billFrom: invoice.billFrom,
          billFromEmail: invoice.billFromEmail,
          billFromAddress: invoice.billFromAddress,
          notes: invoice.notes,
          total: invoice.total,
          subTotal: invoice.subTotal,
          taxRate: invoice.taxRate,
          taxAmount: invoice.taxAmount,
          discountRate: invoice.discountRate,
          discountAmount: invoice.discountAmount,
        }}
        items={invoice.items}
        currency={invoice.currency}
        subTotal={invoice.subTotal}
        taxAmount={invoice.taxAmount}
        discountAmount={invoice.discountAmount}
        total={invoice.total}
      />
    </tr>
  );
};

export default InvoiceList;

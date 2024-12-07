import { useState } from "react";
import "./App.css";
import html2pdf from "html2pdf.js";

function formatNumber(num) {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function App() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [iNo, setINo] = useState("");
  const [iDate, setIDate] = useState("");
  const [bankInfo, setBankInfo] = useState("");
  const [swift, setSwift] = useState("");
  const [iban, setIban] = useState("");
  const [items, setItem] = useState([
    {
      description: "",
      quantity: 1,
      rate: 0,
    },
  ]);

  const removeItems = () => {
    if (items.length > 1) {
      setItem((prev) => {
        let copy = [...prev];
        copy.pop();
        return copy;
      });
    }
  };

  const addItems = () => {
    setItem((prev) => {
      return [
        ...prev,
        {
          description: "",
          quantity: 1,
          rate: 0,
        },
      ];
    });
  };

  const updateItem = (index, type, value) => {
    setItem((prev) => {
      const copy = [...prev];
      copy[index][type] = value;
      return copy;
    });
  };

  const handleDownloadPDF = () => {
    const content = document.getElementById("printable");
    const options = {
      margin: 0.5,
      filename: `invoice-00${iNo}.pdf`,
      html2canvas: { scale: 5 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(options).from(content).save();
  };

  const totalPrice = items.reduce((sum, item) => {
    return sum + item.quantity * item.rate;
  }, 0);

  const Invoice = () => {
    return (
      <div id="printable">
        <div className="Invoice_info">
          <div>
            <p className="Name">{name ? name : "Your name"}</p>
            <p className="Address">{address ? address : "Your address"}</p>
          </div>
          <div className="Invoice_sum">
            <p className="InvoiceTitle">INVOICE</p>
            <p className="InvoiceNo">INV-00{iNo}</p>
            <div className="BalanceDue">
              <p>Balance Due</p>
              <p className="TotalDue">${formatNumber(totalPrice)}</p>
            </div>
          </div>
        </div>
        <div className="Billing">
          <div className="to">
            <p>IOG Singaport Pte Ltd</p>
            <p>4 Battery Road</p>
            <p>#25-01 Bank of China Building</p>
            <p>Singapore</p>
            <p>049908</p>
            <p>Singapore</p>
          </div>
          <div className="from">
            <div>
              <span>Invoice Date:</span>
              <span>{iDate ? iDate : "date"}</span>
            </div>
            <div>
              <span>Terms:</span>
              <span>Custom</span>
            </div>
            <div>
              <span>Bank:</span>
              <span>
                {bankInfo
                  ? bankInfo
                  : "Revolut, 1 Canada Square, 29th Floor London E14 5AB United Kingdom"}
              </span>
            </div>
            <div>
              <span>SWIFT/BIC:</span>
              <span>{swift ? swift : "****************"}</span>
            </div>
            <div>
              <span>IBAN:</span>
              <span>{iban ? iban : "**** **** **** ****"}</span>
            </div>
          </div>
        </div>
        <div className="List">
          <table>
            <thead className="thead">
              <tr>
                <th>#</th>
                <th>Description</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.description}</td>
                    <td>{formatNumber(item.quantity * 1)}</td>
                    <td>{formatNumber(item.rate * 1)}</td>
                    <td>{formatNumber(item.quantity * item.rate)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="Total">
          <div></div>
          <div>
            <div className="TotalSum">
              <p>Sub Total</p>
              <p>{formatNumber(totalPrice)}</p>
            </div>
            <div className="TotalSum sec">
              <p>Total</p>
              <p>${formatNumber(totalPrice)}</p>
            </div>
            <div className="TotalSum">
              <p>Balance Due</p>
              <p>${formatNumber(totalPrice)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="Form">
        <h1>Enter data</h1>
        <div className="Input">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="Input">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            rows="4"
            cols="39"
            placeholder="Chelsea, London United Kingdom SW3 England"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>
        <div className="Input">
          <label htmlFor="i-no">Invoice No</label>
          <input
            type="number"
            id="i-no"
            min="0"
            placeholder="11"
            value={iNo}
            onChange={(e) => setINo(e.target.value)}
          />
        </div>
        <div className="Input">
          <label htmlFor="i-date">Invoice Date</label>
          <input
            type="date"
            id="i-date"
            value={iDate}
            onChange={(e) => setIDate(e.target.value)}
          />
        </div>
        <div className="Input">
          <label htmlFor="bank">Bank Information</label>
          <textarea
            id="bank"
            name="bank"
            rows="4"
            cols="39"
            placeholder="Revolut, 1 Canada Square, 29th Floor London E14 5AB United Kingdom"
            value={bankInfo}
            onChange={(e) => setBankInfo(e.target.value)}
          ></textarea>
        </div>
        <div className="Input">
          <label htmlFor="sw">SWIFT/BIC</label>
          <input
            type="text"
            id="sw"
            placeholder="****************"
            value={swift}
            onChange={(e) => setSwift(e.target.value)}
          />
        </div>
        <div className="Input">
          <label htmlFor="in">IBAN</label>
          <input
            type="text"
            id="in"
            placeholder="**** **** **** ****"
            value={iban}
            onChange={(e) => setIban(e.target.value)}
          />
        </div>
        <h1>Items</h1>
        <button onClick={addItems}>add</button>{" "}
        <button onClick={removeItems}>remove</button>
        {items.map((item, index) => {
          return (
            <div key={index} className="ItemInputs">
              <div className="Input">
                <label htmlFor={`des-${index}`} style={{ fontWeight: 700 }}>
                  {index + 1}) Description
                </label>
                <textarea
                  id={`des-${index}`}
                  name={`des-${index}`}
                  rows="4"
                  cols="39"
                  value={item.description}
                  onChange={(e) =>
                    updateItem(index, "description", e.target.value)
                  }
                ></textarea>
              </div>
              <div className="Input">
                <label htmlFor={`qty-${index}`}>Qty</label>
                <input
                  type="number"
                  id={`qty-${index}`}
                  min="0"
                  placeholder="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(index, "quantity", e.target.value)
                  }
                />
              </div>
              <div className="Input">
                <label htmlFor={`rate-${index}`}>Rate</label>
                <input
                  type="number"
                  id={`rate-${index}`}
                  min="0"
                  placeholder="100"
                  value={item.rate}
                  onChange={(e) => updateItem(index, "rate", e.target.value)}
                />
              </div>
            </div>
          );
        })}
        <button className="btn" onClick={handleDownloadPDF}>
          Print
        </button>
      </div>
      <Invoice />
    </div>
  );
}
export default App;

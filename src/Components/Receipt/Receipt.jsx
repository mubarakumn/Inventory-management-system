import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
import './Receipt.css';
import SideBar from "../SideBar/SideBar";

export const Receipt = ({ mode }) => {
  const location = useLocation();
  const data = location.state?.salesData?.items || []; 

  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({ contentRef });

  return (
    <div className={!mode ? "dashboard-container" : "dashboard-container dashboard-container-dark"}>
      <SideBar mode={mode} />
      <main className="flexCol main-content">
        <div className="receipt-container" ref={contentRef}>
          <div className="receipt-content">
            <h2 className="receipt-title">Receipt</h2>
            <div className="receipt-details">
              <p>Shop Name: Your Shop Name</p>
              <p>Date: {new Date().toLocaleDateString()}</p>
              <p>Cashier: {location.state?.salesData?.cashierId || 'N/A'}</p>
              <p>Customer Name: {location.state?.salesData?.customerName || 'N/A'}</p>

            </div>
            {
              data.length === 0 ? (
                <p>No Content To Print</p>
              ) : (
                <table className="receipt-table">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.productName || 'Product'}</td>
                        <td>{item.quantity}</td>
                        <td>&#8358; {item.sellingPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            }
            <div className="receipt-footer">
              <hr />
              <p>Thank you for your purchase!</p>
            </div>
            <style type="text/css" media="print">{"\
              @page { size: 58mm auto; margin: 0; }\
              body { margin: 0; padding: 0; }\
              @media all{.pageBreak{ display: none }}\
              @media print{ .pageBreak{ page-break-before: always}}\
            "}</style>
          </div>
        </div>
        <button className="btn-print" onClick={handlePrint}>Print</button>
      </main>
    </div>
  );
};

export default Receipt;

import axios from 'axios';
import './GenerateReport.css';
import DataTable from 'react-data-table-component';
import { useEffect, useRef, useState } from 'react';
import ToggleMode from '../../Components/ToggleMode/ToggleMode';
import SideBar from '../SideBar/SideBar';
import {useReactToPrint} from 'react-to-print'
import { useUser } from '../../Context/UserContext';

const GenerateReport = ({ mode, toggleMode, toggleView }) => {
  const [saleData, setSaleData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

const userData = useUser();
  useEffect(() => {
    const getSalesData = async () => {
      setLoading(true)
      try {
        const response = await axios.get("http://localhost:4000/sale/getSales", { withCredentials: true});
        if (response) {
          setSaleData(response.data);
          setFilteredData(response.data); // Initialize filtered data
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    };
    getSalesData();
  }, []);

  // handle Chamge
  const handleDateChange = (e)=>{
    const {name, value} = e.target;
    name === "startDate" ? setStartDate(value) : setEndDate(value)
  }
// UseEffect to filter Report
  useEffect(()=>{
    if(startDate && endDate){
      const start = new Date(startDate);
      const end = new Date(endDate)

      end.getHours(23,59,59,999)

      const filtered = saleData.filter(item =>{
        const saleDate = new Date(item.createdAt);
        // console.log(end);
         return saleDate >= start && saleDate <= end 

      })
      // console.log(filtered);
      setFilteredData(filtered) 
    }
  },[startDate, endDate, saleData])

  // Function to calculate profit
  const calculateProfit = (items) => {
    const totalCost = items.reduce((acc, item) => acc + (item.quantity * item.purchasePrice), 0);
    const totalRevenue = items.reduce((acc, item) => acc + item.total, 0); // Assuming 'total' is the revenue for that item
    return totalRevenue - totalCost; // Profit is revenue minus cost
  };

  const contentRef = useRef();
  // function to Export data
  const handleExport = useReactToPrint({ contentRef})
  // Define columns for DataTable
  const columns = [
    {
      name: 'Date',
      selector: row => new Date(row.updatedAt).toLocaleDateString(),
      sortable: true,
    },
    {
      name: 'Quantity Sold',
      selector: row => row.items._id,
      sortable: true,
    },
    {
      name: 'Payment Method',
      selector: row => row.PaymentMethod,
      sortable: true,
    },
    {
      name: 'Total Amount',
      selector: row => row.totalAmount,
      sortable: true,
    },
    {
      name: 'Profit',
      selector: row => calculateProfit(row.items).toFixed(2),
      sortable: true,
    },
  ];

  return (
    <div className="dashboard-container">
      <SideBar role={userData.role} mode={mode} toggleView={toggleView}/>
      <main className="main-content">
        <div className="main-heading">
          <div>
            <h1>Reports</h1>
            <p>Here you can see an overview of your activities and manage settings.</p>
          </div>
          <ToggleMode ischecked={mode} handleMode={toggleMode} />
        </div>
        {/* Search Filter */}
        <div className="search-container">
          <div className='input-group'>
            <div className="input-field">
              <label htmlFor="startDate">Start date</label>
              <input
                name='startDate'
                type="date"
                value={startDate}
                onChange={handleDateChange }
              />
            </div>
            {<h5>to</h5>}
            <div className="input-field">
              <label htmlFor="endDate">End date</label>
              <input
                name='endDate'
                type="date"
                value={endDate}
                onChange={handleDateChange }
              />
            </div>
          </div>
          <button className='btn'onClick={handleExport}>
            Export
          </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="report-container"
            ref={contentRef}
          >
            <h1 style={{display:"none"}}>Report from {startDate} to {endDate}</h1>
            <DataTable
              columns={columns}
              data={filteredData}
              pagination
            />
            </div>
        )}
      </main>
    </div>
  )
}
export default GenerateReport
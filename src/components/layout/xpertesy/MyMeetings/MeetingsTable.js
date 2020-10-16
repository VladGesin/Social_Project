import React from "react";
import Table from "react-bootstrap/Table";
import urlIcon from "./url.svg";
const MeetingsTable = ({
   data,
   rowsAmount,
   activePage,
   isFiltered,
   filteredData,
}) => {
   const indexOfLastItem = activePage * rowsAmount;
   const indexOfFirstItem = indexOfLastItem - rowsAmount;
   let currentPage;
   if (isFiltered) {
      currentPage = filteredData.slice(indexOfFirstItem, indexOfLastItem);
   } else {
      currentPage = data.slice(indexOfFirstItem, indexOfLastItem);
   }

   return (
      <Table responsive dir="rtl" className="meeting-table">
         <thead>
            <tr>
               <th>מארח</th>
               <th>נושא</th>
               <th>תאריך</th>
               <th>שעה</th>
               <th>לינק לפגישה</th>
            </tr>
         </thead>
         <tbody>
            {currentPage.map((m) => (
               <tr>
                  <td>{m.host_name}</td>
                  <td>{m.title}</td>
                  <td>{m.value_date.slice(0, 10)}</td>
                  <td>{m.value_date.slice(11, 16)}</td>

                  <td>
                     <a href={m.link} target="_blank">
                        <img
                           style={{ width: "2rem", height: "2rem" }}
                           src={urlIcon}
                        />
                     </a>
                  </td>
               </tr>
            ))}
         </tbody>
      </Table>
   );
};

export default MeetingsTable;

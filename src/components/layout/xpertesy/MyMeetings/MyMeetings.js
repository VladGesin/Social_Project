import React, { useState, useEffect, useContext } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import MeetingsTable from "./MeetingsTable";
import PaginationComp from "./PaginationComp";
import style from "./MyMeetings.module.scss";
import searchIcon from "./magnifying-glass.svg";
import { DatePicker, TimePicker } from "antd";
import Context from "../../../../store/Context";
import "antd/dist/antd.css";
import moment from "moment";
import api from "../../../../api";

const MyMeetings = () => {
   const context = useContext(Context);
   const [tableData, setTableData] = useState([]);
   const [tableFilteredData, setTableFilteredData] = useState([]);
   const [isFiltered, setIsFiltered] = useState(false);
   const [filterForm, setFilterForm] = useState({
      fromDate: moment(),
      toDate: moment().endOf("month"),
      fromHour: moment(),
      toHour: moment({ hour: 23, minute: 59 }),
      numberOfRows: "6",
   });
   const [activePage, setActivePage] = useState(1);
   const onChangeHandler = (e) => {
      if (
         e.currentTarget.name === "numberOfRows" &&
         Number(e.currentTarget.value) < 1
      )
         return;
      setFilterForm({
         ...filterForm,
         [e.currentTarget.name]: e.currentTarget.value,
      });
   };
   const { RangePicker: DateRangePicker } = DatePicker;
   const { RangePicker: TimeRangePicker } = TimePicker;
   useEffect(() => {
      filterTableHandler();
   }, []);

   const filterTableHandler = async () => {
      const reqObj = {
         fromDate: `${
            filterForm.fromDate.format().split("T")[0]
         } ${filterForm.fromHour.format().split("T")[1].slice(0, 8)}`,
         toDate: `${
            filterForm.toDate.format().split("T")[0]
         } ${filterForm.toHour.format().split("T")[1].slice(0, 8)}`,
      };

      const res = await api.post("/xpertesy/showrooms", reqObj);
      setTableData(res.data.Data);
   };

   const searchHandler = (e) => {
      const filtered = tableData.filter((m) =>
         m.title.includes(e.target.value)
      );
      setTableFilteredData(filtered);
      if (filtered === "") setIsFiltered(false);
      else setIsFiltered(true);
   };

   const onChangeDateHandler = (e) => {
      setFilterForm((cur) => ({
         ...cur,
         fromDate: e ? e[0] : moment(),
         toDate: e ? e[1] : moment(),
      }));
   };

   return (
      <div className={style.container}>
         <h3 className="text-right mr-5">צפייה בפגישות שלי</h3>

         <Form className={` ${style.formContainer}`} dir="rtl">
            <Row className={style.rows}>
               <Col className={`d-flex col-3 ${style.section}`}>
                  <Col className={`text-center col-2 ${style.hideOnMobile}`}>
                     <Form.Label sm="1" className={style.label}>
                        תאריך
                     </Form.Label>
                  </Col>
                  <Col dir="ltr">
                     <DateRangePicker
                        defaultValue={[filterForm.fromDate, filterForm.toDate]}
                        className={style.rangeInput}
                        format="DD-MM-YY"
                        onChange={onChangeDateHandler}
                        placeholder={["תאריך התחלה", "תאריך סיום "]}
                     />
                  </Col>
               </Col>
               <Col className={`d-flex  col-3 ${style.section}`}>
                  <Col className={`text-center col-2 ${style.hideOnMobile}`}>
                     <Form.Label className={style.label}>שעה</Form.Label>
                  </Col>
                  <Col dir="ltr">
                     <TimeRangePicker
                        className={style.rangeInput}
                        format={"HH:mm"}
                        defaultValue={[filterForm.fromHour, filterForm.toHour]}
                        onChange={(e) => {
                           console.log(e);
                           setFilterForm((cur) => ({
                              ...cur,
                              fromHour: e ? e[0] : moment(),
                              toHour: e
                                 ? e[1]
                                 : moment({ hour: 23, minute: 59 }),
                           }));
                        }}
                        placeholder={["שעת התחלה", "שעת סיום "]}
                     />
                  </Col>
               </Col>
               <Col className={`col-1 ${style.btnContainer}`}>
                  <Button variant="success" onClick={filterTableHandler}>
                     סינון
                  </Button>
               </Col>
            </Row>
            <Row className="mt-3">
               <Col className={`d-flex  col-3 ${style.oneLine}`}>
                  <Col className="text-right col-9">
                     <Form.Label className={style.label}>
                        מספר שורות בעמוד
                     </Form.Label>
                  </Col>
                  <Col>
                     <input
                        name="numberOfRows"
                        value={filterForm.numberOfRows}
                        onChange={onChangeHandler}
                        className={`${style.input} ${style.rowAmount}`}
                        type="number"
                        min={1}
                        max={
                           isFiltered
                              ? tableFilteredData.length
                              : tableData.length
                        }
                     />{" "}
                  </Col>
               </Col>
            </Row>
            <Row className="mt-3">
               <Col className={`d-flex  col-3 ${style.oneLine}`}>
                  <Col className="relative">
                     <input
                        className={`${style.input} ${style.search}`}
                        type="text"
                        placeholder="חיפוש"
                        onChange={searchHandler}
                     />
                     <img
                        src={searchIcon}
                        alt="search"
                        className={style.searchIcon}
                     />
                  </Col>
               </Col>
            </Row>
         </Form>
         <Container>
            {tableData.length === 0 ? (
               <h2 style={{ textAlign: "center" }}>לא קיימות פגישות</h2>
            ) : (
               <>
                  <MeetingsTable
                     data={tableData}
                     activePage={activePage}
                     rowsAmount={Number(filterForm.numberOfRows)}
                     isFiltered={isFiltered}
                     filteredData={tableFilteredData}
                  />
                  <PaginationComp
                     dataLength={tableData.length}
                     isFiltered={isFiltered}
                     filteredDataLength={tableFilteredData.length}
                     rowsInPage={Number(filterForm.numberOfRows)}
                     activePage={activePage}
                     setActivePage={setActivePage}
                  />
               </>
            )}
         </Container>
      </div>
   );
};
export default MyMeetings;

import React, {useState} from 'react'
import Card from "react-bootstrap/Card";
import Committees from "../layout/SecretaryWin/ContentManagement/Committees/Committees";


const CommInquiryManagement = () => {
    // const [msg, setMsg] = useState({ msg: "" });
    return (
        <Card className="text-right h-auto mx-auto " height="fit-content !important" style={{ width: "100rem" }}>
        <Card.Header>
        <h2 style={{textAlign: "center"}}>ניהול פניות לועדה</h2>
        </Card.Header>
        <Card.Body>
        {/* <Committees setMsg={setMsg}/> */}
        <Committees/>
        </Card.Body>
        </Card>
    );
};

export default CommInquiryManagement

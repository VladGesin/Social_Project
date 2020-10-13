import React, { Fragment,useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import {Validation} from "../../Validation/Validation";

class commiteerowmap{

    DeleteUser = () =>
    {
        const response = fetch('http://localhost:8080/users/:id', {
         method: 'DELETE',
         body: JSON.stringify({
         })
       });
       const token = response.json();
       console.log(token);
     }
    }
    const Commiteerowmap = (props) =>{
        const [lgShow1, setLgShow1] = useState(false);
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        return (
            <Fragment>
                 <tr>
                    <li className='list-unstyled'>{props.item.index}</li>
                    <td>{props.item.name}</td>
                    <td>{props.item.Email}</td>
                    <td>{props.item.Usertype}</td>
                    <td>
                        <Button onClick={setLgShow1}>מחיקת משתמש</Button>
                    </td>
                </tr>
                <Modal size="lg"
                    show={lgShow1}
                    onHide={() => setLgShow1(false)}
                     dir="rtl">
                    <Modal.Header>מחיקת המשתמש</Modal.Header>
                    <Modal.Body >האם אתה בטוח שאתה רוצה למחוק את המשתמש :
                        <p></p>
                        <>{props.item.name}</>
                        <p></p>
                        <Button onClick={this.DeleteUser()}>כן</Button>
                     </Modal.Body>

                </Modal>
            </Fragment>
        )
    }

export default Commiteerowmap;



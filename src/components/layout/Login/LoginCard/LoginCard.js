import React, { Component, Fragment } from 'react';
import { Redirect } from "react-router";
import { Route } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import mainWin from '../../MainWin/mainWin';

export class LoginCard extends Component {
         handleOnClick = () => {
           // some action...
           // then redirect
           this.setState({ redirect: true });
         };
         render() {
            if (this.state.redirect) {
              return (
                <Redirect push to="src/components/layout/MainWin/mainWin.js"/>
              );
            }
           return (
             <Fragment>
               <Form className="text-right">
                 <Form.Group controlId="formBasicEmail">
                   <Form.Label>תעודת זהות</Form.Label>
                   <Form.Control type="email" placeholder="123456789" />
                   <Form.Text className="text-muted">
                     אתר זה לא ישתף את פרטיך לעולם
                   </Form.Text>
                 </Form.Group>

                 <Form.Group controlId="formBasicPassword">
                   <Form.Label>סיסמא</Form.Label>
                   <Form.Control type="password" placeholder="Password" />
                 </Form.Group>
                 <Form.Group controlId="formBasicCheckbox">
                   <Form.Check type="checkbox" label="השאר אותי מחובר" />
                 </Form.Group>
                 <Route path="mainWin">
                   <Button variant="primary" type="submit" onclick={this.handleOnClick}>
                     כניסה
                   </Button>
                 </Route>
               </Form>
             </Fragment>
           );
         }
       }

export default LoginCard;

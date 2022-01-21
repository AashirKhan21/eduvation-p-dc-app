import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditClassModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'/Class',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ClassID:event.target.ClassID.value,
                ClassName:event.target.ClassName.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }
    render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
            Edit Class
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="ClassID">
                        <Form.Label>ClassID</Form.Label>
                        <Form.Control type="text" name="ClassID" required
                        disabled
                        defaultValue={this.props.classsID} 
                        placeholder="ClassID"/>
                    </Form.Group>

                    <Form.Group controlId="ClassName">
                        <Form.Label>ClassName</Form.Label>
                        <Form.Control type="text" name="ClassName" required 
                        defaultValue={this.props.classsName}
                        placeholder="ClassName"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary mt-3" type="submit">
                            Update Class
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}
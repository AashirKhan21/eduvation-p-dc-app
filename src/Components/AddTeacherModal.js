import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class AddTeacherModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'/Teacher',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                teacherName: event.target.teacherName.value,
                teacherEmail: event.target.teacherEmail.value,
                teacherSalary: event.target.teacherSalary.value
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
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Add Teacher
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="teacherName">
                        <Form.Label>Teacher Name</Form.Label>
                        <Form.Control type="text" name="teacherName" required 
                        placeholder="Teacher Name"/>
                    </Form.Group>

                    <Form.Group controlId="teacherEmail">
                        <Form.Label>Teacher Email</Form.Label>
                        <Form.Control type="text" name="teacherEmail" required 
                        placeholder="Student Program"/>
                    </Form.Group>

                    <Form.Group controlId="teacherSalary">
                        <Form.Label>Teacher Salary</Form.Label>
                        <Form.Control type="text" name="teacherSalary" required 
                        placeholder="Student Email"/>
                    </Form.Group>

                    <Form.Group>
                        <Button  variant="primary mt-3" type="submit" >
                            Add New Teacher
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
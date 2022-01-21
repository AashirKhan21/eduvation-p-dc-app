import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditTeacherModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'/Teacher',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                teacherID:event.target.teacherID.value,
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
    <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
            Edit Student Details
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col md={12}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="teacherID">
                        <Form.Label>Teacher ID</Form.Label>
                        <Form.Control type="text" name="teacherID" required
                        disabled
                        defaultValue={this.props.teacherID} 
                        placeholder="Teacher ID"/>
                    </Form.Group>

                    <Form.Group controlId="teacherName">
                        <Form.Label>Student Name</Form.Label>
                        <Form.Control type="text" name="teacherName" required 
                        defaultValue={this.props.teacherName}
                        placeholder="Teacher Name"/>
                    </Form.Group>

                    <Form.Group controlId="teacherEmail">
                        <Form.Label>Student Program</Form.Label>
                        <Form.Control type="text" name="teacherEmail" required 
                        defaultValue={this.props.teacherEmail}
                        placeholder="Teacher Email"/>
                    </Form.Group>

                    <Form.Group controlId="teacherSalary">
                        <Form.Label>Student Program</Form.Label>
                        <Form.Control type="text" name="teacherSalary" required 
                        defaultValue={this.props.teacherSalary}
                        placeholder="Teacher Salary"/>
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
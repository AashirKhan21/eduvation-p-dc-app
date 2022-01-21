import React,{Component} from 'react'
import { Table } from 'react-bootstrap'
import '../Stylesheets/Class.css'
import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddTeacherModal } from './AddTeacherModal';
import { EditTeacherModal } from './EditTeacherModal';

export class Teacher extends Component {

    //Creating Constructor for Class
    //Creating State for Class
    constructor(props) {
        super(props);
        this.state = {
            teachers: [],
            addModalShow: false,
            editModalShow: false,
        }
    }

    //Creating LifeCycle for Class
    refreshList() {
        fetch(process.env.REACT_APP_API + '/Teacher/')
        .then(response => response.json())
        .then(data => {
            this.setState({teachers:data});
        });
    }
    //Creating Method for Class
    componentDidMount() {
        this.refreshList()
    }
    componentDidUpdate() {
        this.refreshList()
    }

    deleteTeacher(tID) {
        if(window.confirm("Are you sure you want to delete this Teacher?")) {
            fetch(process.env.REACT_APP_API+'/Teacher/' + tID, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then(() => {
                this.refreshList()
            })
        }

    }
    render() {
        //Here we create the variable for Teacher
        const {teachers, teacherID, teacherName, teacherEmail, teacherSalary} = this.state;
        let addModalClose = () => this.setState({addModalShow: false});
        let editModalClose = () => this.setState({editModalShow: false});
        return (
            <div>
                <Table className="mt-4" striped bordered hover size="lg">
                    <thead className="Classtbl">
                        <th>Teacher ID</th>
                        <th>Teacher Name</th>
                        <th>Teacher Email</th>
                        <th>Teacher Salary</th>
                        <th>Options</th>
                    </thead>
                    <tbody>
                        {teachers.map(ts =>
                            <tr key={ts.teacherID}>
                                <td>{ts.teacherID}</td>
                                <td>{ts.teacherName}</td>
                                <td>{ts.teacherEmail}</td>
                                <td>{ts.teacherSalary}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button variant="success"
                                            onClick={() => this.setState({editModalShow: true, 
                                            teacherID: ts.teacherID, 
                                            teacherName: ts.teacherName, 
                                            teacherEmail: ts.teacherEmail, 
                                            teacherSalary: ts.teacherSalary})}
                                            style={{margin: '0 10px 0 10px'}}>
                                             <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit Student
                                        </Button>
                                        <Button className="mr-2" variant="danger"
                                                onClick={()=>this.deleteTeacher(ts.teacherID)}>
                                                <i class="fa fa-trash-o" aria-hidden="true"></i> Delete Student
                                        </Button>
                                        <EditTeacherModal show={this.state.editModalShow} 
                                            onHide={editModalClose} 
                                            tsID={teacherID} 
                                            tsName={teacherName}
                                            tsEmail={teacherEmail}
                                            tsSalary={teacherSalary}
                                            />
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant="primary" 
                            onClick={() => this.setState({addModalShow: true})}>
                        <i class="fa fa-plus-circle" aria-hidden="true"></i> Add New Student
                    </Button>
                    <AddTeacherModal show={this.state.addModalShow}
                                    onHide={addModalClose} />

                </ButtonToolbar>
            </div>
        )
    }
}

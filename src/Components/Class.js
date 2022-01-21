import React,{Component} from 'react'
import { Table } from 'react-bootstrap'
import '../Stylesheets/Class.css'
import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddClassModal } from './AddClassModal';
import { EditClassModal } from './EditClassModal';

export class Class extends Component {

    //Creating Constructor for Class
    //Creating State for Class
    constructor(props) {
        super(props);
        this.state = {
            classes: [],
            addModalShow: false,
            editModalShow: false,
        }
    }

    //Creating LifeCycle for Class
    refreshList() {
        fetch(process.env.REACT_APP_API + '/Class')
        .then(response => response.json())
        .then(data => {
            this.setState({classes:data});
        });
    }
    //Creating Method for Class
    componentDidMount() {
        this.refreshList()
    }
    componentDidUpdate() {
        this.refreshList()
    }

    deleteClass(classsID) {
        if(window.confirm("Are you sure you want to delete this class?")) {
            fetch(process.env.REACT_APP_API + '/Class/' + classsID, {
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
        //Here we create the variable for Class
        const {classes, classID, className} = this.state;
        let addModalClose = () => this.setState({addModalShow: false});
        let editModalClose = () => this.setState({editModalShow: false});
        return (
            <div>
                <Table className="mt-4" striped bordered hover size="lg">
                    <thead className="Classtbl">
                        <th>Class ID</th>
                        <th>Class Name</th>
                        <th>Options</th>
                    </thead>
                    <tbody>
                        {classes.map(classs =>
                            <tr key={classs.ClassID}>
                                <td>{classs.ClassID}</td>
                                <td>{classs.ClassName}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button variant="success"
                                            onClick={() => this.setState({editModalShow: true, 
                                            classID: classs.ClassID, className: classs.ClassName})}
                                            style={{margin: '0 10px 0 10px'}}>
                                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit Class
                                        </Button>
                                        <Button variant="danger"
                                                onClick={()=>this.deleteClass(classs.ClassID)}>
                                                <i class="fa fa-trash-o" aria-hidden="true"></i> Delete Class
                                        </Button>
                                        <EditClassModal show={this.state.editModalShow} 
                                            onHide={editModalClose} 
                                            classsID={classID} classsName={className}/>
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant="primary" 
                            onClick={() => this.setState({addModalShow: true})}>
                        <i class="fa fa-plus-circle" aria-hidden="true"></i> Add Class
                    </Button>
                    <AddClassModal show={this.state.addModalShow}
                                    onHide={addModalClose} />

                </ButtonToolbar>
            </div>
        )
    }
}

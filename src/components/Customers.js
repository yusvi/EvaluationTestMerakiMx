import React, {Component} from 'react';
import {Table, Row, Col, Container, Button, Modal, Form} from 'react-bootstrap'

export class Customers extends Component{
    constructor(props){
        super(props)
        this.state={
            customers:[],
            data:{
                customer_name:null,
                address:null,
                country:null
            },
            show:false
        }

        this.handleChangeCustomer = this.handleChangeCustomer.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangeCountry = this.handleChangeCountry.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {

        this.refreshList()
        
    }
    

    refreshList(){
  
        fetch('http://localhost:3000/customers')
        .then(response => response.json())
        .then((result) => {
            console.log('result', result)
            this.setState({
                customers:result.data.recordset
            })
        })
        .catch((error) => console.log(error));
      
    }


    handleSubmit(event){
        

        console.log('submit!', this.state)
        fetch('http://localhost:3000/customers', {
            method: 'POST',  
            body: JSON.stringify(this.state.data), 
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => {
            console.log('Success:', response)
              
            this.setState(prevState => ({ 
                    ...prevState, show: false 
            }),()=>{
                this.refreshList()
            });

        });


          event.preventDefault();
        
    
    }


    handleChangeCustomer(event) {
        event.persist()

        this.setState(prevState => ({ 
            ...prevState, data:{ ...prevState.data,  customer_name: event.target.value,  } 
        }));
     
    }

    handleChangeAddress(event) {
        event.persist()
        this.setState(prevState => ({ 
            ...prevState, data:{ ...prevState.data,  address: event.target.value,  } 
        }));
     
    }

    handleChangeCountry(event) {
        event.persist()
        this.setState(prevState => ({ 
            ...prevState, data:{ ...prevState.data,  country: event.target.value,  } 
        }));
     
    }

    render(){

        const {customers} = this.state
        const {show} = this.state

        const handleClose = () => this.setState({
            show:false
        });
        const handleShow = () => this.setState({
            show:true
        });

        return(
            <div className="mt-5 d-flex justify-content-left">

                <Container fluid="md">

                    <Row>
                        <Col sm="12">
                            <h3>Clientes</h3>
                        </Col>

                        
                        <Col sm="12">
                            <Button variant="primary"  onClick={handleShow} >Nuevo</Button>


                             <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Modal heading</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                    <Form onSubmit={this.handleSubmit}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Customer name</Form.Label>
                                            <Form.Control type="text" required  placeholder="Enter name"    
                                            onChange={this.handleChangeCustomer}  />                                     
                                        </Form.Group>

                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control  type="text" required  placeholder="Enter address" 
                                             onChange={this.handleChangeAddress}/>
                                        </Form.Group>

                                        <Form.Group controlId="formBasicPrice">
                                            <Form.Label>Country</Form.Label>
                                            <Form.Control required type="text"  placeholder="Enter country"
                                            onChange={this.handleChangeCountry} />
                                        </Form.Group>
                                       
                                        <Button variant="primary" type="submit">
                                            Submit
                                        </Button>
                                    </Form>
                                
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                
                                </Modal.Footer>
                            </Modal>
                      
                        </Col>


                        <Col sm="12">
                            <Table className="mt-4" striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Customer name</th>
                                        <th>Address</th>
                                        <th>Country</th>
                                    </tr>
                                </thead>
                                <tbody>
                
                                    {customers.map(item=>                                
                                        <tr key={item.id}>
                                            <td>{item.id}</td>    
                                            <td>{item.customer_name}</td> 
                                            <td>{item.address}</td>  
                                            <td>{item.country}</td>  
                                        </tr>
                                    )} 

                                </tbody>
                            </Table>
                        </Col>

                    </Row>
                    
                </Container>           

            </div>
        )
    }
}
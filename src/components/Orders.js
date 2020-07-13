import React, {Component} from 'react';
import {Table, Row, Col, Container, Button, Modal, Form} from 'react-bootstrap'


export class Orders extends Component{
    constructor(props){
        super(props)
        this.state={
            orders:[],
            data:{
                customer_name:null,
                product_name:null,
                customer_id:null,
                product_id:null,
                quantity:null,
                order_date:null,
                total:null
            },
            show:false,
            products:[],
            customers:[]
        }

        this.handleChangeCustomer = this.handleChangeCustomer.bind(this);
        this.handleChangeProduct = this.handleChangeProduct.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
        this.handleChangeTotal = this.handleChangeTotal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {

    this.refreshList()
    this.refreshComboProducts()
    this.refreshComboCustomers()
        
  
    }
    

    refreshList(){
  
        fetch('http://localhost:3000/orders')
        .then(response => response.json())
        .then((result) => {
            console.log('result', result)
            this.setState({
                orders:result.data.recordset
            })
        })
        .catch((error) => console.log(error));
      
    }

    refreshComboProducts(){
  
        fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then((result) => {
            console.log('result', result)
            this.setState(prevState => ({ 
                    ...prevState, products: result.data.recordset 
            }))
        })
        .catch((error) => console.log(error));
      
    }

    refreshComboCustomers(){
  
        fetch('http://localhost:3000/customers')
        .then(response => response.json())
        .then((result) => {
            console.log('result', result)
            this.setState(prevState => ({ 
                    ...prevState, customers: result.data.recordset 
            }))
        })
        .catch((error) => console.log(error));
      
    }


    handleSubmit(event){
        

        console.log('submit!', this.state)
        fetch('http://localhost:3000/orders', {
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


        console.log('event customer', JSON.parse(event.target.value))
        this.setState(prevState => ({ 
            ...prevState, data:{ ...prevState.data,  
                customer_name: JSON.parse(event.target.value).customer_name, 
                customer_id: JSON.parse(event.target.value).id  } 
        }));
     
    }

    handleChangeProduct(event) {
        event.persist()


        this.setState(prevState => ({ 
            ...prevState, data:{ ...prevState.data,  
                product_name: JSON.parse(event.target.value).product_name, 
                product_id: JSON.parse(event.target.value).id  } 
        }));
     
    }

    handleChangeQuantity(event) {
        event.persist()
        this.setState(prevState => ({ 
            ...prevState, data:{ ...prevState.data,  quantity: event.target.value,  } 
        }));
     
    }

    handleChangeDate(event) {
        event.persist()
        this.setState(prevState => ({ 
            ...prevState, data:{ ...prevState.data,  order_date: event.target.value,  } 
        }));
     
    }

    handleChangeTotal(event) {
        event.persist()
        this.setState(prevState => ({ 
            ...prevState, data:{ ...prevState.data,  total: event.target.value,  } 
        }));
     
    }

    render(){

        const {orders, customers, products} = this.state
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
                            <h3>Ordenes</h3>
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
                                            <Form.Control as="select" type="text" required  placeholder="Enter name"
                                            onChange={this.handleChangeCustomer} >
                                                <option value={null}>Ninguno</option>
                                            {customers.map(item=>                                    
                                                <option value={JSON.stringify(item)} key={item.id}>{item.customer_name}</option>
                                            )}
                                            </Form.Control>                                    
                                        </Form.Group>

                                        <Form.Group controlId="formBasicEmail2">
                                            <Form.Label>Product</Form.Label>
                                            <Form.Control as="select" type="text" required  placeholder="Enter name"
                                            onChange={this.handleChangeProduct} >
                                                <option value={null}>Ninguno</option>
                                            {products.map(item=>                                    
                                                <option value={JSON.stringify(item)} key={item.id}>{item.product_name}</option>
                                            )}
                                            </Form.Control>                                    
                                        </Form.Group>


                                        <Form.Group controlId="formBasicDate">
                                            <Form.Label>Order date</Form.Label>
                                            <Form.Control  type="date" required  placeholder="Enter date" 
                                             onChange={this.handleChangeDate}/>
                                        </Form.Group>


                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Quantity</Form.Label>
                                            <Form.Control  type="number" required  placeholder="Enter quantity" 
                                             onChange={this.handleChangeQuantity}/>
                                        </Form.Group>

                                        <Form.Group controlId="formBasicPrice">
                                            <Form.Label>Total</Form.Label>
                                            <Form.Control required type="text"  placeholder="Enter total"
                                            onChange={this.handleChangeTotal} />
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
                                        <th>Order date</th>
                                        <th>Customer name</th>
                                        <th>Product name</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                
                                    {orders.map(item=>                                
                                        <tr key={item.id}>
                                            <td>{item.id}</td>  
                                            <td>{item.order_date}</td>  
                                            <td>{item.customer_name}</td> 
                                            <td>{item.product_name}</td>  
                                            <td>{item.quantity}</td>  
                                            <td>{item.total}</td>  
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
import React, {Component} from 'react';
import {Table, Row, Col, Container, Button, Modal, Form} from 'react-bootstrap'

export class Products extends Component{

    constructor(props){
        super(props)
        this.state={
            products:[],
            data:{
                product_name:null,
                category:null,
                price:null
            },            
            show: false
        }
        this.handleChangeProduct = this.handleChangeProduct.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {

    this.refreshList()
        
  
    }
    

    refreshList(){
  
        fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then((result) => {
            console.log('result', result)
            this.setState({
                products:result.data.recordset
            })
        })
        .catch((error) => console.log(error));
      
    }

    handleSubmit(event){
        

        console.log('submit!', this.state)
        fetch('http://localhost:3000/products', {
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


    handleChangeProduct(event) {
        event.persist()

        this.setState(prevState => ({ 
            ...prevState, data:{ ...prevState.data,  product_name: event.target.value,  } 
        }));
     
    }

    handleChangeCategory(event) {
        event.persist()
        this.setState(prevState => ({ 
            ...prevState, data:{ ...prevState.data,  category: event.target.value,  } 
        }));
     
    }

    handleChangePrice(event) {
        event.persist()
        this.setState(prevState => ({ 
            ...prevState, data:{ ...prevState.data,  price: event.target.value,  } 
        }));
     
    }


    render(){

        const {products} = this.state
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
                            <h3>Productos</h3>
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
                                            <Form.Label>Product name</Form.Label>
                                            <Form.Control type="text" required  placeholder="Enter name"    
                                            onChange={this.handleChangeProduct}  />                                     
                                        </Form.Group>

                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Category</Form.Label>
                                            <Form.Control  type="text" required  placeholder="Enter category" 
                                             onChange={this.handleChangeCategory}/>
                                        </Form.Group>

                                        <Form.Group controlId="formBasicPrice">
                                            <Form.Label>Price</Form.Label>
                                            <Form.Control required type="number"  placeholder="Enter price"
                                            onChange={this.handleChangePrice} />
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
                                        <th>Product name</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                
                                    {products.map(item=>                                
                                        <tr key={item.id}>
                                            <td>{item.id}</td>  
                                            <td>{item.product_name}</td>  
                                            <td>{item.category}</td>  
                                            <td>{item.price}</td>  
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
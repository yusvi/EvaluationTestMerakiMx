import React, {Component} from 'react';
import {Table, Row, Col, Container} from 'react-bootstrap'

export class Orders extends Component{
    constructor(props){
        super(props)
        this.state={orders:[]}
    }


    componentDidMount() {

    this.refreshList()
        
  
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

    render(){

        const {orders} = this.state

        return(
            <div className="mt-5 d-flex justify-content-left">

                <Container fluid="md">

                    <Row>
                        <Col sm="12">
                            <h3>Ordenes</h3>
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
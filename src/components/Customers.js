import React, {Component} from 'react';
import {Table, Row, Col, Container} from 'react-bootstrap'

export class Customers extends Component{
    constructor(props){
        super(props)
        this.state={customers:[]}
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

    render(){

        const {customers} = this.state

        return(
            <div className="mt-5 d-flex justify-content-left">

                <Container fluid="md">

                    <Row>
                        <Col sm="12">
                            <h3>Clientes</h3>
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
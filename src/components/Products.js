import React, {Component} from 'react';
import {Table, Row, Col, Container} from 'react-bootstrap'

export class Products extends Component{

    constructor(props){
        super(props)
        this.state={products:[]}
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

    render(){

        const {products} = this.state

        return(
            <div className="mt-5 d-flex justify-content-left">

                <Container fluid="md">

                    <Row>
                        <Col sm="12">
                            <h3>Productos</h3>
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
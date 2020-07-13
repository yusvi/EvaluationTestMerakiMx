import React, {Component} from 'react';
import {Row, Col, Container, Button} from 'react-bootstrap'

export class Home extends Component{
    render(){

        const list1 = [1,2,4]; 
        const list2 = [1,3,4]; 

        var output=[]
        list1.map((item, index)=>{
            output.push(list1[index])
            output.push(list2[index])
        })

        return(
            <div className="mt-5 d-flex justify-content-left">

                <Container fluid="md">

                    <Row >
                        <Col sm="12">
                            <h3>Home</h3>
                        </Col>
                        <Col sm="12" className="mt-3 justify-content-left">
                            <h5>List 1: {list1}</h5>
                            <h5>List 2: {list2}</h5>
                        </Col>
                        <Col sm="12" className="mt-3 justify-content-left">
                        <h5>Output: {output}</h5>
                        </Col>
                    </Row>
                </Container>   
        
            </div>
        )
    }
}
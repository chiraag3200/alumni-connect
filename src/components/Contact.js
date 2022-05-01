import React, { Component } from 'react'

export default class Contact extends Component {

    componentDidMount() {
    document.body.style.backgroundColor = "#6b5b95";
    document.body.style.textAlign = 'center'
    document.body.style.fontWeight = 'bold'
    document.body.style.fontSize = 18
    document.body.style.marginTop = 0
    document.body.style.width = 200
    }

    render() {
        return (
            <div >
                <h1> Contact us</h1>
                <div> 91-8047096430 </div>
                <div> help@alumniconnect.com </div>
                <h1> Registered Office</h1>
                <div> GaragePreneurs Internet Pvt Ltd </div>
                <div> 747, Pooja Building, </div>
                <div> 80ft Road, 4th Block, </div>
                <div> Koramangala </div>
                <div> Bangalore - 560034 </div>
            </div>
        )
    }
}

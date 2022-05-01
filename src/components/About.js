import React, { Component } from 'react'

export default class About extends Component {


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
            <div>
                <h2> Alumni Connect is a service that can be used by the current and the former students of a college making it very easy to 
                     retrieve data of other students. Students can interact with each other easily, they can ask for help if they need and also 
                     seek referrals whenever they need.
                </h2>
            </div>
        )
    }
}

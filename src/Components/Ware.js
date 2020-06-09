import React from 'react';
import './IndexPage.css';
import {connect} from "react-redux";
import { ADD_ITEM, REMOVE_ITEM } from './Actions';
import reducer from "./Reducer"
import whiteplus from "./Images/whiteplus.svg"
import whiteminus from "./Images/whiteminus.svg"


class Ware extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }


    render() {

        let amountcalc = () => {
           let arr =  this.props.contents.map(a => {
                if (a.id === this.props.id) {
                    return a.amount}})
            for (let elem of arr) {
                if (typeof elem === "number") {
                    return elem
                }
            }
        }

        let addbutton = () => {
            return <button onClick={() => this.props.add()} className="addbutton">Add to cart</button>
        }

        let plusminusbutton = () => {
            return (<div className="plusminusbutton">
                <div className="iter-div" onClick={() => this.props.decrease()}>
                    <img src={whiteminus}  className="iter" />
                </div>
                <span className="ware-amount">{this.props.contents.map(obj => {
                    if (obj.id === this.props.id) {
                        return obj.amount
                    }
                })}</span>
                <div className="iter-div" onClick={() => this.props.add()}>
                    <img src={whiteplus} className="iter" />
                </div>
            </div>

            )
        }
        return (
            <div className="ware-wrapper">
                <div className="image-wrap">
                    <img src={this.props.wareImage} className="ware-image" />
                </div>
                <div className="ocean">
                    <div className="ware-title">{this.props.wareTitle}</div>
                    <div className="button-flex">
                        ${this.props.price}
                        { amountcalc() > 0 ? plusminusbutton() : addbutton()}
                    </div>
                </div>
            </div>
        )
    }
}

//this.props.dispatch({type:ADD_ITEM}

const mapStateToProps = (state) => {
    return {
        count: state.count,
        contents: state.contents

    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    console.log(ownProps)
    console.log(ownProps.contents.id)
    const id = ownProps.contents.id
    const contents = ownProps.contents
    return {
        add: () => dispatch({
            type: ADD_ITEM,
            payload: {
                id: id,
                contents: contents,
            }
        }),
        decrease: () => dispatch({
            type: REMOVE_ITEM,
            payload: {
                id: id,
                contents: contents,
            }
        }),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Ware)
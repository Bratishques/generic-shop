import React from 'react';
import "./Cart.css"
import { connect } from 'react-redux';
import {ADD_ITEM, REMOVE_ITEM, RESET, DELETE_ITEM} from './Actions'
import minus from "./Images/minus.svg"
import plus from "./Images/plus.svg"
import trash from "./Images/trash.svg"


class CartItem extends React.Component {
    render() {
        let pricecalc = (amount, price) => {
            return amount*price
        }
        return (
                <div className="cart-item">
                    <div className="cart-image-wrap">
                        <img className="cart-image" src={this.props.img} />
                    </div>
                    <div className="cart-info">
                        <div className="cart-info-title">{this.props.title}</div>
                        <div className="cart-bottom-flex">
                            <span className="calc-span">$ {(pricecalc(this.props.amount, this.props.price)).toFixed(2)}</span>
                            <div className="adder">
                                <button  className="increm"  onClick={()=>this.props.decrease()}  disabled={this.props.amount === 0 ? true : false}><img src={minus}></img></button>
                                <span className="amount-span">{this.props.amount}</span>
                                <img className="increm" src={plus} onClick={()=>this.props.add()}></img>
                            </div>
                            <img className="trash" src={trash} onClick={()=>this.props.delete()}></img>
                        </div>
                    </div>
                </div>
            )
    }
}

const mapStateToProps = (state) =>{
    return { 
        count: state.count,

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
        delete: () => dispatch({
            type: DELETE_ITEM,
            payload: {
                id: id,
                contents: contents,
            }
        })
    }
}


export default connect(mapStateToProps,mapDispatchToProps) (CartItem)
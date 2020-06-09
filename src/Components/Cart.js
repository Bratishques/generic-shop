import React from 'react';
import "./Cart.css"
import { connect } from 'react-redux';
import {ADD_ITEM, REMOVE_ITEM, RESET} from './Actions'
import CartItem from "./CartItem"


class Cart extends React.Component {
    render() {

  
        let empty = () => {
            return (
                <div className="cart-title">You Bought Nothing, Why?</div>
            )
        }
        
        let bag = () => {
            return (
                <div className="cart-title">Your Cart</div>
            )
        }
        let total = () => {
        return (
            this.props.contents.map(a => {
              return <CartItem key ={a.id} img={a.img} price={a.price} contents={a} 
              amount={a.amount} title={a.title}/>
            })
        )
        }

        let checkout =() => {
            return (
                <div className = "checkout-wrap">
                <div className >Total: {this.props.total <= 0 ? (0).toFixed(2) : (this.props.total).toFixed(2)} USD</div> 
                <button className="clear-button">Checkout</button>
                <button className="clear-button" onClick={()=>this.props.dispatch({type:RESET})}>Clear Cart</button>
                </div>
            )
        }
        return(
            <div  className = "cart-wrap">
                {this.props.contents.length !== 0 ? bag() : null}

                {this.props.contents.length === 0 ? empty() : total()}

                {this.props.contents.length !== 0 ? checkout()  : null}

            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return { 
        count: state.count,
        contents: state.contents,
        total: state.total

    }
}




export default connect(mapStateToProps) (Cart)
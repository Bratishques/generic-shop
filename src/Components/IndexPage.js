import React from 'react';
import './IndexPage.css';
import {connect} from "react-redux";
import { ADD_ITEM, RESET } from './Actions';
import reducer from "./Reducer"
import Ware from "./Ware"
import products from "./Products"



function IndexPage() {

    return (
        <div className="index-wrapper">
            <div className="index-title">Welcome, stranger!</div>
            <div className="wares">

                {products.map((i) => {
                    return (<Ware wareImage={i.img} id ={i.id} key ={i.id} wareTitle= {i.title} wareText = {i.description} price={i.price} contents={i} />)
                })}
            </div>
        </div>
    )
}


const mapStateToProps = (state) =>{
    return { 
        count: state.count

    }

  }
export default connect(mapStateToProps) (IndexPage)
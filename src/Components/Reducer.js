import {ADD_ITEM, REMOVE_ITEM, RESET, DELETE_ITEM} from './Actions'
import products from "./Products"



export default function reducer(state,action) {
  let itemCheck = (id) => {
    for (let elem of state.contents) {
      if (elem.id === id) return false
    }
    return true
}
  let increaseAmount = (contents) => {
    contents.amount = contents.amount + 1
    return contents
  }

  let decreaseAmount = (contents) => {
    contents.amount = contents.amount - 1
    return contents
  }

  let resetAmount = (contents) => {
    contents.amount = 0
    return contents
  }

 
  let calccount = (arr) => {
  let i = 0  
  for (let elem of arr) {
    if (elem.amount > 0) {
      i++
    }
  }
    

    return i
  }




    console.log(state,action)
    if (action.type === ADD_ITEM && itemCheck(action.payload.id)) {
      
      return {...state,
        contents: [...state.contents, increaseAmount(action.payload.contents)],
        total: state.total + action.payload.contents.price,
        count: state.count + 1,
      }
    }

    if (action.type === ADD_ITEM && !itemCheck(action.payload.id)) {

      if (action.payload.contents.amount === 0) {
        return {...state,
          contents: state.contents.map(obj => {
            if (obj.id === action.payload.id) {
              return increaseAmount(obj)
            }
            return obj
          }),
          total: state.total + action.payload.contents.price,
          count: calccount(state.contents),
        }

      }
      return {...state,
        contents: state.contents.map(obj => {
          if (obj.id === action.payload.id) {
            return increaseAmount(obj)
          }
          return obj
        }),
        total: state.total + action.payload.contents.price,
        count: calccount(state.contents)
      }
    }
  
 
    if (action.type === REMOVE_ITEM && action.payload.contents.amount === 1) {
      console.log(state.contents)
      return {...state,
        contents: state.contents.map(obj => {
          if (obj.id === action.payload.id) {
            return decreaseAmount(obj)
          }
          return obj
        }),
        total: state.total - action.payload.contents.price,
        count: calccount(state.contents)
      }
    }
    if (action.type === REMOVE_ITEM) {
      console.log(state.contents)
      return {...state,
        contents: state.contents.map(obj => {
          if (obj.id === action.payload.id) {
            return decreaseAmount(obj)
          }
          return obj
        }),
        total: state.total - action.payload.contents.price,
        count: calccount(state.contents)
      }
    }

    if (action.type === DELETE_ITEM && action.payload.contents.amount === 0) {
      console.log(state.contents)
      return {...state,
        contents: state.contents.filter(a => a.id != action.payload.id),
        count: calccount(state.contents)
      }
    }

    if (action.type === DELETE_ITEM) {
      console.log(state.contents)
      return {...state,
        total: state.total - (action.payload.contents.price * action.payload.contents.amount),
        contents: state.contents.filter(a => {
          if (a.id === action.payload.id) {
            resetAmount(a)
          }
          if (a.id != action.payload.id) {
            return a
          }}),
          count: calccount(products),

      }
    }

    

    if (action.type === RESET) {
      console.log(state.contents)
      
      return {...state,
        count: 0,
        contents: state.contents.filter(a => {
          resetAmount(a)
        }),
        total: 0}
    }
    return state
  }
import { createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  isLogin: true,
  isAdmin: true,
  username: "",
  theme: false,
  isEnterContest: false,
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return {...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store

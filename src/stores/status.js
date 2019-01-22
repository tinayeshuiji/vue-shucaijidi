const state = {
    index:0
   
  }
  const getters = {
    getmatch: state => {
      return state.readmatch
    }
  }
  const actions = {}
  
  const mutations = {
    changeIndex(state,data) {
        console.log(data)
      state.index = data
    },
  
  
  
  
  }
  export default {
    state,
    getters,
    actions,
    mutations
  }
  
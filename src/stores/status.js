const state = {
  navIndex:0,
    showBottomNav:true
   
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
      state.navIndex = data
    },
    changeBottomNav(state,data){
      state.showBottomNav = data
    }
  
  
  
  
  }
  export default {
    state,
    getters,
    actions,
    mutations
  }
  
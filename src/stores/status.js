const state = {
  navIndex:0,
    showBottomNav:true,
    showHeaderNav:true,
   
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
    },
    changeHeaderNav(state,data){
      state.showHeaderNav = data
    }
  
  
  
  
  }
  export default {
    state,
    getters,
    actions,
    mutations
  }
  
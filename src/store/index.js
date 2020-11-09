import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    productos: []
  },
  mutations: {
    GET_DATA_PRODUCTOS(state, productos){
      state.productos = productos
    }
  },
  actions: {
     getDataProductos({ commit }) {
      firebase
        .firestore()
        .collection("productos")
        .onSnapshot((onSnapshot) => {
          let productos = []
          onSnapshot.forEach(p => {
            productos.push({ id: p.id, data: p.data() });
          });
          commit('GET_DATA_PRODUCTOS', productos)
        });
    },
    agregarProducto({ commit }, producto) {
      firebase
      .firestore()
      .collection("productos")
      .add(producto);
    },
    
    updateProducto({ commit }, producto) {
        firebase
        .firestore()
        .collection("productos")
        .doc(producto.id)
        .update(producto.data);
      },
      eliminarProducto({commit}, id){
        firebase
        .firestore()
        .collection("productos")
        .doc(id)
        .delete();
      }
  },
  getters: {
    getProductoUpdating: (state) => (id) => {
      return state.productos.find(p => p.id === id)
    
  },

  },
    
  modules: {},
});

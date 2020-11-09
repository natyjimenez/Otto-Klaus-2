<!-- Template -->
<template>
  <div class="container">
    <!-- Botón Logout -->
    <button @click="logout" class="btnLogout">Logout</button>
    <!-- Tabla para Leer Información -->
    <h4 class="titleTable">Stock de productos</h4>
    <table class="table">
      <thead>
        <th>Código</th>
        <th>Nombre</th>
        <th>Stock</th>
        <th>Precio</th>
        <th>Acciones</th>
      </thead>

      <tbody>
        <tr v-for="(producto, i) in productos" :key="i">
          <td>{{ producto.data.codigo }}</td>
          <td>{{ producto.data.nombre }}</td>
          <td>{{ producto.data.stock }}</td>
          <td>{{ producto.data.precio }}</td>
          <td>
            <!-- Botón Editar -->
            <button
              v-b-modal.modal-1
              @click="editar(producto.id)"
              class="btn btnEdit"
            >
              Editar
            </button>
            <!-- Botón Eliminar -->
            <button @click="eliminar(producto.id)" class="btn btnDelete">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Modal Editar -->
    <b-modal id="modal-1" title="BootstrapVue" class="EditForm">
      <b-form-group id="input-group-1" label="Código:" label-for="input-1">
        <b-form-input v-model="producto.data.codigo"> </b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Nombre:" label-for="input-2">
        <b-form-input v-model="producto.data.nombre"> </b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Stock:" label-for="input-2">
        <b-form-input v-model="producto.data.stock"> </b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Precio:" label-for="input-2">
        <b-form-input v-model="producto.data.precio"> </b-form-input>
      </b-form-group>

      <b-button type="submit" class="btnCambios" @click="update"
        >Aceptar cambios</b-button
      >
    </b-modal>
    <hr>
        <!-- Formulario Agregar Producto -->
    <h4 class="titleAdd">Agrega un producto</h4>
    <div class="w-50 m-auto formAdd">
      <b-form-group id="input-group-1" label="Código:" label-for="input-1">
        <b-form-input v-model="codigo"> </b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Nombre:" label-for="input-2">
        <b-form-input v-model="nombre"> </b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Stock:" label-for="input-2">
        <b-form-input v-model="stock"> </b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Precio:" label-for="input-2">
        <b-form-input v-model="precio"> </b-form-input>
      </b-form-group>

      <b-button type="submit" class="btnAdd" @click="agregar">Agregar</b-button>
    </div>
  </div>
</template>

<!-- Script -->
<script>
import firebase from "firebase";
import { mapState, mapGetters, mapActions } from "vuex";
//import Form from '@/components/Form';
export default {
  name: "Home",
  data() {
    return {
      idUpdating: "",
      codigo: "",
      nombre: "",
      stock: 0,
      precio: 0,
      producto: {
        data: {
          codigo: "",
          nombre: "",
          stock: 0,
          precio: 0,
        },
      },
    };
  },
  //  components: {
  //    Form,
  // },
  computed: {
    ...mapState(["productos"]),
    ...mapGetters(["getProductoUpdating"]),
  },

  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => this.$router.replace("login"));
    },
    //    editar(id){
    //      this.idUpdating = this.id
    //   },
    ...mapActions(["agregarProducto", "updateProducto", "eliminarProducto"]),
    agregar() {
      const producto = {
        codigo: this.codigo,
        nombre: this.nombre,
        stock: this.stock,
        precio: this.precio,
      };
      this.agregarProducto(producto);
    },

    editar(id) {
      const productoUpdating = JSON.parse(
        JSON.stringify(this.getProductoUpdating(id))
      );
      this.producto = productoUpdating;

      console.log(productoUpdating);
    },
    update(){
      this.updateProducto(this.producto)
      this.$bvModal.hide("modal-1")
    },
    eliminar(id){
      this.eliminarProducto(id)

    }
  },
};
</script>

<!-- Style -->
<style>
.btnLogout {
  color: #ffffff;
  background-color: rgb(3, 170, 148);
  border-style: none !important;
  border-radius: 5px;
  padding: 10px 20px;
}
.titleTable {
  margin-top: 50px;
  font-weight: bold;
}
.table {
  margin-top: 20px;
}
.titleAdd {
  margin-top: 50px;
  font-weight: bold;
}
.btnDelete {
  color: #ffffff !important;
  background-color: rgb(248, 72, 72) !important;
  border-style: none !important;
  border-radius: 5px;
  padding: 10px 20px;
  margin-right: 2px;

}
.btnEdit {
  color: #ffffff !important;
  background-color: rgb(48, 151, 247) !important;
  border-style: none !important;
  border-radius: 5px;
  padding: 10px 20px;
  margin-right: 2px;
}
.btnAdd {
  color: #ffffff !important;
  background-color: rgb(228, 175, 2) !important;
  border-style: none !important;
  border-radius: 5px;
  padding: 10px 20px;
  margin-right: 2px;
  margin-bottom: 100px;
}
.btnCambios {
  color: #ffffff !important;
  background-color: rgb(48, 151, 247) !important;
  border-style: none !important;
  border-radius: 5px;
  padding: 10px 20px;
}
</style>

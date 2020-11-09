<!-- Template -->
<template>
  <div>
      <b-form-group id="input-group-1" label="Email:" label-for="input-1" >
        <b-form-input class="input" id="input-1" v-model="email" type="email" required placeholder="Ingrese email" >
        </b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input class="input" id="input-2" v-model="password" required placeholder="Ingrese password" >
        </b-form-input>
      </b-form-group>

      <b-button type="submit" class="btnAceptar" @click="login">Aceptar</b-button>
      
      <div class="datosLogin">
        <h6 class="titleDatos">****Datos Login****</h6>
        <p>
          Usuario: walterwhite@gmail.com <br>
          Password: 123456
        </p>
      </div>    
  </div>
</template>

<!-- Script -->
<script>
import firebase from "firebase";
import router from "../router/index.js";

export default {
  data() {
    return {    
        email: "",
        password: "",
    };
  },
  methods: {
    login() {
      const email = this.email
      const password = this.password
      firebase.auth().signInWithEmailAndPassword(email, password).then( (resultado) => {
        console.log(resultado)
        router.push({name:"Home"})

      }).catch(e => console.log(e.message))
    } 
  },
};
</script>

<!-- Style -->
<style>
.btnAceptar {
  color: #ffffff;
  background-color: rgb(3, 170, 148);
  border-style: none !important;
  border-radius: 5px;
  padding: 10px 20px;
}
.input {
  max-width: 400px;
  margin: auto;
}
.datosLogin {
  margin-top: 50px;
}  
.titleDatos {
  font-weight: bolder;
}
</style>
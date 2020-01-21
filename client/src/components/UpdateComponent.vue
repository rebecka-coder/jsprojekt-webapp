<template>
  <div class="update-container" v-if="updateClick"><!--uppdatera-rutan öppnas när knappen klickas på-->
    <div class="updateInputBox">
      <input
        type="section"
        id="update-post"
        v-model="section"
        placeholder="Uppdatera avdelning"
        required
      />
      <input
        type="goods"
        id="update-post"
        v-model="goods"
        placeholder="Uppdatera vara"
        required
      />
      <input
        type="quantity"
        id="update-post"
        v-model="quantity"
        placeholder="Uppdatera antal"
        required
      />
      <input
        type="store"
        id="update-post"
        v-model="store"
        placeholder="Uppdatera affär"
        required
      />
      <button class="ok" v-on:click="updatePost(postId)">Ok</button>
      <button class="abort" v-on:click="hideUpdateBox">Avbryt</button>
      <p class="error" v-if="updateError">{{ updateError }}</p>
    </div>
  </div><!--Slut på update-container-->
</template>

<script>
import PostService from "../PostService"; // importerar från Postservice-klassen
export default {
  name: "UpdateComponent",
  props: ["updateClick", "postId"],
  data() {
    return {
      section: "",
      goods: "",
      quantity: "",
      store: "",
      updateError: ""
    };
  },
  methods: { //Metoder för uppdatera funktioner
    async updatePost(id) {
      if (this.section, this.goods, this.quantity, this.store != "") {
        await PostService.updatePost(id, this.section, this.goods, this.quantity, this.store);
        this.$emit("update-post");
        this.updateError = "";
        this.section = "";
        this.goods = "";
        this.quantity = "";
        this.store = "";
      } else {
        this.updateError = "Du har inte fyllt i alla fält";
      }
    },
    setPost(section, goods, quantity, store) {
        this.section = section;
        this.goods = goods; 
        this.quantity = quantity;
        this.store = store;
    },
    hideUpdateBox() {
      this.$emit("hide-update"); //Gömmer hela komponenten
    }
  }
};
</script>

<!--CSS för uppdatera komponent-->
<style scoped>
.update-container {
  z-index: 3;
  max-width: 60%;
  background-color:#ffc04c;
  border-radius: 5px;
  margin: auto auto;
  position: relative;
  bottom: 200px;
  right: 0px;
}
input[type=section], [type=goods], [type=quantity], [type=store]{
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.ok {
  background: #00cc00;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 15px;
  margin: 10px;
}
.abort {
  background-color: red;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 15px;
  margin: 10px;
}
#update-post {
display: inline-block;
max-width: 40%;
padding: 12px 12px 12px 0;
margin: 1em;
}
.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
}
</style>
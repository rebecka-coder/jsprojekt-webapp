<template>
<div class="container">
  <h1>Inköpslista</h1>
  <div class="create-post">
    <div class="create-post1">
     <!--<label for="create-post">Lägg till vara: </label>-->
      <label for="section">Avdelning: </label>
      <input type="section" id="create-post1" v-model="section" placeholder="Avdelning..">
      <label for="goods">Vara: </label>
      <input type="goods" id="create-post2" v-model="goods" placeholder="Vara..">
    </div>
    <div class="create-post2">
      <label for="quantity">Antal: </label>
      <input type="quantity" id="create-post3" v-model="quantity" placeholder="Antal..">
      <label for="store">Affär: </label>
      <input type="store" id="create-post4" v-model="store" placeholder="Affär.."><br/>
      <button class="createB" v-on:click="createPost">Lägg till vara!</button>
    </div>
  </div><!--Slut på create-post-->
  <p class="error" v-if="error">{{ error }}</p> 
  <h2>Mina varor</h2>

  <div class="posts-container">
    <!--Loopar igenom alla inlägg-->
    <div class="post"
    v-for="(post, index) in posts"
    v-bind:item="post"
    v-bind:index="index"
    v-bind:key="post._id"
    >
    <p class="output">{{ post.section }}</p>
    <p class="output">{{ post.goods }}</p>
    <p class="output">{{ post.quantity }}</p>
    <p class="output">{{ post.store }}</p>
        <button class="update" v-on:click="editPost(post._id, post.section, post.goods, post.quantity, post.store)">Uppdatera</button>
        <button class="delete" v-on:click="deletePost(post._id)">Radera</button>
    </div><!--Slut på post-->
    </div><!--Slut på posts-container-->
    <UpdateComponent
    ref="updateComponent"
    v-bind:update-click="viewEditPost"
    v-bind:post-id="thisPostId"
    @update-post="showGoods"
    @hide-update="hideInput"
    />
  </div><!--Slut på container-->

</template>

<script>
import PostService from '../PostService'; //Hämtar klassen PostService
import UpdateComponent from "./UpdateComponent";

export default {
  name: 'PostComponent',
  components: {
    UpdateComponent
  },
  data() {
    return {
      posts: [], //Hela arrayen
      error: "", //eventuella error
      section: "",
      goods: "",
      quantity: "",
      store: "",
      viewEditPost: false,
      thisPostId: 0 //startvärde
    };
  },
   async created() {
    try {
      this.posts = await PostService.getPosts(); //Hämtar get funktionen från klassen PostService
    } catch(err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      if (this.section, this.goods, this.quantity, this.store != "") {
      await PostService.insertPost(this.section, this.goods, this.quantity, this.store); //Hämtar post-funktionen
      this.posts = await PostService.getPosts();
      this.error = "";
      this.section = "";
      this.goods = "";
      this.quantity = "";
      this.store = "";
      } else {
        this.error = "Du har inte fyllt i alla fält";
      }
    },
    async deletePost(id) {
      await PostService.deletePost(id); 
      this.posts = await PostService.getPosts(); //Läser in från Postservice-klass
    },
    editPost(id, section, goods, quantity, store) {
      this.viewEditPost = !this.viewEditPost;
      this.thisPostId = id;
      this.$refs.updateComponent.setPost(section, goods, quantity, store);
    },
    async showGoods() {
      this.posts = await PostService.getPosts(); //Läser in från Postservice-klass
      this.viewEditPost = false;
    },
    hideInput() {
      this.viewEditPost = false;
  }
  }
  };
</script>

<!-- CSS för denna komponent -->
<!--Bara div element-->
<style scoped>
div.container {
  max-width: 900px;
  margin: 0 auto;
}
div.create-post1, div.create-post2 {
  display: inline-block;
  max-width: 45%;
  padding: 20px;
}
div.post {
  display: flex;
  flex-direction: row;
  background-color: #ffdb99;
  border: 1px solid #ffc966;
}
h1 {
  margin-top: 2em;
  text-align: center;
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
label {
  padding: 12px 12px 12px 0;
}
.createB {
  margin-top: 10px;
  background-color:#0000ff;
}
.update {
  background-color: #00cc00;
}
.delete {
  background-color: red;
}
.createB, .update, .delete {
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
  font-size: 15px;
  margin: 10px;
}
p.output {
  width: 60%;
  text-align: left;
  margin-left: 20px;
}
p.text {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 0;
}
p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
}
</style>

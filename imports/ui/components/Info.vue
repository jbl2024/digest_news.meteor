<template>
  <div>
    <h2>Learn Meteor!</h2>
    <ul>
      <li>
        <form class="info-link-add">
          <input
            v-model="title"
            type="text"
            name="title"
            placeholder="Title"
            required
          >
          <input
            v-model="url"
            type="url"
            name="url"
            placeholder="Url"
            required
          >
          <input
            type="submit"
            name="submit"
            value="Add new link"
            @click="submit($event)"
          >
        </form>
      </li>
      <li v-for="link in links" :key="link._id">
        <a :href="link.url" target="_blank">{{ link.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import Links from "../../api/collections/Links";

export default {
  data() {
    return {
      title: "",
      url: ""
    };
  },
  meteor: {
    $subscribe: {
      links: []
    },
    links() {
      return Links.find({});
    }
  },
  methods: {
    submit(event) {
      event.preventDefault();
      Meteor.call("createLink", this.title, this.url, (error) => {
        if (error) {
          // eslint-disable-next-line no-console
          console.error(error.error);
        } else {
          this.title = "";
          this.url = "";
        }
      });
    }
  }
};
</script>

<style scoped>
ul {
  font-family: monospace;
}
</style>

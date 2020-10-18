<template>
  <v-app id="inspire">
    <v-app-bar color="white" dense flat app>
      <v-toolbar-title @click.stop="drawer = !drawer">Feed</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn @click="$store.dispatch('init')" icon>
        <v-icon>mdi-refresh</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      color="grey lighten-3"
      app
      permanent
      mini-variant
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img :src="require('./assets/logo.svg')" contain />
        </v-list-item-avatar>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="(item, index) in sources" :key="index" link>
          <v-list-item-icon>
            <v-avatar color="indigo" size="24">
              <span
                class="white--text"
                v-text="item.substring(8, 10).toUpperCase()"
              ></span>
            </v-avatar>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <v-row dense>
          <v-col
            v-for="feed in allFeedItems"
            :key="feed.title"
            cols="12"
            sm="6"
            md="3"
          >
            <v-card ripple hover>
              <v-card-title v-text="feed.title"></v-card-title>
              <v-card-subtitle
                v-text="
                  feed.author ? feed.date + ' by ' + feed.author : feed.date
                "
              ></v-card-subtitle>
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>

                <v-btn icon>
                  <v-icon>mdi-bookmark</v-icon>
                </v-btn>

                <v-btn icon>
                  <v-icon>mdi-share-variant</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    options: {},
    items: [
      { title: "Home", icon: "mdi-home-city" },
      { title: "My Account", icon: "mdi-account" },
      { title: "Users", icon: "mdi-account-group-outline" },
    ],
  }),
  computed: {
    sources() {
      return this.$store.state.sources;
    },
    allFeedItems() {
      let data = [];
      Object.keys(this.$store.state.feeds).forEach((key) => {
        let items = this.$store.state.feeds[key];
        data.push(...items);
      });
      data.sort((a, b) => a.date - b.date).reverse();
      return data;
    },
    feeds() {
      return this.$store.state.feeds;
    },
    cards() {
      return this.$store.state.cards;
    },
  },
  mounted() {
    this.$store.dispatch("init");
  },
};
</script>
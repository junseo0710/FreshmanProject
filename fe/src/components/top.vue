<template>
<b-navbar toggleable="lg" type="dark" variant="info">
  <b-navbar-brand href="#">NavBar</b-navbar-brand>

  <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

  <b-collapse id="nav-collapse" is-nav>

      <b-button variant="info" @click="change(1)">월</b-button>
      <b-btn variant="info" @click="change(2)">화</b-btn>
      <b-btn variant="info" @click="change(3)">수</b-btn>
      <b-btn variant="info" @click="change(4)">목</b-btn>
      <b-btn variant="info" @click="change(5)">금</b-btn>
      <b-btn variant="info" @click="change(6)">토</b-btn>
      <b-btn variant="info" @click="change(7)">일</b-btn>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <b-nav-form>
        <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
      </b-nav-form>
      <b-nav-item-dropdown right>
        <!-- Using 'button-content' slot -->
        <template v-slot:button-content>
          <em>User</em>
        </template>
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item href="#">Sign Out</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-collapse>
</b-navbar>
</template>

<script>
</script>

<style scoped>
</style>

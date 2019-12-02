<template>
<div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">NavBar</b-navbar-brand>


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
  </b-navbar>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6 v-for="obj in objs" :key="obj._id">
        <maincomp :obj="obj"></maincomp>
      </v-flex>
    </v-layout>
  </v-container>
    <b-btn block variant="outline-success" @click="add">
      <icon name="plus"></icon>추가
    </b-btn>
</div>
</template>



<script>
import maincomp from '@/components/maincomp'
export default {
  components: {
    maincomp
  },
  data() {
    return {
      objs: [],
      today: 0
    };
  },
  mounted() {
    this.getObjs()
  },
  methods: {
    getObjs() {
      const d = new Date()
      this.today = d.getDay()
      const day = this.today
      this.$axios.get(`api/objs/${day}`)
        .then((r) => {
          this.objs = r.data.objs
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    change(v) {
      this.$axios.get(`api/obj/${v}`)
    },
    add() {
      this.$swal({
          title: '시간 추가',
          content: 'input',
          buttons: {
            cancel: {
              text: '취소',
              visible: true
            },
            confirm: {
              text: '추가'
            }
          }
        })
        .then((res) => {
          if (!res) throw new Error('');
          return this.$axios.post(`${this.$cfg.path.api}data/company`, {
            name: res
          });
        })
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.msg);
          return this.swalSuccess('추가 완료');
        })
        .then(() => {
          this.list();
        })
        .catch((err) => {
          if (err.message) return this.swalError(err.message);
          this.swalWarning('입력칸을 모두 채워주세요');
        });
    }
  }
}
</script>

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
  <b-btn v-on:click="add" block variant="outline-success">
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
    swalSuccess(msg) {
      return this.$swal.fire({
        icon: 'success',
        // button: false,
        title: '성공',
        text: msg,
        timer: 2000
      });
    },
    swalWarning(msg) {
      return this.$swal.fire({
        icon: 'warning',
        // button: false,
        title: '실패',
        text: msg,
        timer: 2000
      });
    },
    swalError(msg) {
      return this.$swal.fire({
        icon: 'error',
        // button: false,
        title: '에러',
        text: msg,
        timer: 2000
      });
    },
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
      this.$swal.fire({
        title: '가게 추가',
        html:
          '*이름<input id="swal-input1" class="swal2-input" required="required">' +
          '*분류<select id="types" name="types"><option value="schoolrs">학사 식당</option><option value="rs">입주 식당</option><option value="cafe">카페</option><option value="else">기타</option></select><hr />' +
          '*시작 시간(평일)<input type="time" id="Minput1" class="swal2-input" required="required">*종료 시간(평일)<input type="time" id="Minput2" class="swal2-input" required="required">' +
          '시작 시간(토요일)<input type="time" id="Sainput1" class="swal2-input">종료 시간(토요일)<input type="time" id="Sainput2" class="swal2-input">' +
          '시작 시간(일요일)<input type="time" id="Suinput1" class="swal2-input">종료 시간(일요일)<input type="time" id="Suinput2" class="swal2-input">',
        showCloseButton: true,
        showCancelButton: true
        // preConfirm: () => {
        //   return this.$axios.post(`${this.$cfg.path.api}add`, {
        //     name: document.getElementById('swal-input1').value,
        //     type: document.getElementById('types').value,
        //     ws: document.getElementById('Minput1').value,
        //     wf: document.getElementById('Minput2').value,
        //     sas: document.getElementById('Sainput1').value,
        //     saf: document.getElementById('Sainput2').value,
        //     sus: document.getElementById('Suinput1').value,
        //     suf: document.getElementById('Suinput2').value
        //   })
        // }
      })
      .then(() => {
        return this.$axios.post(`${this.$cfg.path.api}add`, {
          name: document.getElementById('swal-input1').value,
          type: document.getElementById('types').value,
          ws: document.getElementById('Minput1').value,
          wf: document.getElementById('Minput2').value,
          sas: document.getElementById('Sainput1').value,
          saf: document.getElementById('Sainput2').value,
          sus: document.getElementById('Suinput1').value,
          suf: document.getElementById('Suinput2').value
        })
      })
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg);
        return this.swalSuccess('추가 완료');
      })
      .catch((err) => {
        if (err.message) return this.swalError(err.message);
        this.swalWarning('입력칸을 모두 채워주세요');
      });
    },
    adds() {
      this.$swal({
          title: '<i>Custom HTML</i>',
          // add a custom html tags by defining a html method.
          html: 'This is an <em> emaphazied text </em>, ' +
            '<a href="#">links</a> ' +
            '<strong>And other tags</strong>',
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false
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

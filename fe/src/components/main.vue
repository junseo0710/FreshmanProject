<template>
<div class="all">
  <b-navbar class="nav" toggleable="lg" type="dark" variant="info">
    <b-navbar-brand size="lg" href="#">TimeTable</b-navbar-brand>
    <b-button class="fb" variant="light" size="lg" v-bind:class="{'white':!this.button[0].state, 'gray': !this.button[0].state}" @click="now()">현재 영업중</b-button>
    <b-button class="fb" variant="secondary" size="lg" v-bind:class="{'white':!this.button[1].state, 'gray': !this.button[1].state}" @click="change(1)">월</b-button>
    <b-btn class="fb" variant="secondary" size="lg" v-bind:class="{'white':!this.button[2].state, 'gray': !this.button[2].state}" @click="change(2)">화</b-btn>
    <b-btn class="fb" variant="secondary" size="lg" v-bind:class="{'white':!this.button[3].state, 'gray': !this.button[3].state}" @click="change(3)">수</b-btn>
    <b-btn class="fb" variant="secondary" size="lg" v-bind:class="{'white':!this.button[4].state, 'gray': !this.button[4].state}" @click="change(4)">목</b-btn>
    <b-btn class="fb" variant="secondary" size="lg" v-bind:class="{'white':!this.button[5].state, 'gray': !this.button[5].state}" @click="change(5)">금</b-btn>
    <b-btn class="fb" variant="secondary" size="lg" v-bind:class="{'white':!this.button[6].state, 'gray': !this.button[6].state}" @click="change(6)">토</b-btn>
    <b-btn class="fb" variant="secondary" size="lg" v-bind:class="{'white':!this.button[7].state, 'gray': !this.button[7].state}" @click="change(0)">일</b-btn>

    <!-- Right aligned nav items -->
    <!-- <b-navbar-nav class="ml-auto">
      <b-nav-form>
        <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
      </b-nav-form>
      <b-nav-item-dropdown right> -->
        <!-- Using 'button-content' slot -->
        <!-- <template v-slot:button-content>
          <em>User</em>
        </template>
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item href="#">Sign Out</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav> -->
  </b-navbar>
  <b-card-group deck class="group">
    <b-card border-variant="light" no-body v-for="v in objs" :key="v._id" style="min-width: 25%; margin-bottom: 10px;">
      <b-card-header header-bg-variant="primary" header-border-variant="light"  header-text-variant="white">
        <h4>{{ v.name }}</h4>
      </b-card-header>
      <b-card-body>
        <p class="card-text">{{v.class}}</p>
      </b-card-body>
      <b-card-footer footer-bg-variant = "light" footer-border-variant = "primary">
        <p>
          <b-button-group class="float-left">
            <b-btn variant="outline-info" @click="go(v)">
              <icon name="search"></icon>
            </b-btn>
          </b-button-group>
          <b-button-group class="float-right">
            <b-btn variant="outline-danger" @click="del(v)">
              <icon name="trash"></icon>
            </b-btn>
          </b-button-group>
        </p>
      </b-card-footer>
    </b-card>
  </b-card-group>
  <b-btn v-on:click="add" size="lg" block variant="outline-success">
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
      d: {
        name: '',
        type: '',
        _id: '',
        wstime: 0,
        wftime: 1159,
        sastime: 0,
        saftime: 1159,
        sustime: 0,
        suftime: 1159
      },
      objs: [],
      today: 0,
      button: [
        { state: false },
        { state: false },
        { state: false },
        { state: false },
        { state: false },
        { state: false },
        { state: false },
        { state: false }
      ],
      buttontoggle: false
    };
  },
  mounted() {
    this.now()
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
    go(v) {
      let msg;
      var timechange = function(st, ft) {
        let ret;
        if (st && ft) {
          const hrs = parseInt(st / 100)
          const mns = st % 100
          const hrf = parseInt(ft / 100)
          const mnf = ft % 100
          let ret1;
          let ret2;
          if (hrs >= 0 && hrs <= 12) {
            ret1 = '오전 ' + hrs + '시 ' + mns + '분'
          } else {
            ret1 = '오후 ' + hrs + '시 ' + mns + '분'
          }
          if (hrf >= 0 && hrf <= 11) {
            ret2 = '오전 ' + hrf + '시 ' + mnf + '분'
          } else {
            ret2 = '오후 ' + hrf + '시 ' + mnf + '분'
          }
          ret = ret1 + ' ~ ' + ret2
        } else {
          ret = '휴무'
        }
        return ret
      }
      let titl = v.name + '(' + v.class + ')'
      this.$swal.fire({
        title: titl,
        html: '<hr />평일 시간: ' + timechange(v.wtime.stime, v.wtime.ftime) + '<br>토요일 시간: ' + timechange(v.satime.stime, v.satime.ftime) + '<br>일요일 시간: ' +
          timechange(v.sutime.stime, v.sutime.ftime),
        showCloseButton: true
      })
    },
    del(v) {
      this.$swal.fire({
          title: '가게 삭제',
          dangerMode: true,
          text: 'Enter your password',
          input: 'password',
          inputPlaceholder: 'Enter your password',
          buttons: {
            cancel: {
              text: '취소',
              visible: true
            },
            confirm: {
              text: '삭제'
            }
          }
        })
        .then((sv) => {
          if (!(sv.value === 'ilovesparcs')) throw new Error('');
          // if (!sv) throw new Error('');
          return this.$axios.delete(`${this.$cfg.path.api}del`, {
            params: {
              id: v._id
            }
          });
        })
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.msg);
          return this.swalSuccess('가게 삭제 완료');
        })
        .catch((err) => {
          if (err.message) return this.swalError(err.message);
          this.swalWarning('비밀번호가 틀렸습니다');
        });
    },
    getObjs() {
      const d = new Date()
      this.today = d.getDay()
      const day = this.today
      this.$axios.get(`${this.$cfg.path.api}change`, {
          params: {
            day: day
          }
        })
        .then((r) => {
          this.objs = r.data.data
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    change(day) {
      if (day === 0) {
        for (var i = 0; i < 8; i++) {
          if (this.button[i].state === true) {
            this.button[i].state = false
          }
        }
        this.button[7].state = !this.button[7].state
      } else {
        for (var k = 0; k < 8; k++) {
          if (this.button[k].state === true) {
            this.button[k].state = false
          }
        }
      this.button[day].state = !this.button[day].state
    }
      this.$axios.get(`${this.$cfg.path.api}change`, {
          params: {
            day: day
          }
        })
        .then((r) => {
          this.objs = r.data.data
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    now() {
      const d = new Date()
      this.today = d.getDay()
      const day = this.today
      for (var j = 0; j < 8; j++) {
        if (this.button[j].state === true) {
          this.button[j].state = false
        }
      }
      this.button[0].state = !this.button[0].state
      this.$axios.get(`${this.$cfg.path.api}change`, {
          params: {
            day: 10
          }
        })
        .then((r) => {
          this.objs = r.data.data
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    add() {
      this.$swal.fire({
          title: '가게 추가',
          html: '*이름<input id="swal-input1" class="swal2-input" required="required">' +
            '*분류<select id="types" name="types"><option value="학사 식당">학사 식당</option><option value="입주 식당">입주 식당</option><option value="카페">카페</option><option value="기타 업체">기타</option></select><hr />' +
            '*시작 시간(평일)<input type="time" id="Minput1" class="swal2-input" required="required">*종료 시간(평일)<input type="time" id="Minput2" class="swal2-input" required="required">' +
            '시작 시간(토요일)<input type="time" id="Sainput1" class="swal2-input">종료 시간(토요일)<input type="time" id="Sainput2" class="swal2-input">' +
            '시작 시간(일요일)<input type="time" id="Suinput1" class="swal2-input">종료 시간(일요일)<input type="time" id="Suinput2" class="swal2-input">',
          showCloseButton: true,
          showCancelButton: true
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
          if (err.message) {
            console.log(err.message)
            return;
          }
          this.swalWarning('입력칸을 모두 채워주세요');
        });
    }
  }
}
</script>
<style scoped>
.card {
  width: 100%;
}
.nav {
  float: left;
  width: 100%;
}
.group {
  width: 100%;
}
.fb.gray {
  background-color: rgb(185, 179, 175);
  border-color: rgb(185, 179, 175);
  color: white;
  opacity: 0.9;
}
</style>

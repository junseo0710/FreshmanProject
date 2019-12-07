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
  <b-card-group deck>
    <b-card no-body v-for="v in objs" :key="v._id" style="min-width: 25%; max-width: 25%; margin-bottom: 10px;">
      <b-card-header>
        <h4>{{ v.name }}</h4>
      </b-card-header>
      <b-card-body>
        <p class="card-text">{{v.class}}</p>
      </b-card-body>
      <b-card-footer>
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
    go(v) {
      let msg;
      var timechange = function(tt) {
        let ret;
        if (tt) {
          const hr = parseInt(tt / 100)
          const mn = tt % 100
          ret = hr + ' 시   ' + mn + ' 분'
        } else {
          ret = '없음'
        }
        return ret
      }
      msg = '분류: ' + v.class + '\n평일 시작시간: ' + v.wtime.stime + '\n' + '평일 종료시간: ' + v.wtime.ftime + '토요일 시작시간: ' + v.satime.stime + '\n' + '토요일 종료시간: ' + v.satime.ftime + '\n' + '일요일 시작시간: ' +
        v.sutime.stime + '\n' + '일요일 종료시간: ' + v.sutime.ftime
      this.$swal.fire({
        title: v.name,
        html: '분류: ' + v.class + '<br>평일 시작시간: ' + timechange(v.wtime.stime) + '<br>평일 종료시간: ' + timechange(v.wtime.ftime) + '<br>토요일 시작시간: ' + timechange(v.satime.stime) + '<br>토요일 종료시간: ' + timechange(v.satime.ftime) + '<br>일요일 시작시간: ' +
          timechange(v.sutime.stime) + '<br>일요일 종료시간: ' + timechange(v.sutime.ftime),
        showCloseButton: true
      })
    },
    del(v) {
      this.$swal.fire({
          title: '가게 삭제',
          dangerMode: true,
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
          if (!sv) throw new Error('');
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
          this.swalWarning('가게 삭제 취소');
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
          console.log(r.data)
          this.objs = r.data.data
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    change(day) {
      this.$axios.get(`${this.$cfg.path.api}change`, {
          params: {
            day: day
          }
        })
        .then((r) => {
          console.log(r.data)
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
          if (err.message) return this.swalError(err.message);
          this.swalWarning('입력칸을 모두 채워주세요');
        });
    }
  }
}
</script>
<style scoped>
.card {
  width: 150px;
}
</style>

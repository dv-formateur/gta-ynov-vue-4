<template>
  <div id="gantt-view" class="row">
    <div class="col-md-6 col-lg-8 offset-md-3 offset-lg-2 position-fixed" id="timeline-container">
      <ol id="timeline">
        <li v-for="key in getTimelineKeys()" :style="{'margin-left': getTimelineKeyMarginLeft(key.time)}"
        :key="key.time.toDate().getTime()"
        @click="selected_end_date=key.time">
          <div class="timeline-info">
            <p class="timeline-text">{{$moment(key.time).format(key['date_format'])}}</p>
            <span class="timeline-arrow"></span>
          </div>
          
          <span class="timeline-point">
            <span class="timeline-mark"></span>

          </span>
        </li>
      </ol>
    </div>

    <form class="col-sm-12 col-md-3 col-lg-2">
      <div class="form-group">
        <label for="employee-selector">Selectionner un employe</label>
        <select @change="onSelectUser()" class="form-control" name="employee-selector" id="employee-selector" v-model="selected_user">
          <option value="">Tous ({{users.length}})</option>
          <option v-for="user in users" v-bind:value="user" v-bind:key="user.id">{{user.name}}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="start-date-selector">Selectionner une date de debut</label>
        <input type="date" class="form-control" name="start-date-selector" id="start-date-selector" v-model="selected_start_date"/>
      </div>

      <div class="form-group">
        <label for="end-date-selector">Selectionner une date de fin</label>
        <input type="date" class="form-control" name="end-date-selector" id="end-date-selector" v-model="selected_end_date"/>
      </div>
    </form>

    <div id="tasks" class="col-md-6 col-lg-8">
      <div v-for="user in selected_user ? [selected_user] : users" :key="user.id">
        <div class="">
          <p>{{user.name}}</p>
        </div>
        <div class="user-tasks">
          <component-task 
            v-for="task in user.tasklist" 
            :task="task" 
            :start_date="selected_start_date" 
            :end_date="selected_end_date" 
            :key="task.id"
            @selectTask="selectTask"
            v-if="$moment(task.date_start) <= $moment(selected_end_date) && $moment(task.date_end) >= $moment(selected_start_date)">
            </component-task>
        </div>
      </div> 

       
    </div> 

      <div v-if="selected_task" class="col-sm-12 col-md-3 col-lg-2">
        <div class="selected-task">
          <p class="task-info-title">{{selected_task.title}}</p>
          <p class="task-info-date-start">{{$moment(selected_task.date_start).format("dddd, MMMM Do YYYY, h:mm:ss a")}}</p>
          <p class="task-info-date-end">{{$moment(selected_task.date_end).format("dddd, MMMM Do YYYY, h:mm:ss a")}}</p>
          <button class="btn btn-info" @click="scaleToTask(selected_task)">Mettre a l'echelle</button>
        </div>
      </div>             
  </div>
  
</template>

<script>
import Task from '../entities/task.js'
import User from '../entities/user.js'
import ComponentTask from '../components/ComponentTask.vue'

import UserService from '../services/user.service'
import TaskService from '../services/task.service'

export default {
  name: 'gantt-view',
  components: {
    ComponentTask
  },
  data () {
    return {
      users: [],
      selected_user: '',
      selected_start_date: this.$moment(),
      selected_end_date: this.$moment().add(1, 'days'),
      selected_task: null
    }
  },
  mounted() {
     UserService.getAllUsers(this.setUsers, 10);
  },
  methods: {
    setUsers(users){
      this.users = users;
      this.onSelectUser();
    },
    setTasks(user, tasklist){
      user.tasklist = tasklist;
    },
    selectTask(task){
      this.selected_task = task;
    },
    onSelectUser(){
      var selected = this.selected_user ? [this.selected_user] : this.users;
      for(var user of selected){
        TaskService.getAllTasksForUser(this.setTasks, null, user, this.selected_start_date, this.selected_end_date);
      }
    },
    scaleToTask(task){
      this.scaleOn(task.date_start, task.date_end);
    },
    scaleOn(start, end){
      this.selected_start_date = this.$moment(start);
      this.selected_end_date = this.$moment(end);
    },
    getTimelineKeys(){
      var stamp_start = this.$moment(this.selected_start_date);
      var stamp_end = this.$moment(this.selected_end_date);

      var res = [
        {
          time: stamp_start,
          date_format: 'D/M/YYYY, h:mm:ss a'
        },
        {
          time: stamp_end,
          date_format: 'D/M/YYYY, h:mm:ss a'
        },
      ];

      var date_format = 'D/M/YYYY, h:mm:ss a';
      var stamp_format = 'years';

      if(stamp_end.diff(stamp_start, 'years')>=1){
        stamp_format = 'years';
        date_format = 'YYYY';
      }else if(stamp_end.diff(stamp_start, 'month')>=1){
        stamp_format = 'months';
        date_format = 'MM/YYYY';
      }else if(stamp_end.diff(stamp_start, 'weeks')<=1 && stamp_end.diff(stamp_start, 'days')>1){
        stamp_format = 'days';
        date_format = 'DD/MM';
      }else if(stamp_end.diff(stamp_start, 'days')<=1){
        stamp_format = 'hours';
        date_format = 'HH:mm';
      }else{
        stamp_format = 'days';
        date_format = 'DD/MM';
      }

      for(var i = 1; i < Math.ceil(stamp_end.diff(stamp_start, stamp_format)); i++){
        var timeline = this.$moment(stamp_start);
        timeline.minutes(0);
        timeline.seconds(0);
        timeline.milliseconds(0);
        timeline.add(i, stamp_format);
        res.push({
          time: this.$moment(timeline),
          date_format: date_format
        });
      }

      return res;
    },
    getTimelineKeyMarginLeft(key){
      var stamp_start = this.$moment(this.selected_start_date);
      var stamp_end = this.$moment(this.selected_end_date);
      var stamp = stamp_end - stamp_start;

      var empty_stamp = key - stamp_start;
      return stamp > 0? (empty_stamp / stamp) * 100 + '%' : '0%';
    }
  },
}
</script>

<style>

  .user-tasks{
    margin-bottom: 50px;
  }

  #gantt-view{
    margin-top:150px;
  }

  #timeline-container{
    top:50px;
    padding: 20px;
    background-color: white;
    min-height: 50px;
    z-index: 7;
  }

  #tasks{
    margin-top: 50px;
  }

/* ---- Timeline ---- */
#timeline {
  margin-top: 75px;
  margin-left: -5px;
  margin-right: -5px;
	position: relative;
	display: block;
	height: 4px;
	background: #31708F;
}

#timeline::before,
#timeline::after {
	content: "";
	position: absolute;
	top: -8px;
	display: block;
	width: 0;
	height: 0;
  border-radius: 10px;
	border: 10px solid #31708F;
}

#timeline::before {
	left: -5px;
}
#timeline::after {
	right: -10px;
	border: 10px solid transparent;
	border-right: 0;
	border-left: 20px solid #31708F;
  border-radius: 3px;
}

#timeline li{
  position: absolute;
	display: inline-block;
  height: 50px;
  cursor: pointer;
}

.timeline-info{
  position: absolute;
  top: -75px;
  left: -80px;
  width: 50px;
  background-color: white;
  padding: 5px;
  z-index: 8;
  border: solid 1px lightgray;
  border-radius: 3px;
  font-size: .75em;
}

.timeline-text {
  color: #000000;
  font-size: .75em;
  text-align: center;  
}

.timeline-info:hover{
  z-index: 9;
}

.timeline-point {
	content: "";
	top: -4px;
	left: -45px;
	display: block;
	width: 6px;
	height: 6px;
	border: 4px solid #31708F;
	border-radius: 10px;
	background: #fff;
  position: absolute;
  padding: 0;
}

.timeline-mark{
  position: absolute;
  height: 1000px;
  width: 0px;
  overflow: visible;
  border: solid 1px #00000010;
  margin: 0%;
}

.timeline-arrow{
  width: 0; 
  height: 0;
  position: absolute;
  bottom: -5px;

  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid lightgray;
  margin-left: 50%;
}

.selected-task{
}


</style>

<template>
  <div class="container-fluid">
    <nav-bar></nav-bar>

    <div class="row">
      <div class="col-sm-12 col-md-4 col-lg-2">
        <form>
          <div class="form-group">
            <label for="employee-selector">Selectionner un projet</label>
            <select @change="onSelectProject()" class="form-control" name="project-selector" id="project-selector" v-model="selected_project">
              <option v-for="project in user_projects" v-bind:value="project" v-bind:key="project.id">{{project.name}}</option>
            </select>
          </div>

          <div id='manager-filter'>
            <div class="form-group">
              <label for="employee-selector">Selectionner un employe</label>
              <select @change="onSelectUser()" class="form-control" name="employee-selector" id="employee-selector" v-model="selected_user">
                <option value="">Tous</option>
                <option v-for="user in getSelectedProjects().users" v-bind:value="user" v-bind:key="user.id">{{user.name}}</option>
              </select>
            </div>

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

        <hr>

        <div v-if="selected_task">
          <div class="selected-task">
            <p class="task-info-title">{{selected_task.title}}</p>
            <p class="task-info-date-start">{{$moment(selected_task.date_start).format("dddd, MMMM Do YYYY, h:mm:ss a")}}</p>
            <p class="task-info-date-end">{{$moment(selected_task.date_end).format("dddd, MMMM Do YYYY, h:mm:ss a")}}</p>
            <button class="btn btn-info" @click="scaleToTask(selected_task)">Mettre a l'echelle</button>
          </div>
        </div>

      </div>
      

      <div class="col-sm-10 col-md-6 col-lg-8 offset-1">
        <div id="tasks">
          <div>
          <ol id="timeline">
            <li v-if="$moment() >= selected_start_date && $moment() <= selected_end_date" :style="{'margin-left': getTimelineKeyMarginLeft($moment())}">
              <span class="timeline-point current-timeline">
              </span>
            </li>
            <li v-for="key in getTimelineKeys()" :style="{'margin-left': getTimelineKeyMarginLeft(key.time)}"
            :key="key.time.toDate().getTime()">
              <div class="timeline-info" 
                @click="selected_end_date=key.time">
                <p class="timeline-text">{{$moment(key.time).format(date_format)}}</p>
              </div>
              
              <span class="timeline-point">
              </span>
            </li>
          </ol>
        </div>


          <div v-for="user in getSelectedUsers()" :key="user.id">
            <div>
              <p>{{user.name}}</p>
            </div>

            <div class="user-tasks">
              <component-task 
                v-for="task in user.tasklist" 
                :task="task" 
                :start_date="selected_start_date" 
                :end_date="selected_end_date"
                :selected="selected_task? task.id == selected_task.id ? true : false : false"
                :date_format="date_format"
                :key="task.id"
                @selectTask="selectTask"
                v-if="$moment(task.date_start) < $moment(selected_end_date) && $moment(task.date_end) > $moment(selected_start_date)">
                </component-task>
            </div>
          </div> 
        </div>
      </div>              
    </div>
  </div>
</template>

<script>
import Task from '../entities/task.js'
import User from '../entities/user.js'
import Project from '../entities/project.js'

import NavBar from "../layout/NavBar.vue";
import ComponentTask from '../components/ComponentTask.vue'

import UserService from '../services/user.service'
import TaskService from '../services/task.service'
import ProjectService from '../services/project.service'

export default {
  name: 'gantt-view',
  components: {
    NavBar, ComponentTask
  },
  data () {
    return {
      user_projects: [],
      selected_user: '',
      selected_project: '',
      selected_start_date:  this.$moment().startOf('month'),
      selected_end_date: this.$moment().endOf('month'),
      selected_task: null,

      date_format: 'DD/MM'
    }
  },
  mounted() {
    ProjectService.getUserProjects(this.setProjects, this.$session.get('user'));
  },
  methods: {
    selectTask(task){
      this.selected_task = task;
    },
    getSelectedProjects(){
      return this.selected_project;
    },
    getSelectedUsers(){

      return !this.selected_project ? [] : this.selected_user ? [this.selected_user] : this.selected_project ? this.selected_project.users : [];
    },

    setProjects(user, projects){
      this.user_projects = projects;
      this.selected_project = this.user_projects ? this.user_projects[0] : '';
      this.onSelectProject();
    },
    setUsers(project, users){
      project.users = users;
      this.onSelectUser();
    },
    setTasks(user, tasklist){
      user.tasklist = tasklist;
    },


    onSelectProject(){
      if(!this.selected_project) return;
      this.selected_user = '';
      UserService.getUsersOnProject(this.setUsers, this.selected_project);
      
    },
    onSelectUser(){
      this.refreshTasksForSelection();
    },
    refreshTasksForSelection(){
      for(var user of this.getSelectedUsers()){
        TaskService.getAllTasksForUser(this.setTasks, null, user, this.selected_project, this.selected_start_date, this.selected_end_date);
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

      var date_format = 'D/M/YYYY, h:mm:ss a';
      var stamp_format = 'years';

      if(stamp_end.diff(stamp_start, 'years')>=1){
        stamp_format = 'years';
        date_format = 'YYYY';
      }else if(stamp_end.diff(stamp_start, 'month')>=1){
        stamp_format = 'months';
        date_format = 'MM/YYYY';
      }else if(stamp_end.diff(stamp_start, 'weeks')>1){
        stamp_format = 'weeks';
        date_format = 'DD/MM';
      }else if(stamp_end.diff(stamp_start, 'days')>1){
        stamp_format = 'days';
        date_format = 'DD/MM';
      }else if(stamp_end.diff(stamp_start, 'hours')<6){
        stamp_format = 'hours';
        date_format = 'HH:mm';
      }else{
        stamp_format = 'hours';
        date_format = 'HH:mm';
      }

      var res = [
        {
          time: stamp_start
        },
        {
          time: stamp_end
        },
      ];

      for(var i = 1; i < stamp_end.diff(stamp_start, stamp_format, true); i++){
        var timeline = this.$moment(stamp_start);
        timeline.minutes(0);
        timeline.seconds(0);
        timeline.milliseconds(0);
        timeline.add(i, stamp_format);
        res.push({
          time: this.$moment(timeline)
        });
      }

      this.date_format = date_format;
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
  }

  #timeline-container{
    top:50px;
    padding: 20px;
    background-color: white;
    min-height: 50px;
    z-index: 7;
  }

  #tasks{
    max-height: 300px;
  }

/* ---- Timeline ---- */
#timeline {
  margin-top: 100px;
	position: relative;
	display: block;
  width: 100%;
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
  top: -50px;
  left: -80px;
  width: 50px;
  padding: 5px;
  z-index: 8;
}

.timeline-text {
  color: #000000;
  font-size: .75em;
  font-weight: bold;
  text-align: center;
  transform: rotate(315deg);
  margin-left: 50%;
}

.timeline-info:hover{
  z-index: 9;
}

.timeline-point {
	content: "";
	top: -2px;
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

.timeline-arrow{
  width: 0; 
  height: 0;
  position: absolute;
  bottom: -5px;
  margin-left: 50%;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid lightgray;
}

.current-timeline{
  border-color: red;
}

.selected-task{
}


</style>

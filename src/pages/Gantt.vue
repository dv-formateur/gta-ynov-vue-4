<template>
  <div class="container-fluid">
    <nav-bar></nav-bar>
    <div class="row">
      <div class="col-md-12 col-lg-3 col-xl-2">
        <!-- FILTERS -->
        <h1 class="display-4">Filtres</h1>
        <form>
          <div class="form-group">
            <label for="employee-selector">Projet :</label>
            <select @change="onSelectProject()" class="form-control" name="project-selector" id="project-selector" v-model="selected_project">
              <option v-for="project in user_projects" v-bind:value="project" v-bind:key="project.id">{{project.name}}</option>
            </select>
          </div>

          <div v-if="has_right_on_project" id='manager-filter'>
            <div class="form-group">
              <label for="employee-selector">Employé(s) :</label>
              <select @change="onSelectUser()" class="form-control" name="employee-selector" id="employee-selector" v-model="selected_user">
                <option value="">Tous</option>
                <option v-for="user in getSelectedProjects().users" v-bind:value="user" v-bind:key="user.id">{{user.fname}} {{user.lname}}</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="start-date-selector">Date de debut :</label>
            <date-picker :config="date_picker_options" class="form-control" name="start-date-selector" id="start-date-selector" v-model="selected_start_date"></date-picker>
          </div>

          <div class="form-group">
            <label for="end-date-selector">Date de fin :</label>
            <date-picker :config="date_picker_options" class="form-control" name="end-date-selector" id="end-date-selector" v-model="selected_end_date"></date-picker>
          </div>
        </form>

        <hr>

        <div v-if="has_right_on_project">
          <p>Creer une tache <b-btn @click="createTask" variant="success fas fa-plus"></b-btn></p>
        </div>

        <!-- SELECTED TASK DETAILS -->
        <transition name="fade">
          <b-card 
            bg-variant="light"
            text-variant="black"
            :header="selected_task.title"
            v-if="selected_task">
            <div class="selected-task">
              <div v-if="has_right_on_project">
                <div class="form-group">
                  <label for="task-name">Titre:</label>
                  <b-input type="text" v-model="selected_task.title"></b-input>
                </div>

                <div class="form-group">
                  <label for="task-start-date-selector">Date de debut :</label>
                  <date-picker :config="date_picker_options" class="form-control" name="task-start-date-selector" id="task-start-date-selector" v-model="selected_task.date_start"></date-picker>
                </div>

                <div class="form-group">
                  <label for="task-end-date-selector">Date de fin :</label>
                  <date-picker :config="date_picker_options" class="form-control" name="task-end-date-selector" id="task-end-date-selector" v-model="selected_task.date_end"></date-picker>
                </div>

                <label for="employee-selector">Employé :</label>
                <select class="form-control" name="employee-selector" id="employee-selector" v-model="selected_task.user_id">
                  <option v-for="user in getSelectedProjects().users" v-bind:value="user.id" v-bind:key="user.id">{{user.fname}} {{user.lname}}</option>
                </select>

                <div class="form-group">
                  <input type="checkbox" name="task_validated" v-model="selected_task.validated">
                  <label for="task-validated">Valide</label>
                  
                </div>

                <b-btn variant="info" @click="editTask()">Valider</b-btn>
                <b-btn variant="danger" @click="removeTask()">Supprimer</b-btn>
              </div>
              <div v-else>
                <p class="task-info-date-start">{{$moment(selected_task.date_start).format('HH:mm DD/MM/YY')}}</p>
                <p class="task-info-date-end">{{$moment(selected_task.date_end).format('HH:mm DD/MM/YY')}}</p>
              </div>

            </div>
          </b-card>
        </transition>

      </div>

      
      <div class="col">
        <div id="tasks" class="container-fluid">
          <!-- TIMELINE -->
          <div class="col-10 offset-2">
            <ol id="timeline">
              <li v-for="key in getTimelineKeys()" :style="{'margin-left': getTimelineKeyMarginLeft(key.time)}"
              :key="key.time.toDate().getTime()">
                <div class="timeline-info" 
                  @click="selected_end_date=key.time">
                  <p class="timeline-text">{{$moment(key.time).format(date_format)}}</p>
                </div>
                <span class="timeline-point"></span>
              </li>

              <li v-if="$moment() >= selected_start_date && $moment() <= selected_end_date" :style="{'margin-left': getTimelineKeyMarginLeft($moment())}">
                <span class="timeline-point current-timeline">
                </span>
              </li>
            </ol>
          </div>

          <!-- TASKS -->
          <div class="container-fluid user-tasks" v-for="user in getSelectedUsers()" :key="user.id">
            <router-link class="task-username" :to="'/profile/' + user.id">{{user.fname}} {{user.lname}}</router-link>
            <div 
              v-for="task in user.tasklist" 
              :key="task.id" class="row task-row" 
              v-if="$moment(task.date_start) < $moment(selected_end_date) && $moment(task.date_end) > $moment(selected_start_date)">
                <div class="task-info col-2">
                  <p class="task-title">{{task.title}} <a class="fas fa-eye text-info btn" @click="scaleToTask(task)"></a></p>
                  <div class="task-date-info">
                    <p class="date_start">{{$moment(task.date_start).format('HH:mm DD/MM/YY')}}</p>
                    <p class="date_end">{{$moment(task.date_end).format('HH:mm DD/MM/YY')}}</p>
                  </div>
                  <div v-for="warning in getTaskWarnings(getSelectedProjects(), user, task)" :key="warning">
                    
                    <p class="text-warning"><i class="fas fa-exclamation-triangle"></i> {{warning}}</p>
                  </div>
                </div>

                <component-task
                  class="col-10"
                  :task="task" 
                  :start_date="selected_start_date" 
                  :end_date="selected_end_date"
                  :selected="selected_task? task.id == selected_task.id ? true : false : false"
                  :date_format="date_format"

                  @selectTask="selectTask">
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
import DatePicker from 'vue-bootstrap-datetimepicker';

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

      has_right_on_project: false,

      input: {
        create_task:{
          title: '',
          date_start: '',
          date_end: '',
          user_id: ''
        }
      },

      date_format: 'DD/MM',
      date_picker_options: {
        format: 'DD MMM YYYY HH:mm',
        useCurrent: true,
      }
    }
  },
  mounted() {
    ProjectService.getUserProjects(this.setProjects, this.$session.get('user'));
  },
  methods: {
    selectTask(task){
      
      this.selected_task = Object.assign({}, task);;
    },
    getSelectedProjects(){
      return this.selected_project;
    },
    getSelectedUsers(){
      return !this.selected_project ? [] : this.selected_user ? [this.selected_user] : this.selected_project.users;
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
      this.has_right_on_project = this.hasRightOnProject(this.selected_project, this.$session.get('user'));
      this.selected_user = this.has_right_on_project ? '' : this.$session.get('user');
      UserService.getUsersOnProject(this.setUsers, this.selected_project);  
    },
    onSelectUser(){
      this.refreshTasksForSelection();
    },
    refreshTasksForSelection(){
      for(var user of this.getSelectedUsers()){
        TaskService.getAllTasksForUser(this.setTasks, null, user, this.selected_project, this.selected_start_date, this.selected_end_date);
      }
      this.$forceUpdate()
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
      }else if(stamp_end.diff(stamp_start, 'weeks')>2){
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

      var res = [];

      var nbKeyTime = stamp_end.diff(stamp_start, stamp_format, true);
      var incr = nbKeyTime > 6 ? 3 : 1;

      for(var i = 0; i < nbKeyTime; i+=incr){
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
    },
    getTaskWarnings(project, user, task){
      var res = [];
      if(!task.validated){
        res.push('La tache n\'est pas validee');
      }
      return res;
    },

    createTask(){
      var user = this.getSelectedUsers()[0];
      var start = this.$moment().startOf('month');
      var end = this.$moment().endOf('month');
      var title = 'default-name';
      TaskService.createTask(
        this.onCreateTask,
        this.$session.get('user'),
        user.id,
        this.selected_project.id,
        title,
        start,
        end
      );
    },
    removeTask(){
      TaskService.removeTask(this.onRemoveTask, this.selected_task)
    },
    editTask(){
      TaskService.editTask(this.refreshTasksForSelection, this.selected_task);
    },

    onRemoveTask(){
      this.refreshTasksForSelection();
      this.selected_task = null;
    },
    onCreateTask(task){
      this.refreshTasksForSelection();
      this.selected_task = task;
      this.scaleToTask(task);
    }
  }
}
</script>

<style>

#timeline-container{
  top:50px;
  padding: 20px;
  background-color: white;
  min-height: 50px;
  z-index: 7;
}

#tasks{
}

.user-tasks{
  margin-bottom: 75px
}

.task-row {
  margin-bottom: 20px; 
}

.task-username{
  font-weight: bold;
}

.task-title{
  line-height: 20px;
  font-size: .75em;
  margin: 0;  
}

.task-info{
  border-left: 1px solid lightgray;
}

.task-date-info{
  font-size: .5em;
  padding: 0px 10px;
  margin: 0;
}

.task-date-info p{
  margin: 0px;
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

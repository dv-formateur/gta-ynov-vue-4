<template>
  <div>
    <nav-bar></nav-bar>
    <div class="container-fluid page">
      <div class="row">
        <div class="col-md-12 col-lg-3 col-xl-2">
          <!-- FILTERS -->
          <form>
            <div class="form-group">
              <label for="employee-selector">Equipe :</label>
              <select @change="onSelectTeam()" class="form-control" name="team-selector" id="team-selector" v-model="selected_team">
                <option v-for="team in user_teams" v-bind:value="team" v-bind:key="team.id">{{team.name}}</option>
              </select>
            </div>

            <div v-if="has_right_on_team" id='manager-filter'>
              <div class="form-group">
                <label for="employee-selector">Employé(s) :</label>
                <select @change="onSelectUser()" class="form-control" name="employee-selector" id="employee-selector" v-model="selected_user">
                  <option value="">Tous</option>
                  <option v-for="user in getSelectedTeams().users" v-bind:value="user" v-bind:key="user.id">{{user.fname}} {{user.lname}}</option>
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
          <b-btn class="form-control" variant="info" @click="scaleOn($moment().startOf('month'), $moment().endOf('month'))">Reinitialiser</b-btn>

          <hr>

          <div v-if="has_right_on_team">
            <p class="text-center"><a v-b-popover.hover="'Creer une tache'" style="font-size: 24px;" @click="createTask" class="fas fa-plus-circle btn text-success"></a></p>
          </div>

          <!-- SELECTED TASK DETAILS -->
          <transition name="fade">
            <b-card 
              bg-variant="light"
              text-variant="black"
              :header="selected_task.title"
              v-if="selected_task">
              <div class="selected-task">
                <div v-if="has_right_on_team">
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
                    <option :value="null">-- Tous --</option>
                    <option v-for="user in getSelectedTeams().users" v-bind:value="user.id" v-bind:key="user.id">{{user.fname}} {{user.lname}}</option>
                  </select>

                  <label for="task-team-selector">Groupe :</label>
                  <select class="form-control" name="task-team-selector" v-model="selected_task.team_id">
                    <option :value="null">-- Tous --</option>
                    <option :value="selected_team.id">{{selected_team.name}}</option>
                  </select>

                  <label for="occupation-selector">Occupation :</label>
                  <select class="form-control" name="occupation-selector" id="occupation-selector" v-model="selected_task.occupation_id">
                    <option v-for="occupation in occupations" v-bind:value="occupation.id" v-bind:key="occupation.id">{{occupation.name}}</option>
                  </select>

                  <div class="form-group">
                    <input type="checkbox" name="task_validated" v-model="selected_task.validated">
                    <label for="task-validated">Valide</label>
                  </div>

                  <div class="form-group">
                    <b-btn v-b-popover.hover="'Valider les changements'" variant="success" @click="editTask()">Valider</b-btn>
                  </div>

                  <div class="form-group">
                    <b-btn v-b-popover.hover="'Supprimer la tache'" variant="danger" @click="removeTask()">Supprimer</b-btn>
                  </div>

                  <div v-if="selected_task.employee_demand.date_end && selected_task.employee_demand.date_start">
                    <hr>
                    <div class="form-group">
                      <p>Demande d'agencement de la tâche : </p>
                      <p>Debut : {{$moment(selected_task.employee_demand.date_start).format('DD/MM/YYYY HH:mm')}}</p>
                      <p>Fin : {{$moment(selected_task.employee_demand.date_end).format('DD/MM/YYYY HH:mm')}}</p>
                      <b-btn 
                        v-b-popover.hover="'Valider la demande d\'agencement'" 
                        variant="info"
                        @click="acceptTaskDemand()">
                          Valider
                      </b-btn>
                    </div>
                  </div>

                </div>
                <div v-else>
                  <p class="task-info-date-start">{{$moment(selected_task.date_start).format('HH:mm DD/MM/YY')}}</p>
                  <p class="task-info-date-end">{{$moment(selected_task.date_end).format('HH:mm DD/MM/YY')}}</p>
                  <hr>
                  <div class="form-group">
                    <label for="task-demand-start-date-selector">Demande d'agencement :</label>
                    <date-picker 
                      :config="date_picker_options" 
                      class="form-control" 
                      name="task-demand-start-date-selector"
                      v-model="selected_task.employee_demand.date_start">
                    </date-picker> 
                  </div>

                  <div class="form-group">
                    <date-picker 
                      :config="date_picker_options" 
                      class="form-control" 
                      name="task-demand-end-date-selector"
                      v-model="selected_task.employee_demand.date_end">
                    </date-picker>
                  </div>

                  <b-btn v-b-popover.hover="'Valider la demande'" variant="info" @click="editTask()">Valider</b-btn>
                </div>

              </div>
            </b-card>
          </transition>

        </div>

        
        <div class="col">
          <div id="tasks" class="container-fluid">
            <!-- TIMELINE -->
            <div class="col-8 offset-4 col-lg-10 offset-lg-2">
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
                v-if="
                    (hasRightOnTeam(selected_team, amIAuthentified()) 
                    && (task.warnings.length > 0 || task.dangers.length > 0))
                  || ($moment(task.date_start) < $moment(selected_end_date) 
                    && $moment(task.date_end) > $moment(selected_start_date)
                    && task.warnings.length == 0 
                    && task.dangers.length == 0)">
                  <div class="task-info col-4 col-lg-2">
                    <p 
                      class="task-title"
                      @click="show_collapse[task.id + '-' + user.id] = !show_collapse[task.id + '-' + user.id]"
                      :aria-controls="task.id + '-' + user.id"
                      :aria-expanded="!!show_collapse[task.id + '-' + user.id]">
                      <span v-if="!!show_collapse[task.id + '-' + user.id]" class="fa fa-minus"></span>
                      <span v-else class="fa fa-plus"></span>
                      {{task.title}}
                    </p>

                    <b-collapse v-model="show_collapse[task.id + '-' + user.id]" :id="task.id + '-' + user.id">
                      <hr>
                      <p>
                        <a class="fas fa-search text-info btn" @click="scaleToTask(task)"></a>
                        <a class="fas fa-file-alt text-info btn" @click="selectTask(task)"></a>
                        <a v-if="has_right_on_team" class="fas fa-trash text-danger btn" @click="removeTask(task)"></a>
                      </p>
                      <hr>
                      <div class="task-occupation-info">
                        <p>{{task.occupation.name}}</p>
                      </div>
                      <div class="task-date-info">
                        <p class="date_start">{{$moment(task.date_start).format('DD/MM/YY - HH:mm')}}</p>
                        <p class="date_end">{{$moment(task.date_end).format('DD/MM/YY - HH:mm')}}</p>
                      </div>
                      <hr>
                      <div v-for="danger in task.dangers" :key="danger">
                        <p class="text-danger"><i class="fas fa-exclamation-circle"></i> {{danger}}</p>
                      </div>
                      <div v-for="warning in task.warnings" :key="warning">
                        <p class="text-warning"><i class="fas fa-exclamation-triangle"></i> {{warning}}</p>
                      </div>
                    </b-collapse>
                  </div>

                  <component-task
                    class="col-8 col-lg-10"
                    :task="task" 
                    :start_date="selected_start_date" 
                    :end_date="selected_end_date"
                    :selected="selected_task? task.id == selected_task.id ? true : false : false"
                    :date_format="date_format"
                    v-if="task.dangers.length == 0"
                    @selectTask="selectTask">
                  </component-task>
          
              </div>
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
import Team from '../entities/team.js'

import NavBar from "../layout/NavBar.vue";
import ComponentTask from '../components/ComponentTask.vue'
import DatePicker from 'vue-bootstrap-datetimepicker';

import UserService from '../services/user.service'
import TaskService from '../services/task.service'
import TeamService from '../services/team.service'
import OccupationService from '../services/occupation.service'

export default {
  name: 'gantt-view',
  components: {
    NavBar, ComponentTask, DatePicker
  },
  data () {
    return {
      user_teams: [],
      selected_user: '',
      selected_team: '',
      selected_start_date:  this.$moment().startOf('month'),
      selected_end_date: this.$moment().endOf('month'),
      selected_task: null,

      has_right_on_team: false,

      input: {
        create_task:{
          title: '',
          date_start: '',
          date_end: '',
          user_id: ''
        }
      },

      date_format: 'DD/MM',
      show_collapse: [],

      occupations: []
    }
  },
  mounted() {
    TeamService.getUserTeams(this.setTeams, this.$session.get('user'));
    OccupationService.getAll(this.setOccupations);
  },
  methods: {
    setOccupations(occupations){
      this.occupations = occupations
    },
    selectTask(task){
      this.selected_task = Object.assign({}, task);;
    },
    getSelectedTeams(){
      return this.selected_team;
    },
    getSelectedUsers(){
      return !this.selected_team ? [] : this.selected_user ? [this.selected_user] : this.selected_team.users;
    },

    setTeams(user, teams){
      this.user_teams = teams;
      this.selected_team = this.user_teams ? this.user_teams[0] : '';
      this.onSelectTeam();
    },
    setUsers(team, users){
      team.users = users;
      this.onSelectUser();
    },
    setTasks(user, tasklist){
      user.tasklist = tasklist.map(task=>{
        task.date_start = this.$moment(task.date_start);
        task.date_end = this.$moment(task.date_end);
        this.computeTaskWarnings(task);
        this.computeTaskDangers(task);
        OccupationService.getTaskOccupation(this.setTaskOcuppation, task);
        return task;
      });
    },
    setTaskOcuppation(task, occupation){
      task.occupation = occupation;
    },


    onSelectTeam(){
      if(!this.selected_team) return;
      this.has_right_on_team = this.hasRightOnTeam(this.selected_team, this.$session.get('user'));
      this.selected_user = this.has_right_on_team ? '' : this.$session.get('user');
      UserService.getUsersOnTeam(this.setUsers, this.selected_team);  
    },
    onSelectUser(){
      this.refreshTasksForSelection();
    },
    refreshTasksForSelection(){
      for(var user of this.getSelectedUsers()){
        TaskService.getAllTasksForUser(this.setTasks, null, user, this.selected_team, this.selected_start_date, this.selected_end_date);
      }
      this.$forceUpdate()
    },
    scaleToTask(task){
      this.scaleOn(task.date_start, task.date_end);
      this.selectTask(task);
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
      var incr = nbKeyTime > 5 ? 3 : 1;

      for(var i = 0; i <= nbKeyTime; i+=incr){
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
    computeTaskWarnings(task){
      var res = [];
      if(!task.validated)res.push('La tache n\'est pas validee');
      task.warnings = res;
    },
    computeTaskDangers(task){
      var res = [];
      if(!task.date_end || !task.date_start || task.date_start == '' || task.date_end == '' || !task.date_start._isValid || !task.date_end._isValid) res.push('La date de fin et/ou la date de debut n\'est pas definie');
      if(task.date_start >= task.date_end) res.push('La date de fin doit etre apres la date de debut');
      task.dangers = res;
    },

    createTask(){
      var start = this.selected_start_date;
      var end = this.selected_end_date;
      var title = 'default-name';

      var task = new Task(0, title, start, end, null, null, false);
      TaskService.create(this.amIAuthentified(), this.onCreateTask, task);
    },
    removeTask(task = this.selected_task){
      TaskService.remove(this.amIAuthentified(), this.onRemoveTask, task)
    },
    editTask(){
      TaskService.modify(this.amIAuthentified(), this.refreshTasksForSelection, this.selected_task);
    },

    onRemoveTask(){
      this.refreshTasksForSelection();
      this.selected_task = null;
    },
    onCreateTask(task){
      this.refreshTasksForSelection();
      this.selected_task = task;
    },
    acceptTaskDemand(){
      this.selected_task.date_start = this.selected_task.employee_demand.date_start;
      this.selected_task.date_end = this.selected_task.employee_demand.date_end;
      this.selected_task.employee_demand.date_start = null;
      this.selected_task.employee_demand.date_end = null;
      TaskService.modify(this.amIAuthentified(), this.refreshTasksForSelection, this.selected_task);

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
  font-size: .90em;
  font-weight: bold;
  margin: 0;
  padding: 0;
  cursor: pointer;
}

.task-info{
  border-left: 2px solid lightgray;
  
}

.task-date-info, .task-occupation-info{
  font-size: .75em;
  padding: 0px 0px;
  margin: 10px 0px;
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
</style>

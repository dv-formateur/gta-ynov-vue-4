<template>
  <div class="row">
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

    <div class="col-md-6 col-lg-8">
      <p>{{$moment(selected_start_date).format("dddd, MMMM Do YYYY, h:mm:ss a")}}</p>
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
            @selectTask="selectTask"></component-task>
        </div>
      </div> 

       
    </div> 

      <div v-if="selected_task" class="col-sm-12 col-md-3 col-lg-2">
        <p class="task-info-title">{{selected_task.title}}</p>
        <p class="task-info-date-start">{{$moment(selected_task.date_start).format("dddd, MMMM Do YYYY, h:mm:ss a")}}</p>
        <p class="task-info-date-end">{{$moment(selected_task.date_end).format("dddd, MMMM Do YYYY, h:mm:ss a")}}</p>
        <button class="btn btn-info" @click="scaleToTask(selected_task)">Mettre a l'echelle</button>
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
      console.log(users);
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
      this.selected_start_date = task.date_start;
      this.selected_end_date = task.date_end;
    }
  },
}
</script>

<style>

  .user-tasks{
    margin-bottom: 50px;
  }

</style>

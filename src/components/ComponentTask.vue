<template>
  <div 
    @click="$emit('selectTask', task)">
    <b-progress 
      :class="['task', selected? 'task-selected' : '']"
      :style="{'width': getWidth(), 'margin-left': getMarginLeft()}"
      :value="getValue()"
      :variant="getTaskTypeClassByTypeId()"
      striped
      height="30px"
      :animated="selected">
    </b-progress>
  </div>
</template>

<script>
import Task from "../entities/task.js";

export default {
  name: "component-task",
  props: ["task", "start_date", "end_date", 'date_format', 'selected'],
  components: {
  },
  data() {
    return {
      value: 0,
      width: '0',
      margin_left: '0',
      variant:'danger'
    };
  },
  methods: {
    getWidth() {
      var stamp_start = this.$moment(this.start_date);
      var stamp_end = this.$moment(this.end_date);
      var task_start = this.$moment(this.task.date_start);
      var task_end = this.$moment(this.task.date_end);

      task_start = task_start < stamp_start ? stamp_start : task_start;
      task_end = task_end > stamp_end ? stamp_end : task_end;

      var stamp_len = stamp_end.diff(stamp_start);
      var task_len = task_end.diff(task_start);
      return task_len / stamp_len * 100 + "%";
    },
    getMarginLeft() {
      var stamp_start = this.$moment(this.start_date);
      var stamp_end = this.$moment(this.end_date);
      var task_start = this.$moment(this.task.date_start);
      var task_end = this.$moment(this.task.date_end);

      task_start = task_start < stamp_start ? stamp_start : task_start;

      var stamp_len = stamp_end.diff(stamp_start);
      var empty_len = task_start.diff(stamp_start);

      return empty_len / stamp_len * 100 + "%";
    },
    getValue(){
      var stamp_start = this.$moment(this.start_date);
      var stamp_end = this.$moment(this.end_date);
      var task_start = this.$moment(this.task.date_start);
      var task_end = this.$moment(this.task.date_end);
      
      var current = this.$moment();
      var res = 0;

      task_end = current >= task_end ? current : task_end >= stamp_end ? stamp_end : task_end;
      if(current >= task_start){
        if(current >= task_end){
          res = 100;
        }else{
           
          var task_len = task_end.diff(task_start);
          var current_len = current.diff(task_start);

          res = current_len/task_len * 100;
        }
      }
      return res;
    },
    getTaskTypeClassByTypeId() {
      var res = "danger";
      switch (this.task.type) {
        case 0:
          res = "info";
          break;
        case 1:
          res = "warning";
          break;
        case 2:
          res = "danger";
          break;
        case 3:
          res = "secondary";
          break;
      }
      return res;
    }
  }
};
</script>

<style>
.task {
  cursor: pointer;
  transition-timing-function: ease;
  transition-property: transform;
  transition: 0.5s;
}

.task-selected{
  border: 3px solid dimgray;
}

</style>

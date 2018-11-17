<template>
    <div class="task-row">
        <div :style="{'width': this.getWidth(), 'margin-left': this.getMarginLeft()}" 
                class="task" :class="[getTaskTypeClassByTypeId(task.type), selected ? 'selected': '']"
                @click="$emit('selectTask', task)">
                <div class="task-info">
                  <div class="task-date-info inline-block">
                    <div class="">{{start_date.format(date_format)}}</div>
                    <div class="">{{end_date.format(date_format)}}</div>
                  </div>
                  <p class="inline-block task-title">{{task.title}}</p>
                </div>
        </div>
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
    return {};
  },
  mounted(){
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
    getTaskTypeClassByTypeId(typeId) {
      var res = "error-task";
      switch (typeId) {
        case 0:
          res = "default-task";
          break;
        case 1:
          res = "warning-task";
          break;
        case 2:
          res = "error-task";
          break;
        case 3:
          res = "blocked-task";
          break;
      }
      return res;
    }
  }
};
</script>

<style>
.task-row {
  margin-bottom: 10px;
  width: 100%;
  min-width: 400px;
}

.task {
  cursor: pointer;
  min-width: 10px;



  transition-timing-function: ease;
  transition-property: transform;
  transition: 0.5s;
}

.task-info{
  display: inline-block;
  padding: 5px 10px;
  background-color: rgba(255, 255, 255, .90);
  border-radius: 0px 15px 15px 0px;
}

.task:hover , .selected{
  border-width: 2px !important;
}

.task-date-info{
  border-right: solid 1px lightgray;
  margin-right: 10px;
  padding: 0px 10px;
}

.task-title {
}

.default-task {
  background-color: rgba(158, 230, 129, 0.432);
  border: solid 1px rgb(151, 253, 137);
}

.warning-task {
  background-color: rgba(255, 217, 0, 0.164);
  border: solid 1px gold;
}

.error-task {
  background-color: rgba(255, 72, 0, 0.164);
  border: solid 1px rgb(255, 60, 0);
}

.blocked-task {
  border: solid 1px rgb(97, 97, 97);
  background: repeating-linear-gradient(
    45deg,
    lightgray,
    lightgray 5px,
    darkgray 5px,
    darkgray 10px
  );
}
.task-name {
  font-weight: bold;
}
</style>

<template>
  <div id="month-view">
    <input type="date" id="select-date" v-model="selected_date"/>
    current : {{selected_date}}
    <br>
    {{getNumberOfDaysToPass()}}
    <br>
    {{getNumberOfDaysToCompleteFirstWeek()}}
    <table class="table table-responsive-sm">
      <thead>
        <tr>
          <th>Lundi</th>
          <th>Mardi</th>
          <th>Mercredi</th>
          <th>Jeudi</th>
          <th>Vendredi</th>
          <th>Samedi</th>
          <th>Dimanche</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td v-for="dayToPass in getNumberOfDaysToPass()" v-bind:key="'dayToPass-'+dayToPass"></td>
          <td v-for="dayInFirstWeek in getNumberOfDaysToCompleteFirstWeek()" v-bind:key="'dayInFirstWeek-'+dayInFirstWeek">{{dayInFirstWeek}}</td>
        </tr>
        <tr v-for="restWeeks in getNumberOfWeeksToCompleteMonth()" v-bind:key="'restWeeks-'+restWeeks">
          <td v-for="restDaysInWeek in getNumberOfDaysInWeek(restWeeks)" v-bind:key="'restDaysInWeek-'+restDaysInWeek">
            {{restDaysInWeek + 7 * (restWeeks-1) + getNumberOfDaysToCompleteFirstWeek()}}
          </td>
          <td v-for="restEmptyDaysInWeek in (7 - getNumberOfDaysInWeek(restWeeks))"  v-bind:key="'restEmptyDaysInWeek-'+restEmptyDaysInWeek"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      selected_date : new Date()
    }
  },
  methods : {
    getNumberOfDaysToPass: function(){
      console.log("Day to pass : " + this.$moment(this.selected_date).startOf('month').day()-1);
      return this.$moment(this.selected_date).startOf('month').day()-1;
    },
    getNumberOfDaysToCompleteFirstWeek: function(){
      console.log("Day to complete first week : " + 8 - this.$moment(this.selected_date).startOf('month').day());
      return 8 - this.$moment(this.selected_date).startOf('month').day();
    },
    getNumberOfWeeksToCompleteMonth: function(){
      var nb = Math.round((this.$moment(this.selected_date).daysInMonth() - (this.getNumberOfDaysToCompleteFirstWeek())) / 7);
       console.log("Number of weeks to complete month : " + nb);
      return nb;
    },
    getNumberOfDaysInWeek: function(week){
      var rest = this.$moment(this.selected_date).daysInMonth() - this.getNumberOfDaysToCompleteFirstWeek() - 7 * (week-1);
      console.log("Number of days in the week : " + rest);
      return rest < 7 ? rest : 7;
    }
  }
}
</script>
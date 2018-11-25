export default class contract{
    constructor(id, user_id, dateStart, dateEnd, motif, hours, hours_per_week = 35){

        this.id = id;
        this.user_id = user_id;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.motif = motif;
        this.hours_per_week = hours_per_week;
        this.hours = hours;

        if(this.hours == null){
            this.hours = Array(7);
            for(var d = 0; d < 7; d++){
                this.hours[d] = Array(4);
                for(var h = 0; h < 4; h++){
                    var value = '00:00';

                    if(d < 5){
                        switch(h){
                            case 0:
                                value = "08:00";
                                break;
                            case 1:
                                value = "12:00";
                                break;
                            case 2:
                                value = "14:00";
                                break;
                            case 3:
                                value = "17:00";
                                break;
                        }
                    }
                    this.hours[d][h] = value;
                }
            }
        }
    }
}
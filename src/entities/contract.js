export default class contract{
    constructor(id, userId, dateStart, dateEnd, 
        mondayStart1 = '08:00', mondayStop1 = '12:00', mondayStart2 = '14:00', mondayStop2 = '17:00', 
        tuesdayStart1 = '08:00', tuesdayStop1 = '12:00', tuesdayStart2 = '14:00', tuesdayStop2 = '17:00', 
        wednesdayStart1 = '08:00', wednesdayStop1 = '12:00', wednesdayStart2 = '14:00',wednesdayStop2 = '17:00', 
        thursdayStart1 = '08:00', thursdayStop1 = '12:00', thursdayStart2 = '14:00', thursdayStop2 = '17:00', 
        fridayStart1 = '08:00', fridayStop1 = '12:00', fridayStart2 = '14:00', fridayStop2 = '17:00', 
        saturdayStart1 = '08:00', saturdayStop1 = '12:00', saturdayStart2 = '14:00', saturdayStop2 = '17:00', 
        sundayStart1 = '08:00', sundayStop1 = '12:00', sundayStart2 = '14:00', sundayStop2 = '17:00'){

        this.id = id;
        this.userId = userId;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;

        this.tuesdayStart1 = tuesdayStart1;
        this.tuesdayStop1 = tuesdayStop1;
        this.tuesdayStart2 = tuesdayStart2;
        this.tuesdayStop2 = tuesdayStop2;

        this.wednesdayStart1 = wednesdayStart1;
        this.wednesdayStop1 = wednesdayStop1;
        this.wednesdayStart2 = wednesdayStart2;
        this.wednesdayStop2 = wednesdayStop2;

        this.thursdayStart1 = thursdayStart1;
        this.thursdayStop1 = thursdayStop1;
        this.thursdayStart2 = thursdayStart2;
        this.thursdayStop2 = thursdayStop2;

        this.fridayStart1 = fridayStart1;
        this.fridayStop1 = fridayStop1;
        this.fridayStart2 = fridayStart2;
        this.fridayStop2 = fridayStop2;

        this.saturdayStart1 = saturdayStart1;
        this.saturdayStop1 = saturdayStop1;
        this.saturdayStart2 = saturdayStart2;
        this.saturdayStop2 = saturdayStop2;

        this.mondayStart1 = mondayStart1;
        this.mondayStop1 = mondayStop1;
        this.mondayStart1 = mondayStart2;
        this.mondayStop1 = mondayStop2;

        this.sundayStart1 = sundayStart1;
        this.sundayStop1 = sundayStop1;
        this.sundayStart2 = sundayStart2;
        this.sundayStop2 = sundayStop2;

        
    }
}
import { View } from 'react-native'
import React from 'react'
import { Calendar } from 'react-native-calendars'

const CustomCalendar = ({startDate, interval}) => {
  // function for formatting date in a selected pattern
  const formatDate = (date) => {
    let year = date.getFullYear();
    // month count starts at 0. so adding 1 to match with the pattern 
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    // date is shown as 2023-03-05 format
    return `${year}-${month}-${day}`;
  }

  // calculating which days will be marked as washday and showing them in a calendar
  const washDayCalculation = () => {
      let washdays = [];
      // reading startdate from database, so converting it into a usable format.
      const startingdate = (new Date(startDate.seconds*1000 + startDate.nanoseconds/1000000));
      // interval depends on user answers. So calculating the first washday using interval. 
      let washday = new Date(startingdate.getTime() + (interval * 24 * 3600 * 1000));
      washdays.push(formatDate(washday));
    
      // now we're adding all washdays and storing that in an array
      for (let i = 0; i < 19; i++) {
        washday = new Date(washday.getTime() + (interval * 24 * 3600 * 1000));
        washdays.push(formatDate(washday));
      }
      return washdays;
    }

    // storing the washday array as markedDays to show in calendar
    const markedDays = washDayCalculation();
    // function to create objects for adding in calendar prop
    const markedDates = markedDays.reduce((dates, day) => {
        dates[day] = { dots: [{ key: 'washday', color: 'blueviolet' }]}
        return dates;
    }, {});



  return (
    // Rendering the calendar using selected washdays.
    <View style={{marginHorizontal: '5%'}}>
        <Calendar
          markingType={'multi-dot'}
          markedDates={markedDates}
        />
    </View>
  )
}

export default CustomCalendar

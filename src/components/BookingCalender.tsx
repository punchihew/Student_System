import React, { useState } from 'react'
import {  ScheduleXCalendar, useCalendarApp } from '@schedule-x/react'
import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
  } from '@schedule-x/calendar'
  import { createEventsServicePlugin } from '@schedule-x/events-service'
  import './index.css'
  import { createEventModalPlugin } from '@schedule-x/event-modal'
import AppoinmentModel from './AppoinmentModel'


const BookingCalendar = () => {
    const [showSearchPopup, setShowSearchPopup] = React.useState<{
        show: boolean
        dateTime: string
    }>({
        show: false,
        dateTime: '',
    }) // This is the state that will be used to show the appointment model time and date
    const eventsService = useState(() => createEventsServicePlugin())[0] // This is the state that will be used to create events
    const eventModal = useState(() => createEventModalPlugin())[0] // This is the state that will be used to create the event modal
    const calendar = useCalendarApp({ // This is the state that will be used to create the calendar
        views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()], // This is the view of the calendar
        callbacks: {
            onClickDateTime(dateTime) {
                setShowSearchPopup({ show: true, dateTime }) // This is the callback function that will be called when the date and time is clicked
            },

            onEventClick(event) {
                console.log(event) // This is the callback function that will be called when the event is clicked
            },
        },
        events: [ // This is the events that will be displayed on the calendar
          {
            id: '1',
            title: 'Event 1',
            start: '2025-01-25 20:15',
            end: '2025-01-25 21:15',
          },
          {
            id: '2',
            title: 'Event 2',
            start: '2025-01-24 10:15',
            end: '2025-01-24 11:15',
          },
        ],
        

        calendars: { // This is the calendar that will be displayed on the calendar
            leisure: {
              colorName: 'leisure',
              lightColors: {
                main: '#FF0000',
                container: '#292929',
                onContainer: '#EFEFEF',
              },
              darkColors: {
                main: '#FF0000',
                container: '#292929',
                onContainer: '#EFEFEF',
              },
            },
          },
      }, [eventsService, eventModal])

    
      // This function is used to calculate the end time of the event
      const calculateEndTime = (startTime: string, durationMinutes: number): string => {
        // Parse the start time (assuming it's in "HH:mm" format)
        const [hours, minutes] = startTime.split(':').map(num => parseInt(num, 10));
    
        // Calculate the total minutes after adding the duration
        const totalMinutes = hours * 60 + minutes + durationMinutes;
    
        // Get the new hours and minutes from the total minutes
        const endHours = Math.floor(totalMinutes / 60);
        const endMinutes = totalMinutes % 60;
    
        // Format the hours and minutes to always show two digits
        const formattedEndTime = `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
    
        return formattedEndTime;
    }


  return (
    <>
    <div className='w-full h-full flex flex-col lg:flex-row gap-x-4'>
        <div className='w-full h-full flex flex-col'>
        <ScheduleXCalendar calendarApp={calendar} />
        </div>
        
    </div>
    <AppoinmentModel 
    open={showSearchPopup.show} 
    onClose={()=>setShowSearchPopup({show:false,dateTime:''})} 
    dateTime={showSearchPopup.dateTime}
    appointmentData={(data) => {
        // Add the event to the calendar
        calendar.events.add({
            id: '4',
            title: 'Event 1',
            start: data.date + ' ' + data.time,
            end: data.date + ' ' + calculateEndTime(data.time, Number(data.duration)),
        })
    }}
    />
    </>
  )
}

export default BookingCalendar
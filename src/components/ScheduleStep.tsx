import { useState } from 'react';
import { DateRange, DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import toast from 'react-hot-toast';


interface ScheduleStepProps {
    selectEmployeeData?: (data: {
        id: number;
        name: string;
        email: string;
        profile: string;
        position: string;
        workingDays: string[];
        workFlow: {
            startTime: string;
            endTime: string;
            status: string;
        }[]
    } | undefined) => void
    onContinue?: () => void
}

const ScheduleStep = ({ selectEmployeeData, onContinue }: ScheduleStepProps) => {
    


    const [selected, setSelected] = useState<DateRange | undefined>(); // selected date range
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] // days of the week
    const [selectedDays, setSelectedDays] = useState<string[]>([]) // selected days
    const [workFlow, setWorkFlow] = useState<{
        startTime: string;
        endTime: string;
        status: string;
    }[]>([]) // work flow
    const [showConfirmation, setShowConfirmation] = useState(false) // show confirmation
    const [employeeData, setEmployeeData] = useState<{
        id: number;
        name: string;
        email: string;
        profile: string;
        position: string;
        workingDays: string[];
        workFlow: {
            startTime: string;
            endTime: string;
            status: string;
        }[]
    }>() // employee data

    const clearAllFieldsAndForms = () => {
        setSelectedDays([])
        setWorkFlow([])
        setSelected(undefined)
    }


    const checkSlotsTimeExceeds24Hours = (
        tasks: {
            startTime: string; // in HH:mm format
            endTime: string;   // in HH:mm format
            status: string;
        }[] // tasks
    ): boolean => {
        const totalMillisecondsIn24Hours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        let totalDuration = 0;

        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

        tasks.forEach((task) => {
            const start = new Date(`${today}T${task.startTime}:00Z`); // Create a date object for the start time
            const end = new Date(`${today}T${task.endTime}:00Z`);    // Create a date object for the end time

            // Calculate the duration for each task
            totalDuration += end.getTime() - start.getTime();
        });

        // Check if the total duration exceeds 24 hours
        return totalDuration > totalMillisecondsIn24Hours;
    };

    // Function to handle the save work flow
    const handleSaveWorkFlow = () => {

        setEmployeeData({
            name: '',
            email: '',
            id: 0,
            profile: '',
            position: '',
            workingDays: selectedDays,
            workFlow: workFlow
        }) // set the employee data
        if (selectEmployeeData) {
            selectEmployeeData(employeeData)
        }
    }
    const [resetconfirmation, setResetConfirmation] = useState(false) // reset confirmation
    const defaultClassNames = getDefaultClassNames(); // default class names for the day picker
    return (
        <>

            <div className='w-full h-full flex flex-col items-center justify-center'>
                <div className='flex flex-col gap-x-2 w-full h-full'>
                    <div className='flex flex-col w-full h-full gap-y-3'>
                        <div className='w-full flex flex-row gap-x-2 justify-between items-center'>
                            <h2 className='text-[16px] font-bold text-[#292929]'>
                                Schedule your workflow
                            </h2>
                            <button onClick={() => {
                                clearAllFieldsAndForms()
                            }}
                                className='bg-[#292929] w-[80px] h-[40px] text-white rounded-md text-[14px] font-semibold shadow-md'>
                                Clear All
                            </button>
                        </div>


                        <div className='flex flex-col w-full gap-y-2'>
                            <h2 className='text-[16px] font-semibold text-[#292929]'>
                                Select your working days
                            </h2>

                            <div className='w-full flex flex-wrap gap-2 items-center justify-center '>
                                {
                                    days.map((day, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                if (selectedDays.includes(day)) {
                                                    setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day))
                                                } else {
                                                    setSelectedDays([...selectedDays, day])
                                                }
                                            }}
                                            className={`px-4 min-w-[140px] h-[40px] gap-x-3 rounded-md flex items-center justify-center text-[#292929] ${selectedDays.includes(day) ? 'bg-primary text-white border-primary' : 'bg-white md:border-[#292929] md:hover:border-primary'} border-[2px] border-[#292929] md:hover:bg-primary md:hover:text-white hover:border-[2px] cursor-pointer`}>
                                            {day}
                                            <img src="https://bookmei-bucket.s3.ap-south-1.amazonaws.com/frontend/provider/public/home_icon.png" alt="icon" className={`w-[12px] h-[12px] ml-2 ${selectedDays.includes(day) ? 'block' : 'hidden'}`} />
                                        </button>
                                    ))
                                }
                            </div>


                            <div className='flex flex-col w-full gap-y-2'>
                                <h2 className='text-[16px] font-semibold text-[#292929]'>
                                    Select date range
                                </h2>

                                <div className=' w-full px-4 h-full flex items-center justify-center sm:py-4'>
                                    <DayPicker
                                        mode="range"
                                        selected={selected}
                                        onSelect={setSelected}
                                        style={{
                                            '--rdp-range_start-date-background-color': '#ffc300 ',
                                            '--rdp-range_end-date-background-color': '#ffc300 ',
                                            '--rdp-range_start-color': '#fff',
                                            '--rdp-range_end-color': '#fff',
                                            '--rdp-range_middle-color': '#292929',
                                            '--rdp-range_middle-background-color': '#ffe799',
                                        } as React.CSSProperties}
                                        classNames={{
                                            today: `border-primary`, // Add a border to today's date
                                            selected: `bg-primary rounded-md text-white`, // Highlight the selected day
                                            root: `${defaultClassNames.root} shadow-lg p-5`, // Add a shadow to the root element
                                            chevron: ` fill-primary` // Change the color of the chevron

                                        }}
                                        disabled={{
                                            dayOfWeek: [0, 1, 2, 3, 4, 5, 6].filter((day) => !selectedDays.includes(days[day]))
                                        }}
                                    />
                                </div>

                                <div className='w-full flex flex-col'>
                                    <div className='flex flex-col gap-y-2 w-full'>
                                        <p className='text-[14px] font-semibold text-[#292929]'>
                                            From:
                                        </p>
                                        <div className='flex flex-row gap-x-2 bg-[#efefef] px-4 h-[40px] w-full rounded-md justify-between items-center'>
                                            <p className='text-[14px] font-semibold text-[#292929]'>
                                                {selected?.from?.toDateString()}
                                            </p>
                                            <img src="https://bookmei-bucket.s3.ap-south-1.amazonaws.com/frontend/provider/public/home_icon.png" alt="icon" className='w-[20px] h-[20px]' />
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-y-2 w-full'>
                                        <p className='text-[14px] font-semibold text-[#292929]'>
                                            To:
                                        </p>
                                        <div className='flex flex-row gap-x-2 bg-[#efefef] px-4 h-[40px] w-full rounded-md justify-between items-center'>
                                            <p className='text-[14px] font-semibold text-[#292929]'>
                                                {selected?.to?.toDateString()}
                                            </p>
                                            <img src="https://bookmei-bucket.s3.ap-south-1.amazonaws.com/frontend/provider/public/home_icon.png" alt="icon" className='w-[20px] h-[20px]' />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col gap-y-2 w-full'>

                                <div className='px-2 py-2'>
                                    <h3 className='text-[14px] font-semibold text-[#292929]'>
                                        Add your schedule
                                    </h3>
                                    <p className='text-[12px] text-[#6B7280]'>
                                        Notice: You can not add more than 24 hours work flow in a day.
                                    </p>
                                </div>
                                <div className='w-full h-full flex flex-col  gap-x-2 justify-center'>

                                    <div className='w-full flex flex-col h-full'>

                                        <div className='w-full h-full flex flex-grow'>
                                            <form onSubmit={(e) => {
                                                e.preventDefault();

                                                if (!selectedDays.length) {
                                                    toast.error('Select working days');
                                                    return;

                                                }

                                                // Accessing form data
                                                const form = e.target as HTMLFormElement;
                                                const formData = new FormData(form);
                                                const stime = formData.get('startTime');
                                                const etime = formData.get('endTime');
                                                const status = formData.get('status');




                                                if (stime !== '' && etime !== '' && status !== '') {

                                                    if (!status) {
                                                        toast.error('Select status');
                                                        return;
                                                    }

                                                    if (checkSlotsTimeExceeds24Hours(workFlow)) {
                                                        toast.error('Work flow exceeds 24 hours');
                                                        return;
                                                    }


                                                    // check if the task time overlaps with any other task
                                                    if (workFlow.some((task) => {
                                                        const taskStart = new Date(`2022-01-01T${task.startTime}:00`);
                                                        const taskEnd = new Date(`2022-01-01T${task.endTime}:00`);
                                                        const newTaskStart = new Date(`2022-01-01T${stime as string}:00`);
                                                        const newTaskEnd = new Date(`2022-01-01T${etime as string}:00`);
                                                        return (taskStart < newTaskEnd && taskEnd > newTaskStart);
                                                    })) {
                                                        toast.error('Task overlaps with another task');
                                                        return;
                                                    }

                                                    setWorkFlow([...workFlow, {
                                                        startTime: stime as string,
                                                        endTime: etime as string,
                                                        status: status as string
                                                    }])

                                                    form.reset();

                                                } else {
                                                    toast.error('All fields are required');
                                                }

                                            }} className='w-full flex flex-col gap-y-2 h-full'>

                                                <div className='w-full h-full flex-grow flex flex-col gap-y-2'>
                                                    <div className='w-full flex flex-col gap-y-2'>
                                                        <p className='text-[14px] font-semibold text-[#292929]'>
                                                            From:
                                                        </p>
                                                        <input
                                                            name="startTime"
                                                            type="time"
                                                            className='w-full h-[40px] border-[2px] border-white rounded-md px-3 bg-[#efefef]'
                                                        />
                                                    </div>
                                                    <div className='w-full flex flex-col gap-y-2'>
                                                        <p className='text-[14px] font-semibold text-[#292929]'>
                                                            To:
                                                        </p>
                                                        <input
                                                            name="endTime"
                                                            type="time"
                                                            className='w-full h-[40px] border-[2px] border-white rounded-md px-3 bg-[#efefef]'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='w-full flex items-center flex-row gap-x-4 justify-end'>
                                                    <label className='flex flex-row gap-x-2 items-center'>
                                                        <input
                                                            type="radio"
                                                            name="status"
                                                            value="available"
                                                            className='w-4 h-4 accent-black'
                                                        />
                                                        <span>
                                                            Available
                                                        </span>
                                                    </label>
                                                    <label className='flex flex-row gap-x-2 items-center'>
                                                        <input
                                                            type="radio"
                                                            name="status"
                                                            value="interval"
                                                            className='w-4 h-4 accent-black'
                                                        />
                                                        <span>
                                                            Interval
                                                        </span>
                                                    </label>
                                                </div>
                                                <div className='w-full h-[50px] flex items-center justify-center'>
                                                    <button type='submit' className='w-full h-[50px] bg-primary text-white rounded-md'>
                                                        Schedule
                                                    </button>
                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                    {/* timer stack */}
                                    <div className='flex flex-col'>
                                        <div className='w-full  h-full flex flex-col gap-y-2  p-2  rounded-sm '>
                                            {
                                                workFlow.map((flow, index) => (
                                                    <div key={index} className='w-full py-1 border-[#292929]  shadow-sm border-[2px] relative flex flex-row justify-between items-start pl-3 pr-2 pt-1 rounded-md'>
                                                        <div className='flex flex-col gap-y-1'>
                                                            <img src="https://bookmei-bucket.s3.ap-south-1.amazonaws.com/frontend/provider/public/home_icon.png" alt="icon" className={`w-[20px] h-[20px] text-green-400 ${flow.status === 'available' ? 'text-green-400' : 'text-red-500'}`} />
                                                            <p className='text-[#292929]'>{flow.startTime} - {flow.endTime}</p>
                                                        </div>

                                                        <div
                                                            onClick={() => {
                                                                setWorkFlow(workFlow.filter((_, i) => i !== index))
                                                            }}
                                                            className='flex items-center justify-center cursor-pointer'>
                                                            <img src="https://bookmei-bucket.s3.ap-south-1.amazonaws.com/frontend/provider/public/home_icon.png" alt="icon" className='w-[16px] h-[16px]' />
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <div className='w-full flex items-center justify-center h-[50px]'>
                                            <button
                                                disabled={!workFlow.length}
                                                onClick={() => {
                                                    setShowConfirmation(true)
                                                }} className='w-full h-[50px] bg-[#292929] text-white rounded-md disabled:bg-slate-600'>
                                                Continue
                                            </button>
                                        </div>
                                        <div className=' h-[50px]' />
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>



            {
                showConfirmation && (
                    <div className="w-full h-[calc(100vh)] bg-black/20 backdrop-blur-sm flex items-center justify-center fixed top-0 left-0">
                        <div className="min-w-[400px] max-w-[500px]  bg-white p-4 rounded-md flex flex-col gap-y-2">
                            <h2 className="text-[16px] font-semibold text-[#292929]">
                                Confirmation
                            </h2>
                            <p className="text-[14px] text-[#292929] text-justify">
                                This working schedule use as your default working schedule, this schedule will be used for show your availability in booking slots. <br />
                            </p>
                            <p className="text-[14px] text-[#292929] text-justify">
                                you can change this schedule anytime from your working schedule. <br />
                            </p>
                            <p className="text-[14px] text-[#292929] text-justify">
                                Please confirm this schedule. to continue
                            </p>
                            <div className="w-full flex items-center justify-end gap-x-2 pt-5">
                                <button onClick={() => {
                                    setShowConfirmation(false)
                                }} className="text-[#292929] w-[100px] bg-[#efefef] h-[40px] rounded-md shadow-sm">
                                    Cancel
                                </button>
                                <button onClick={() => {
                                    if (onContinue) {
                                        onContinue()
                                    }
                                    setShowConfirmation(false)
                                    handleSaveWorkFlow()
                                }} className="text-white w-[100px] bg-[#292929] h-[40px] rounded-md shadow-sm">
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                resetconfirmation && (
                    <div className="w-full h-[calc(100vh)] bg-black/20 backdrop-blur-sm flex items-center justify-center fixed top-0 left-0">
                        <div className="min-w-[400px] max-w-[500px]  bg-white p-4 rounded-md flex flex-col gap-y-2">
                            <h2 className="text-[16px] font-semibold text-[#292929]">
                                Reset Confirmation
                            </h2>
                            <p className="text-[14px] text-[#292929] text-justify">
                                This will reset your default work flow to the initial state. you will lose all your work flow data.
                            </p>
                            <p className="text-[14px] text-[#292929] text-justify">
                                Please confirm this action to reset your default work flow.
                            </p>
                            <div className="w-full flex items-center justify-end gap-x-2 pt-5">
                                <button onClick={() => {
                                    setResetConfirmation(false)
                                }} className="text-[#292929] w-[100px] bg-[#efefef] h-[40px] rounded-md shadow-sm">
                                    Cancel
                                </button>
                                <button onClick={() => {
                                    if (onContinue) {
                                        onContinue()
                                    }
                                    setResetConfirmation(false)
                                    setEmployeeData(undefined)
                                }} className="text-white w-[100px] bg-[#292929] h-[40px] rounded-md shadow-sm">
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default ScheduleStep
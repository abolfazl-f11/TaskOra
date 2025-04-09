import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import TaskComponent from '../../Components/taskComponent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useAtom } from 'jotai';
import { taskListAtom } from '../../Atoms/AtomsNewTask'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
    borderRadius: 5
};

const HomePage = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [dueDates, setDueDates] = React.useState('');
    const [priority, setPriority] = React.useState('');
    const [effort, setEffort] = React.useState('');
    const [textTitle, setTextTitle] = React.useState('');
    const [clientName, setClientName] = React.useState('');
    const [taskList, setTaskList] = useAtom(taskListAtom);

    const handleTextTitle = (e) => {
        setTextTitle(e.target.value)
    }

    const handleDueDates = (event) => {
        setDueDates(event.target.value);
    };

    const handlePriority = (event) => {
        setPriority(event.target.value);
    };

    const handleEffort = (event) => {
        setEffort(event.target.value);
    };

    const handleClientName = (e) => {
        setClientName(e.target.value)
    }

    const handleSetTask = () => {
        if (!textTitle.trim() || !clientName || !dueDates || !priority || !effort) return;

        const newTask = {
            title: textTitle,
            clientName: clientName,
            dueDate: dueDates,
            priority,
            effort,
            id: Date.now(),
            taskDone: false,
        };

        setTaskList([...taskList, newTask]);

        setTextTitle('');
        setDueDates('');
        setPriority('');
        setEffort('');
        setClientName('')
        setOpen(false);
    };

    return (
        <div className="w-full h-screen bg-[#6358DC] flex flex-col gap-4">
            <h1 className="text-center text-[#fff] font-bold text-4xl h-[5%]">Taskora</h1>
            <div className="flex justify-center items-center gap-4 w-full">
                <div className="w-[45%] max-h-[90vh] rounded-[12px] bg-[#D5CCFF] p-4 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <div className='flex gap-2'>
                            <AssignmentIcon fontSize='large' sx={{ color: '#6358DC' }} />
                            <h1 className='text-2xl font-bold'>To-Do</h1>
                        </div>
                        <Button onClick={handleOpen} variant="contained" color="success">
                            New Task
                        </Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <h1 className='text-xl font-bold text-[#6358DC] self-start'>New Task</h1>
                                <div className='flex flex-col gap-6 w-[95%]'>
                                    <div className='w-full flex flex-col gap-2'>
                                        <label htmlFor="" className='text-[18px] self-start'>Title</label>
                                        <input type="text" placeholder='Enter your Title Task' className='w-full outline-none bg-[#ECECEC] p-2 rounded' value={textTitle} onChange={handleTextTitle} />
                                    </div>
                                    <div className='w-full flex flex-col gap-2'>
                                        <label htmlFor="" className='text-[18px] self-start'>Client Name or project</label>
                                        <input type="text" placeholder='Enter your Client Name or project' className='w-full outline-none bg-[#ECECEC] p-2 rounded' value={clientName} onChange={handleClientName} />
                                    </div>
                                    <div className='flex justify-between w-full'>
                                        <FormControl sx={{ mt: 1, width: '30%' }}>
                                            <InputLabel>Due Dates</InputLabel>
                                            <Select
                                                value={dueDates}
                                                onChange={handleDueDates}
                                                autoWidth
                                                label="DueDates"
                                                variant="outlined"
                                            >
                                                <MenuItem value="Sunday">Sunday</MenuItem>
                                                <MenuItem value="Monday">Monday</MenuItem>
                                                <MenuItem value="Tuesday">Tuesday</MenuItem>
                                                <MenuItem value="Wednesday">Wednesday</MenuItem>
                                                <MenuItem value="Thursday">Thursday</MenuItem>
                                                <MenuItem value="Friday">Friday</MenuItem>
                                                <MenuItem value="Saturday">Saturday</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl sx={{ mt: 1, minWidth: '30%' }}>
                                            <InputLabel >Priority</InputLabel>
                                            <Select
                                                value={priority}
                                                onChange={handlePriority}
                                                autoWidth
                                                label="Priority"
                                            >
                                                <MenuItem value="Low">Low</MenuItem>
                                                <MenuItem value="Medium">Medium</MenuItem>
                                                <MenuItem value="High">High</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl sx={{ mt: 1, minWidth: '33%' }}>
                                            <InputLabel >Level of Effort</InputLabel>
                                            <Select
                                                value={effort}
                                                onChange={handleEffort}
                                                autoWidth
                                                label="Effort"
                                            >
                                                <MenuItem value="Easy">Easy</MenuItem>
                                                <MenuItem value="Moderate">Moderate</MenuItem>
                                                <MenuItem value="Hard">Hard</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <Button onClick={handleSetTask} variant="contained" color="success" style={{ width: '25%', height: '50px', alignSelf: 'center' }}>
                                        Set Task
                                    </Button>
                                </div>

                            </Box>
                        </Modal>

                    </div>
                    <div className='flex flex-col items-center gap-2 overflow-y-scroll h-[95%]'>
                        <TaskComponent />
                    </div>
                </div>
                <div className="w-[45%] max-h-[90vh] rounded-[12px] bg-[#D5CCFF] p-4 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <div className='flex gap-2'>
                            <AssignmentTurnedInIcon fontSize='large' sx={{ color: '#6358DC' }} />
                            <h1 className='text-2xl font-bold'>Done</h1>
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-2 overflow-y-scroll h-[95%]'>
                        {/* <TaskComponent /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default HomePage;
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import TaskComponent from '../../Components/taskComponent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { api } from '../Asghar'
import Modal from '@mui/material/Modal';
import * as React from 'react';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useAtom } from 'jotai';
import { taskListAtom } from '../../Atoms/AtomsNewTask';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: '70%', md: '50%', lg: '40%' },
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: { xs: 2, sm: 3, md: 4 },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
    borderRadius: 5
};



const HomePage = () => {
    const navigator = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [dueDates, setDueDates] = React.useState('');
    const [priority, setPriority] = React.useState('');
    const [effort, setEffort] = React.useState('');
    const [textTitle, setTextTitle] = React.useState('');
    const [clientName, setClientName] = React.useState('');
    const [taskList, setTaskList] = useAtom(taskListAtom);

    React.useEffect(() => {
        try {
            const tokecChecking = async () => {
                const response = await api.get('/auth/validate-token')
                    .then(() => {
                        toast.success('token is valid')
                    })
            }
            tokecChecking()
        } catch {
            toast.error('Session expired. Redirecting...');
            localStorage.removeItem('userToken');
            navigator('/login');
        }

        const fetchData = async () => {
            try {
                const tasksRes = await api.get('/task/d');
                setTaskList(tasksRes.data.map(task => ({
                    ...task,
                    id: task._id,
                    status: task.status || 'todo',
                })));
            } catch (error) {
                toast.error('Failed to fetch tasks or invalid token');
                localStorage.removeItem('userToken');
                navigator('/login');
            }
        };

        fetchData();


    }, []);

    const handleSetTask = async () => {
        if (!textTitle || !clientName || !priority || !effort || !dueDates) return;

        const newTask = {
            title: textTitle,
            projectName: clientName,
            days: dueDates,
            priority,
            level: effort,
            status: 'todo'
        };

        try {
            const response = await api.post('/task/c', newTask);
            const createdTask = {
                ...newTask,
                id: response.data._id
            };
            setTaskList([...taskList, createdTask]);
            toast.success('Task created successfully');

            // reset form
            setTextTitle('');
            setDueDates('');
            setPriority('');
            setEffort('');
            setClientName('');
            setOpen(false);
        } catch (error) {
            toast.error('Error creating task');
            setOpen(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#6358DC] flex flex-col gap-4">
            <h1 className="text-center text-white font-bold text-4xl h-[5%]">Taskora</h1>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-4 w-full">
                {/* To-Do Tasks */}
                <div className="w-[90%] lg:w-[45%] max-h-[90vh] rounded-[12px] bg-[#D5CCFF] p-4 flex flex-col gap-4 self-start">
                    <div className="flex justify-between items-center">
                        <div className='flex gap-2'>
                            <AssignmentIcon fontSize='large' sx={{ color: '#6358DC' }} />
                            <h1 className='text-2xl font-bold'>To-Do</h1>
                        </div>
                        <Button onClick={() => setOpen(true)} variant="contained" color="success">New Task</Button>
                        <Modal open={open} onClose={() => setOpen(false)}>
                            <Box sx={style}>
                                <h1 className='text-xl font-bold text-[#6358DC] self-start'>New Task</h1>
                                <div className='flex flex-col gap-6 w-[95%]'>
                                    <div className='w-full flex flex-col gap-2'>
                                        <label className='text-[18px] self-start'>Title</label>
                                        <input type="text" placeholder='Enter your Title Task' className='w-full outline-none bg-[#ECECEC] p-2 rounded' value={textTitle} onChange={e => setTextTitle(e.target.value)} />
                                    </div>
                                    <div className='w-full flex flex-col gap-2'>
                                        <label className='text-[18px] self-start'>Client Name or project</label>
                                        <input type="text" placeholder='Enter your Client Name or project' className='w-full outline-none bg-[#ECECEC] p-2 rounded' value={clientName} onChange={e => setClientName(e.target.value)} />
                                    </div>
                                    <div className='flex justify-between w-full'>
                                        <FormControl sx={{ mt: 1, width: '30%' }}>
                                            <InputLabel>Due Dates</InputLabel>
                                            <Select value={dueDates} onChange={e => setDueDates(e.target.value)} label="Due Dates">
                                                {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(day => (
                                                    <MenuItem key={day} value={day}>{day}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormControl sx={{ mt: 1, width: '30%' }}>
                                            <InputLabel>Priority</InputLabel>
                                            <Select value={priority} onChange={e => setPriority(e.target.value)} label="Priority">
                                                {["Low", "Medium", "High"].map(level => (
                                                    <MenuItem key={level} value={level}>{level}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormControl sx={{ mt: 1, width: '33%' }}>
                                            <InputLabel>Level of Effort</InputLabel>
                                            <Select value={effort} onChange={e => setEffort(e.target.value)} label="Level of Effort">
                                                {["Easy", "Moderate", "Hard"].map(eff => (
                                                    <MenuItem key={eff} value={eff}>{eff}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <Button onClick={handleSetTask} variant="contained" color="success" sx={{ width: "37%", height: '50px', alignSelf: 'center' }}>
                                        Set Task
                                    </Button>
                                </div>
                            </Box>
                        </Modal>
                    </div>
                    <div className='flex flex-col items-center gap-2 overflow-y-auto max-h-[75vh]'>
                        <TaskComponent mode="todo" />
                    </div>
                </div>

                {/* Done Tasks */}
                <div className="w-[90%] lg:w-[45%] max-h-[90vh] rounded-[12px] bg-[#D5CCFF] p-4 flex flex-col gap-4 self-start">
                    <div className="flex justify-between items-center">
                        <div className='flex gap-2'>
                            <AssignmentTurnedInIcon fontSize='large' sx={{ color: '#6358DC' }} />
                            <h1 className='text-2xl font-bold'>Done</h1>
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-2 overflow-y-auto max-h-[75vh]'>
                        <TaskComponent mode="done" />
                    </div>
                </div>
            </div>
            <Toaster position="top-center" />
        </div>
    );
};

export default HomePage;

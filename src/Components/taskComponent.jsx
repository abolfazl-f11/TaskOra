import { useAtom } from 'jotai';
import { taskListAtom } from '../Atoms/AtomsNewTask';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskComponent = ({ mode }) => {

    const [taskList, setTaskList] = useAtom(taskListAtom);
    const token = localStorage.getItem('userToken');


    const toggleTaskDone = async (id, currentStatus) => {
        const newStatus = currentStatus === 'done' ? 'todo' : 'done';

        try {
            await axios.patch(`http://192.168.137.1:3000/task/${id}`, {
                status: newStatus,
            }, {
                headers: {
                    Authorization: localStorage.getItem('userToken'),
                }
            });

            const updatedList = taskList.map(task =>
                task.id === id ? { ...task, status: newStatus } : task
            );

            setTaskList(updatedList);
        } catch (error) {
            toast.error("Failed to update task status");
        }
    };


    const filteredTasks = taskList.filter(task =>
        mode === 'done' ? task.status === 'done' : task.status === 'todo'
    );

    const getPriorityColorIcon = (priority) => {
        switch (priority) {
            case 'Low':
                return 'src/Components/img/PriLow.svg';
            case 'Medium':
                return 'src/Components/img/PriMedium.svg';
            case 'High':
                return 'src/Components/img/PriHigh.svg';
            default:
                return 'src/Components/img/Effort.svg';
        }
    };

    const getEffortCount = (level) => {
        switch (level) {
            case 'Easy':
                return 1;
            case 'Moderate':
                return 2;
            case 'Hard':
                return 3;
            default:
                return 0;
        }
    };

    const colorDay = (priority) => {
        switch (priority) {
            case 'Low':
                return '#2D41A7';
            case 'Medium':
                return '#ECB800';
            case 'High':
                return '#E42C5F';
        }
    }

    const handleDeleteToken = async (id) => {
        try {
            await axios.delete(`http://192.168.137.1:3000/task/${id}`, {
                headers: {
                    Authorization: token,
                }
            });

            const updatedList = taskList.filter(task => task.id !== id);

            setTaskList(updatedList);

            toast.success('Task deleted successfully');
        } catch (error) {
            toast.error("Failed to delete task");
        }
    };

    return (
        <>
            {filteredTasks.map((task, index) => (
                <div key={index} className='w-[97%] bg-white rounded-[12px] py-3 px-4 flex flex-col justify-between' id={task.id}>
                    <div className='flex justify-between px-1'>
                        <input
                            type="checkbox"
                            checked={task.status === 'done'}
                            onChange={() => toggleTaskDone(task.id, task.status)}
                        />
                        <Button onClick={() => handleDeleteToken(task.id)} variant="outlined" startIcon={<DeleteIcon />} color='error' sx={{ padding: '5px' }}>
                            Delete
                        </Button>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <h1 className='text-xl font-bold pl-1'>{task.title}</h1>
                        <div className="flex justify-between items-center text-sm text-gray-600">
                            <div className='flex gap-2'>
                                <div style={{ backgroundColor: colorDay(task.priority) }} className='p-2 rounded-[8px] flex items-center justify-center'>
                                    <p className='text-white font-bold'>{task.days ? task.days.slice(0, 3) : ''}</p>
                                </div>
                                <div className='flex gap-2'>
                                    {[1, 2, 3].map((n) => (
                                        <img
                                            key={n}
                                            className='w-6'
                                            src={
                                                n <= getEffortCount(task.level)
                                                    ? getPriorityColorIcon(task.priority)
                                                    : 'src/Components/img/Effort.svg'
                                            }
                                            alt=""
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className='text-[#2B1887] text-[18px] pr-3'>{task.projectName}</p>
                            <Toaster position="top-center" />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default TaskComponent;

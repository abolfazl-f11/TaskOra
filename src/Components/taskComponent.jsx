import { useAtom } from 'jotai';
import { taskListAtom } from '../Atoms/AtomsNewTask';

const TaskComponent = ({ mode }) => {

    const [taskList, setTaskList] = useAtom(taskListAtom);

    const toggleTaskDone = (id) => {
        const updatedList = taskList.map(task =>
            task.id === id ? { ...task, taskDone: !task.taskDone } : task
        );
        setTaskList(updatedList);
    };

    const filteredTasks = taskList.filter(task =>
        mode === 'done' ? task.taskDone : !task.taskDone
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

    const getEffortCount = (effort) => {
        switch (effort) {
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

    return (
        <>
            {filteredTasks.map((task, index) => (
                <div key={index} className='w-[97%] bg-white rounded-[12px] py-3 px-4 h-[105px] flex flex-col justify-between gap-2' id={task.id}>
                    <div className='flex justify-between'>
                        <h1 className='text-xl font-bold pl-1'>{task.title}</h1>
                        <input type="checkbox" checked={task.taskDone} onChange={() => toggleTaskDone(task.id)} />
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                        <div className='flex gap-2'>
                            <div style={{ backgroundColor: colorDay(task.priority) }} className='p-2 rounded-[8px] flex items-center justify-center'>
                                <p className='text-white font-bold'>{task.dueDate.slice(0, 3)}</p>
                            </div>
                            <div className='flex gap-2'>
                                {[1, 2, 3].map((n) => (
                                    <img
                                        key={n}
                                        className='w-6'
                                        src={
                                            n <= getEffortCount(task.effort)
                                                ? getPriorityColorIcon(task.priority)
                                                : 'src/Components/img/Effort.svg'
                                        }
                                        alt=""
                                    />
                                ))}
                            </div>
                        </div>
                        <p className='text-[#2B1887] text-[18px] pr-3'>{task.clientName}</p>
                    </div>
                </div>
            ))}
        </>
    );
};

export default TaskComponent;

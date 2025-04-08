import { useAtom } from 'jotai';
import { taskListAtom } from '../Atoms/AtomsNewTask';

const TaskComponent = () => {
    const [taskList] = useAtom(taskListAtom);

    return (
        <>
            {taskList.map((task, index) => (
                <div key={index} className='w-[95%] bg-white rounded p-4 h-[115px] flex flex-col justify-between'>
                    <h1 className='text-xl font-bold'>{task.title}</h1>
                    <div className="flex justify-between text-sm text-gray-600">
                        <div className='flex gap-2'>
                            <div className='p-2 rounded-[8px] bg-red-400 flex items-center justify-center'>
                                <p className='text-white font-bold'>{task.dueDate.slice(0, 3)}</p>
                            </div>
                            <p className=''>{task.dueDates}</p>
                        </div>
                        <p className='text-[#2B1887]'>{task.clientName}</p>
                    </div>
                </div>
            ))}
        </>
    );
};

export default TaskComponent;

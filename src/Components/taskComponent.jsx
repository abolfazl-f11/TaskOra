

const TaskComponent = () => {
    const a = 'green';
    return (
        <div className='w-[95%] bg-white rounded p-4 h-[115px] flex flex-col justify-between'>
            <h1 className='text-xl font-bold'></h1>
            <div className="flex justify-between">
                <button style={{ backgroundColor: a }} className="p-2 rounded-[12px] text-white"></button>
                <p></p>
            </div>
        </div>
    )
}


export default TaskComponent;
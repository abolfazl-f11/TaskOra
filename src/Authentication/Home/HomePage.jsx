import AssignmentIcon from '@mui/icons-material/Assignment';
import TaskComponent from '../../Components/taskComponent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import * as React from 'react';

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
    gap: 2,
    borderRadius: 5
};

const HomePage = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="w-full h-screen bg-[#6358DC]">
            <h1 className="text-center text-[#fff] font-bold text-4xl h-[5%]">Taskora</h1>
            <div className="flex justify-center items-center gap-4 h-[95%] w-full">
                <div className="w-[45%] h-[95%] rounded bg-[#D5CCFF] p-4 flex flex-col gap-4">
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
                                <h1 className='text-xl font-bold text-[#6358DC]'>New Task</h1>
                                <div className='flex flex-col gap-2 pl-2'>
                                    <div>
                                        <label htmlFor="" className='font-bold self-start'>Title</label>
                                        <input type="text" placeholder='Enter your Title Task' className='w-[95%] outline-none bg-[#ECECEC] p-2 rounded' />
                                    </div>
                                    <div>
                                        <label htmlFor="">Priority</label>
                                        <select name="" id=""></select>
                                    </div>
                                </div>

                            </Box>
                        </Modal>

                    </div>
                    <div className='flex flex-col items-center gap-2 overflow-y-scroll h-[95%]'>
                        <TaskComponent />
                    </div>
                </div>
                <div className="w-[45%] h-[95%] rounded bg-[#D5CCFF] p-4"></div>
            </div>
        </div>
    )
}


export default HomePage;
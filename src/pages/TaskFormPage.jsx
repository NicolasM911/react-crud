import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { createTask, deleteTask, updateTask, getTask } from '../api/tasks.api';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

export function TasksFormPage() {
    const {
        register,
        handleSubmit,
        formState:
        { errors },
        setValue
    } = useForm();
    const navigate = useNavigate()
    const params = useParams()
    console.log(params)

    const onSubmit = handleSubmit(async data => {
        if (params.id) {
            await updateTask(params.id, data)
            console.log("actualizando");
            toast.success('Tarea actualizada')
        } else {
            console.log(data)
            const res = await createTask(data)
            //console.log(res)
            toast.success('Tarea creada')
        }
        navigate("/tasks")
    });

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                console.log("obteniendo datos")
                const res = await getTask(params.id)
                console.log(res)
                setValue('title', res.data.title)
                setValue('description', res.data.description)
            }
        }
        loadTask()
    })

    return (
        <div className='max-w-xl mx-auto'>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder='title'
                    {...register("title", { required: true })}
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                />
                {errors.title && <span>title is required</span>}
                <textarea
                    rows="3"
                    placeholder='Description'
                    {...register("description", { required: true })}
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                ></textarea>
                {errors.description && <span>text is required</span>}
                <button
                    className='bg-indigo-500 p-3 rounded-lg block w-full mt-3'>Save</button>
            </form>

            {params.id && (
                <div className='flex justify-end'>
                    <button
                        className='bg-red-500 p-3 rounded-lg w-48 mt-3'
                        onClick={async () => {
                            const accepted = window.confirm('Estas seguro de eliminar?')
                            if (accepted) {
                                await deleteTask(params.id);
                                toast.success('Tarea eliminada')
                            }
                            navigate("/tasks");
                        }}>
                        Delete
                    </button>
                </div>
            )}
        </div>
    )
}

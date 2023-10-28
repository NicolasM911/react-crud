import { Link } from 'react-router-dom'

export function Navigation() {
    return (
        <div className='flex justify-between py-3'>
            <Link to="/tasks">
                <h1 className='font-blod text-3xl mb-4'>Task App Nicolas</h1>
            </Link>
            <button className='bg-indigo-500 px-3 py-3 rounded-1g'>
                <Link to="/tasks-create">create task</Link>
            </button>
        </div>
    )
}
import { listUsers } from '../../../../lib/api/FlureeMethods';
import UsersTable from './UsersTable/UsersTable';

export default async function UsersList() {
  const users = await listUsers()

  return (
    <section className="m-3 place-items-center">
      <h2 className='text-2xl mb-2'>Users</h2>
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <UsersTable users={users}/>
      </div>
    </section>
  )
}
import { useGetUsersQuery } from '../users/userApiSlice'
import NewNoteForm from './NewNoteForm'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'

const NewNote = () => {
    useTitle('Front-newNote')
    const {users} = useGetUsersQuery('usersList', {
        selectFromResult: ({data}) => ({
            users: data?.ids.map(id => data?.entities[id])
        })
    })

    if(!users.length) return <PulseLoader className={'#FFF'}/>

    const content =  <NewNoteForm users={users} /> 

    return content
}
export default NewNote
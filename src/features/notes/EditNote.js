import { useParams } from 'react-router-dom'
import { useGetNotesQuery } from './notesApiSlice'
import { useGetUsersQuery } from '../users/userApiSlice'
import useAuth from '../../hooks/useAuth'
import EditNoteForm from './EditNoteForm'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'

const EditNote = () => {
    useTitle('Front-editNote')
    const { id } = useParams()

    const {isManager, isAdmin, username} = useAuth()

    const {note} = useGetNotesQuery('notesList', {
        selectFromResult:({data}) => ({
            note: data?.entities[id]
        })
    })

    const {users} = useGetUsersQuery('usersList', {
        selectFromResult:({data}) => ({
            users: data?.ids.map(id => data?.entities[id])
        })
    })

    if(!note || !users.length) return <PulseLoader className={'#FFF'}/>

    if(!isAdmin && !isManager){
        if(note.username !== username){
            return <p className='errmsg'>No Acces</p>
        }
    }

    const content =  <EditNoteForm note={note} users={users} />

    return content
}
export default EditNote
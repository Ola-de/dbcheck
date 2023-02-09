import { useParams } from 'react-router-dom'
import { useGetUsersQuery } from './userApiSlice'
import EditUserForm from './EditUserForm'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'

const EditUser = () => {
    useTitle('Front-editUser')
    const { id } = useParams()

    const {user} = useGetUsersQuery('usersList', {
        selectFromResult: ({data}) => ({
            user: data?.entities[id]
        })
    })

    if(!user) return <PulseLoader className={'#FFF'}/>

    const content = <EditUserForm user={user} /> 

    return content
}
export default EditUser
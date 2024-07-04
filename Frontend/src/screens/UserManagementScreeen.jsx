import { useEffect, useState } from 'react'
import { UsersTable } from '../components/admin/UsersTable.jsx';
import { useGetUserDataMutation } from '../Slices/adminApiSlice.js';
import { Toast } from 'react-bootstrap'

export const UserManagementScreen = () => {
  const [usersData, setUsersData] = useState([])
  const [refetch,setRefetch] = useState(false)

  const refetchData = ()=>{
    setRefetch(!refetch)
  }

  const [userDataFromApi] = useGetUserDataMutation();

  useEffect(() => {
    
    try {

      const fetchData = async () => {
        const responseFromApiCall = await userDataFromApi();
        const usersArray = responseFromApiCall.data;
        setUsersData(usersArray);
      };
  
      fetchData();
    } catch (error) {
      Toast.error(error);
      console.error("Error fetching users:", error);

    }

  }, [userDataFromApi, refetch]);

  return (
    <>
        <UsersTable users={usersData} 
          refetchData = {refetchData}
        />
    </>
  )
}
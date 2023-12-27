import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import AccountNavPage from './AccountNavPage';



const AccountPage = () => {
    const {loading, user, setUser} = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);
    let {subpage} = useParams();

    if(subpage === undefined) {
        subpage = 'profile';
    }

    

    if(loading) {
        return <div>
            Loading.....
        </div>
    }

    
    console.log(subpage);


    const logout = async () => {
        await axios.post('/api/auth/logout');
        setRedirect('/');
        setUser(null);
    }

    if(redirect) {
        return <Navigate to={redirect} />
    }

    if(!user && !loading) {
        return <Navigate to='/login' />
    }
  return (
    <div>
        <AccountNavPage />
        {
            subpage === 'profile' && (
            <div className='max-w-lg mx-auto text-center'>
                Logged in as <strong>{user.name}</strong>({user.email}) <br />
                <button onClick={logout} className='primary border border-white-20 max-w-sm mt-3 hover:bg-transparent hover:border-primary '>Logout</button>
            </div>
        )}
        {
            subpage === 'places' && (
                <div>
                    <PlacesPage />
                </div>
            )
        }
    </div>
  )
}

export default AccountPage
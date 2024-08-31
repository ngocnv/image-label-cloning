import React, {useEffect, useState} from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';

const GoogleDriveView= ({labelId})=>{
    const [user, setUser] = useState(null);
    const [profile,setProfile] = useState(null);
    const [paths,setPaths] = useState([]);
    const [subpaths,setSubpaths] = useState({});
    const [pathActive,setPathActive] = useState(null);

    const  pushGoogleDrive = async () => {
        try{
            let response = await axios.post(`http://localhost:8000/labels/${labelId}/push-google-drive?pathId=${pathActive}`,
                {
                    token: user.access_token
                })
        }catch (error){
            console.log(error)
        }
    }

    const uploadGoogleDrive=(event)=> {
        event.preventDefault();
        pushGoogleDrive().then(()=>{});
    }

    const fetchPathsInRoot= async () =>{
        if(user){
            try{
                let response = await  axios.post("http://localhost:8000/google-drive/root",
                    {
                        token: user.access_token
                    }
                )
                setPaths(response.data);
            }catch (error){
                console.log(error);
            }
        }
    }

    useEffect( ()=>{
        fetchPathsInRoot().then(()=>{});
    },[profile]);

    const login = useGoogleLogin({
        
        onSuccess: async (tokenResponse) => {
            try {
                setUser(tokenResponse);
                const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {Authorization: `Bearer ${tokenResponse.access_token}`},
                });

                // Send the token to your backend for verification or use it directly for API requests
                setProfile(userInfo.data)
                // Optionally send the token to your backend
                // await axios.post('http://localhost:8080/api/auth/google', { token: tokenResponse.access_token });
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        },
        onError: (error) => console.error('Login Failed:', error),
        scope: 'https://www.googleapis.com/auth/drive'
    });

    const fetchPathInFolder= async (id)=> {
        let response = await  axios.post(`http://localhost:8000/google-drive/${id}`,
            {
                token: user.access_token
            }
        )
        setSubpaths(prevState => (
            {... prevState,[id]:response.data}
        ))
        setPathActive(id);
    }

    const handleClickPath= (id) => {
        fetchPathInFolder(id).then(()=>{})
    }

    function hasRelation(parentId, childId) {
        if(parentId === childId)
            return true;
        if(subpaths[parentId]){
            for(let i of subpaths[parentId]){
                if(hasRelation(i.id,childId))
                    return true;
            }
        }
        return false;
    }

    const renderChildrenOfParent=(id) =>{
        if (!subpaths[id]) {
            return
        }

        if(!hasRelation(id,pathActive))
            return;
        if(subpaths[id].length === 0){
            return(
                <div className="list-group">
                    <text>...</text>
                </div>
            )
        }
        return <div className="list-group">
            {
                subpaths[id]?.map(p =>
                    p.mimeType === 'application/vnd.google-apps.folder' ?
                        <a  id={p.id} className={`list-group-item list-group-item-action1 ${pathActive === p.id ? 'active':''}`}
                           onClick={() => handleClickPath(p.id)}>
                            <i className="bi bi-folder-fill" style={{fontSize: '1srem', color: 'black'}}></i>
                            {p.name}
                            <i className={`${pathActive === p.id ? 'bi bi-arrow-down':'bi bi-chevron-right'}`}></i>
                            {renderChildrenOfParent(p.id)}
                        </a> :
                        <div id={p.id} className="list-group-item"><i className="bi bi-file-earmark"></i>{p.name}</div>
                )
            }
        </div>

    }

    return (profile) ? <div>
        <h6 className="fw-bold mt-5">User Logged in</h6>
        <hr/>
        <div><text className="fw-semibold">Name: </text>&nbsp;&nbsp;<text>{profile.name}</text></div>
        <div><text className="fw-semibold">Email Address: </text>&nbsp;&nbsp;<text> {profile.email}</text></div>
        <div className="row">
            <div className="col-12 mt-5">
                <h6 className="fw-bold mt-5">Select folder to upload</h6>
                <hr/>
                <div className="list-group">
                {
                    paths?.map( p =>
                         p.mimeType === 'application/vnd.google-apps.folder'?
                     <a id={p.id} className={`list-group-item list-group-item-action1 ${pathActive === p.id?'active':''}`} onClick={()=>handleClickPath(p.id)}>
                         <i className="bi bi-folder-fill" style={{ fontSize: '1srem', color: 'black' }}></i>
                            {p.name}
                         <i className={`${pathActive === p.id ? 'bi bi-arrow-down':'bi bi-chevron-right'}`}></i>
                         {renderChildrenOfParent(p.id)}
                     </a>:
                    <div id={p.id} className="list-group-item"><i className="bi bi-file-earmark"></i>{p.name}</div>
                    )
                }
                </div>
            </div>
        </div>
        <form onSubmit={uploadGoogleDrive}>
            <button  type="submit" className="btn btn-outline-primary mt-4 mb-5">Upload Google Drive</button>
        </form>
    </div> : <button className="btn btn-primary mb-3" onClick={() => login()}>Login with Google
    </button>;

}


export default GoogleDriveView;
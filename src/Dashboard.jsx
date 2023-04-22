import React, {useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getAuth, signOut } from "firebase/auth";
import PageNotFound from './PageNotFound';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
const data = useSelector((state) => state.newUser)
const [uid, setUid] = useState('')
const {err,setErr}=useState("")
    const auth = getAuth();
    const nav=useNavigate()
    const logOut=()=>{
        signOut(auth).then(() => {
           sessionStorage.clear()
            nav('/login')
        }).catch((error) => {
       setErr(error)
        });
    }
    const getUid = () => {
        setUid(sessionStorage.getItem("uid"))
    }
    useEffect(() => {
        getUid()
    }, [])
    return (
       <>
       {uid? <div className='container d-flex justify-content-center mt-5'>
            <div className="card border border-danger bg-info bg-opacity-10 shadow-lg" style={{ maxWidth: "540px" }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="avatar.png" className="img-fluid" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{data[0]?.name}</h5>
                            <div>
                                <h6>Mobile Number : {data[0]?.mobile}</h6>
                                <h6>School/University : {data[0]?.school}</h6>
                                <h6>Degree : {data[0]?.degree}</h6>
                                <h6>Branch : {data[0]?.branch}</h6>
                                <h6>Overall Result : {data[0]?.result}</h6>
                            </div>
                            <div> <button onClick={logOut} className='btn btn-primary'>Sign Out</button>
                            {err?<p>{err}</p>:null}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>:<PageNotFound />}
       </>

    )
}

export default Dashboard
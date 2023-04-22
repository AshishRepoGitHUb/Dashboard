import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setData } from './profileSlice';
import PageNotFound from './PageNotFound'
const Profile = () => {
    const nav = useNavigate()
    const [uid, setUid] = useState('')
    const dispatch = useDispatch()
    const [users, setUsers] = useState({
        name: "",
        mobile: "",
        school: "",
        degree: "",
        branch: "",
        result: ""
    })
    const [error, setError] = useState({
        nameErr: "",
        mobileErr: "",
        schoolErr: "",
        degreeErr: "",
        branchErr: "",
        resultErr: ""
    })
    const handleChange = (e) => {
        let fieldName = e.target.name;
        let val = e.target.value
        switch (fieldName) {
            case "name":
                if (val.length <= 3) {
                    setError({ ...error, nameErr: "Name should more than 3 Character" })
                }
                else {
                    setError({ ...error, nameErr: "" })
                }
                break;
            case "mobile":
                if (val.length !== 10) {
                    setError({ ...error, mobileErr: "Enter Valid Mobile Number" })
                }
                else {
                    setError({ ...error, mobileErr: "" })
                }
                break;
            case "school":
                if (val.length <= 5) {
                    setError({ ...error, schoolErr: "School or University Name should more than 5 Character" })
                }
                else {
                    setError({ ...error, schoolErr: "" })
                }
                break;
            case "degeree":
                if (val === "") {
                    setError({ ...error, degreeErr: "Select One Degeree" })
                }
                else {
                    setError({ ...error, degreeErr: "" })
                }
                break;
            case "branch":
                if (val.length < 3) {
                    setError({ ...error, branchErr: "Branch should more than 2 Character" })
                }
                else {
                    setError({ ...error, branchErr: "" })
                }
                break;
            case "result":
                if (val.length < 0) {
                    setError({ ...error, resultErr: "Please Enter result" })
                }
                else {
                    setError({ ...error, resultErr: "" })
                }
                break;
            default:
        }
        setUsers({ ...users, [e.target.name]: e.target.value })
    }
    const setNewData = (payload) => {
        dispatch(setData(payload))
    }
    const onSubmit = (e) => {
        setNewData(users)
        e.preventDefault()
        nav('/dashboard')
    }
    const getUid = () => {
        setUid(sessionStorage.getItem("uid"))
    }
    useEffect(() => {
        getUid()
    }, [])
    return (
        <>
            {uid ? <div className='container-fluid d-flex justify-content-center'>
                <div className='border bg-dark border-warning p-5 mt-1 text-light' style={{ width: '50%' }}>
                    <h3 className='text-center'>Enter Your Details</h3>
                    <form onSubmit={onSubmit}>
                        <label className="form-label ">Name</label>
                        <input type="text" name='name' value={users.name} className="form-control" onChange={handleChange} required />
                        {error.nameErr ? <p className='text-danger'>{error.nameErr}</p> : null}
                        <label className="form-label ">Mobile</label>
                        <input type="text" name='mobile' value={users.mobile} className="form-control" onChange={handleChange} required />
                        {error.mobileErr ? <p className='text-danger'>{error.mobileErr}</p> : null}
                        <label className="form-label ">School or University</label>
                        <input type='text' name='school' value={users.school} className='form-control' onChange={handleChange} required />
                        {error.schoolErr ? <p className='text-danger'>{error.schoolErr}</p> : null}
                        <label className="form-label" onChange={handleChange}>Degree</label>
                        <select className='form-select' name='degree' value={users.degree} onChange={handleChange} required>
                            <option> please select</option>
                            <option>Bachelors of science</option>
                            <option>Bachelors of Arts</option>
                            <option>Bachelors of Commerce</option>
                        </select>
                        {error.degreeErr ? <p className='text-danger'>{error.degreeErr}</p> : null}
                        <label className="form-label">Branch</label>
                        <input type='text' name='branch' value={users.branch} className='form-control' onChange={handleChange} required />
                        {error.branchErr ? <p className='text-danger'>{error.branchErr}</p> : null}
                        <label className="form-label">Overall Result (CGPA)</label>
                        <input type='number' name='result' value={users.result} className='form-control' onChange={handleChange} required />
                        {error.resultErr ? <p className='text-danger'>{error.resultErr}</p> : null}

                        <button type='submit' className='btn btn-warning form-control mt-3'>Submit</button>
                    </form>
                </div>
            </div> : <PageNotFound />}

        </>
    )
}

export default Profile
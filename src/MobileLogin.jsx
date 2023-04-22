import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useState } from 'react';
import auth from './firebase';
import { useNavigate } from "react-router-dom";
function MobileLogin() {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [newError, setError] = useState('')
    const [otp, setOtp] = useState('')
    const [status, setStatus] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [mobileError, setMobileError] = useState(false)
    const [otpErr, setOtpErr] = useState("")
    const nav = useNavigate()
    const onSignInSubmit = (e) => {
        e.preventDefault()
        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
        }, auth);

        if (phoneNumber.length !== 10) {
            setMobileError(true)
        }
        else {
            setMobileError(false)
            setIsLoading(true)
            const ph = "+91" + phoneNumber
            const appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(auth, ph, appVerifier)
                .then((confirmationResult) => {
                    window.confirmationResult = confirmationResult;
                    setStatus(true)
                    setIsLoading(false)
                }).catch((error) => {
                    setError(error.message)
                })
        }
    }

    const onOtpSubmit = (e) => {
        e.preventDefault()
        window.confirmationResult.confirm(otp).then((result) => {
            const user = result.user;
            if (user) {
                sessionStorage.setItem("uid", user.uid)
                nav('/profile')
            }
        }).catch((error) => {
            setError(error.message)
            setOtpErr("Please enter Valid Otp")
        });
    }
    return (
        <>
            <div className="row">
                <form onSubmit={onSignInSubmit}>
                    <div id="sign-in-button"></div>
                    <input type='number' name='mobileNumber' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder='Mobile Number' className="form-control" required />
                    {isLoading ? <div class="spinner-border spinner-border-sm" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div> : null}
                    {mobileError ? <div className="alert alert-danger" role="alert">
                        Please Enter Valid Mobile Number
                    </div> : null}
                    <div >{!status ? <button className="btn btn-primary mt-3" type='submit'>Send OTP</button> : null}
                    </div>
                </form>
                {status ? <form onSubmit={onOtpSubmit}>
                    <h5 className="mt-3">Enter OTP</h5>
                    <input type="number" name="otp" placeholder="OTP Number" className="form-control" required onChange={(e) => setOtp(e.target.value)} />
                    <button className="btn btn-success mt-4" type="submit">Submit</button>
                    {otpErr ? <p className="text-danger">{otpErr}</p> : null}
                </form> : null}
            </div>
            {newError && !otpErr ?
                <div className="text-danger">Something Went Wrong, Try Again</div> : null}
        </>

    )
}
export default MobileLogin
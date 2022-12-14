import './Form.scss';
import {useState, useEffect, useRef} from "react";
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,20}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,20}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const Form = () => {

    const userRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [success, setSuccess] = useState(false);

    const [alreadyRegistered, setAlreadyRegistered] = useState(false);
    const toggleRegistered = () => setAlreadyRegistered(value => !value);


    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = PASSWORD_REGEX.test(password);
        console.log(result);
        console.log(password);
        setValidPassword(result);
        const match = password === matchPassword;
        setValidMatch(match);
    }, [password, matchPassword])


    const handleSubmit = (e) => {
        e.preventDefault();

        const validUser = USER_REGEX.test(user);
        const validPassword = PASSWORD_REGEX.test(password);
        const validEmail = EMAIL_REGEX.test(email);
        if (!validUser || !validPassword || !validEmail) {
            console.log('Error')
            return;
        }
        console.log(user, password, email);
        setSuccess(true);
    }

    const loginSubmit = () => {
        if (!validPassword || !validEmail) {
            console.log('Error')
            return;
        }
        setSuccess(true);
    }


    return (
        <>
            {success ?
                (<section className='success'>
                    <h1>Congratulations!</h1>
                    <p>
                       You successfully signed in.
                    </p>
                </section>) : (
                    alreadyRegistered
                        ?
                        (<section>
                            <h1>Sign in</h1>
                            <form>
                                <label htmlFor='userEmail'>
                                    Email:
                                    <span className={validEmail ? 'valid' : 'hide'}>
                                        <FontAwesomeIcon icon={faCheck}/>
                                    </span>
                                    <span className={validEmail || !email ? 'hide' : 'invalid'}>
                                        <FontAwesomeIcon icon={faTimes}/>
                                    </span>
                                </label>
                                <div className='inputBlock'>
                                    <input
                                        type='text'
                                        id='userEmail'
                                        ref={userRef}
                                        autoComplete='off'
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        aria-invalid={validEmail ? 'false' : 'true'}
                                        aria-describedby='emailNote'
                                        onFocus={() => setEmailFocus(true)}
                                        onBlur={() => setEmailFocus(false)}
                                    />
                                    <p id='emailNote'
                                       className={emailFocus && !validEmail ? 'instructions' : 'offscreen'}>
                                        <FontAwesomeIcon icon={faInfoCircle}/>
                                        Example: test@gmail.com <br/>
                                        May contain uppercase letters, numbers and underscores.
                                    </p>
                                </div>

                                <label htmlFor='userPassword'>
                                    Password:
                                    <span className={validPassword ? 'valid' : 'hide'}>
                                        <FontAwesomeIcon icon={faCheck}/>
                                    </span>
                                    <span className={validPassword || !password ? 'hide' : 'invalid'}>
                                        <FontAwesomeIcon icon={faTimes}/>
                                    </span>
                                </label>
                                <div className='inputBlock'>
                                    <input
                                        type='password'
                                        id='userPassword'
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        autoComplete="new-password"
                                        aria-invalid={validPassword ? 'false' : 'true'}
                                        aria-describedby='passwordNote'
                                        onFocus={() => setPasswordFocus(true)}
                                        onBlur={() => setPasswordFocus(false)}
                                    />
                                    <p id='passwordNote'
                                       className={passwordFocus && !validPassword ? 'instructions' : 'offscreen'}>
                                        <FontAwesomeIcon icon={faInfoCircle}/>
                                        8 to 20 characters. <br/>
                                        Must include uppercase and lowercase letters, a number and special character. <br/>
                                        Allowed special characters: <span aria-label='exclamation mark'>!</span>
                                        <span aria-label='at symbol'>@</span> <span aria-label='hashtag'>#</span>
                                        <span aria-label='dollar sign'>$</span> <span aria-label='percent'>%</span>
                                    </p>
                                </div>
                                <button className={`mainBtn ${!validEmail || !validPassword ? 'disableBtn' : ''}`} onClick={loginSubmit}>Sign in
                                </button>
                                <p className='isRegistered'>
                                     Are you not registered?
                                    <button onClick={toggleRegistered}>Sign up</button>
                                </p>
                            </form>
                        </section>)
                        :
                        (<section className="formWrapper">
                            <h1>Register</h1>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor='username'>
                                    User name:
                                    <span className={validName ? 'valid' : 'hide'}>
                                        <FontAwesomeIcon icon={faCheck}/>
                                    </span>
                                    <span className={validName || !user ? 'hide' : 'invalid'}>
                                        <FontAwesomeIcon icon={faTimes}/>
                                    </span>
                                </label>
                                <div className='inputBlock'>
                                    <input
                                        type='text'
                                        id='username'
                                        ref={userRef}
                                        autoComplete='off'
                                        onChange={(e) => setUser(e.target.value)}
                                        required
                                        aria-invalid={validName ? 'false' : 'true'}
                                        aria-describedby='userNote'                        //?????????????????? ???????? ???? ?????????????????? (????????????, ?????? ???????? ???????????? 8 ????????????????)
                                        onFocus={() => setUserFocus(true)}
                                        onBlur={() => setUserFocus(false)}
                                    />
                                    <p id='userNote'
                                       className={userFocus && !validName ? 'instructions' : 'offscreen'}>
                                        <FontAwesomeIcon icon={faInfoCircle}/>
                                        3 to 20 characters. <br/>
                                        Must begin with a letter. <br/>
                                        Letters, numbers, underscores allowed.
                                    </p>
                                </div>


                                <label htmlFor='userEmail'>
                                    Email:
                                    <span className={validEmail ? 'valid' : 'hide'}>
                                    <FontAwesomeIcon icon={faCheck}/>
                                </span>
                                    <span className={validEmail || !email ? 'hide' : 'invalid'}>
                                    <FontAwesomeIcon icon={faTimes}/>
                                </span>
                                </label>
                                <div className='inputBlock'>
                                    <input
                                        type='text'
                                        id='userEmail'
                                        ref={userRef}
                                        autoComplete='off'
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        aria-invalid={validEmail ? 'false' : 'true'}
                                        aria-describedby='emailNote'
                                        onFocus={() => setEmailFocus(true)}
                                        onBlur={() => setEmailFocus(false)}
                                    />
                                    <p id='emailNote'
                                       className={emailFocus && !validEmail ? 'instructions' : 'offscreen'}>
                                        <FontAwesomeIcon icon={faInfoCircle}/>
                                        Example: test@gmail.com <br/>
                                        May contain uppercase letters, numbers and underscores.
                                    </p>
                                </div>


                                <label htmlFor='userPassword'>
                                    Password:
                                    <span className={validPassword ? 'valid' : 'hide'}>
                                        <FontAwesomeIcon icon={faCheck}/>
                                    </span>
                                    <span className={validPassword || !password ? 'hide' : 'invalid'}>
                                        <FontAwesomeIcon icon={faTimes}/>
                                    </span>
                                </label>
                                <div className='inputBlock'>
                                    <input
                                        type='password'
                                        id='userPassword'
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        autoComplete="new-password"
                                        aria-invalid={validPassword ? 'false' : 'true'}
                                        aria-describedby='passwordNote'
                                        onFocus={() => setPasswordFocus(true)}
                                        onBlur={() => setPasswordFocus(false)}
                                    />
                                    <p id='passwordNote'
                                       className={passwordFocus && !validPassword ? 'instructions' : 'offscreen'}>
                                        <FontAwesomeIcon icon={faInfoCircle}/>
                                        8 to 20 characters. <br/>
                                        Must include uppercase and lowercase letters, a number and special character. <br/>
                                        Allowed special characters: <span aria-label='exclamation mark'>!</span>
                                        <span aria-label='at symbol'>@</span> <span aria-label='hashtag'>#</span>
                                        <span aria-label='dollar sign'>$</span> <span aria-label='percent'>%</span>
                                    </p>
                                </div>

                                <label htmlFor='confirm_password'>
                                    Confirm password:
                                    <span className={validMatch && matchPassword ? 'valid' : 'hide'}>
                                        <FontAwesomeIcon icon={faCheck}/>
                                    </span>
                                    <span className={validMatch || !matchPassword ? 'hide' : 'invalid'}>
                                        <FontAwesomeIcon icon={faTimes}/>
                                    </span>
                                </label>
                                <div className='inputBlock'>
                                    <input
                                        type='password'
                                        id='confirm_password'
                                        onChange={(e) => setMatchPassword(e.target.value)}
                                        required
                                        autoComplete="new-password"
                                        aria-invalid={validMatch ? 'false' : 'true'}
                                        aria-describedby='confirmNote'
                                        onFocus={() => setMatchFocus(true)}
                                        onBlur={() => setMatchFocus(false)}
                                    />
                                    <p id='confirmNote'
                                       className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
                                        <FontAwesomeIcon icon={faInfoCircle}/>
                                        The password and password confirmation fields must match.
                                    </p>
                                </div>

                                <button className={`mainBtn ${!validName || !validEmail || !validPassword || !validMatch ? 'disableBtn' : ''}`}>Sign up
                                </button>
                            </form>

                            <p className='isRegistered'>
                                Already registered?
                                <button onClick={toggleRegistered}>Sign in</button>
                            </p>
                        </section>)

                )
            }
        </>)
}

export default Form;

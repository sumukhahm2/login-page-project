import React, { useState,useEffect,useReducer,useContext} from 'react';
import AuthContext from '../../store/auth-context';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../Input/Input';
const emailReducer=(state,action)=>{
  if(action.type==='USER-INPUT')
  {
    return {value:action.val,isValid:action.val.includes('@')}
  }
   if(action.type==='INPUT-BLUR')
  {
    return {value:state.value,isValid:state.value.includes('@')}
  }

  return {value:'',isValid:false}
}
const passwordReducer=(state,action)=>{
  if(action.type==='INPUT-PASSWORD')
  {
    return {value:action.val,isValid:action.val>6}
  }
   if(action.type==='PASSWORD-BLUR')
  {
    return {value:state.value,isValid:state.value>6}
  }
  return {value:'',isValid:false}
}
const Login = (props) => {
  const [enteredCollege, setCollege] = useState('');
  const [collegeIsValid, setCollegeIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState,dispatchEmail]=useReducer(emailReducer,{value:'',isValid:false});
   const [passwordState,dispatchPassword]=useReducer(passwordReducer,{value:'',isValid:false});
   const {isValid:emailIsValid}=emailState;
   const {isValid:passwordIsValid}=passwordState;
  useEffect(()=>{
    const identifier=setTimeout(()=>{
     setFormIsValid(
      emailState.isValid && passwordState.isValid && enteredCollege.trim().length > 1
       );
    },500)

    return ()=>{
      clearTimeout(identifier)
    }
    
   
  },[emailState.value,passwordState.value,enteredCollege])
  const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER-INPUT',val:event.target.value})
    
  };
  const ctx=useContext(AuthContext);

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'INPUT-PASSWORD',val:event.target.value})
   
  };

  const validateEmailHandler = () => {
   dispatchEmail({type:'INPUT-BLUR'})
  };
  const validateCollegeHandler=()=>{
    setCollegeIsValid(enteredCollege.trim().length>1)
  }

 const validatePasswordHandler=()=>{
  dispatchPassword({type:'PASSWORD-BLUR'})
 }
 const collegeChangeHandler=(event)=>{
  setCollege(event.target.value)
 }

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input id='email' 
        label='E-Mail' 
        type='email' 
        value={emailState.value} 
        onChange={emailChangeHandler}
         isValid={emailIsValid} 
         onBlur={validateEmailHandler}>

         </Input>
        <Input id='password' 
        label='password' 
        type='epasswordail' 
        value={passwordState.value} 
        onChange={passwordChangeHandler}
         isValid={passwordIsValid} 
         onBlur={validatePasswordHandler}>
          
         </Input>
        <div
          className={`${classes.control} ${
            collegeIsValid === false ? classes.invalid : ''
          }`}
        ></div>
        <label htmlFor="college">CollegeName</label>
          <input
            type="text"
            id="college"
            value={enteredCollege}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

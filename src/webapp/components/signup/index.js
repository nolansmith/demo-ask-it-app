import React, { useState } from 'react'
import { connect } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';
import { FaPhone as Phone, FaAsterisk as Password, FaUser as User, FaCheckCircle as Check, } from 'react-icons/fa';
import * as URLS from '../../util/urls';
import Loading from '../loading';
import Message from '../message';
import * as actions from '../../store/graphql/actions';
import { FIND_USER } from '../../store/graphql/queries';
import {CREATE_NEW_USER} from '../../store/graphql/mutations';
const uuid = require('uuid/v4');
import { useQuery, useMutation } from '@apollo/react-hooks';
import Error from '../error';

const SignUp = props => {



    //loading and errors
    const NOT_LOADING = { status: false, message: "" };
    const NO_ERROR = { status: false, message: "" };
    const [isLoading, setLoad] = useState(NOT_LOADING);
    const [isError, setError] = useState(NO_ERROR);
    //form variables
    const [username, handleUsername] = useState("");
    const [password, handlePassword] = useState("");

    //user creation variables
    const [userCreated, updateUserCreated] = useState(false);

    //GraphQL query
    const queryUserObject = useQuery(FIND_USER, { variables: { username: username } });
    

    //GraphQL user creating mutation
    const [createNewUser, newUserObject] = useMutation(CREATE_NEW_USER);
    

    if (isLoading.status) return <Loading message={isLoading.message} image="searching" maxHeight="200px" />;
    if (isError.status) return <Error message={isError.message} image="found" maxHeight='200px' />;
    if (userCreated) return <Message text="Congrats" image="success">{userCreatedSuccess(userCreated.username)}</Message>
    if (queryUserObject.error) return <Error message="Server Error" />;
    if (newUserObject.error) return <Error message="Server Error" />;


    function handleSubmit(e) {
        e.preventDefault();

        checkIfUserExists(username);
        handleUsername("");
        handlePassword("");
        e.target.reset();

    }

    function userCreatedSuccess(username){
        return (
            <div style={{ width: '50%', margin: '0 auto' }}>
                <h3 style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>User Created!</h3>
                <h4 style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>View profile <Link to={`/user/${username}`}>here</Link></h4>
            </div>
        );
    }

    const checkIfUserExists = (username) => {

        setLoad({ status: true, message: "Checking for user..." });
        //the GraphQL query for user object we get back
        let { data } = queryUserObject;

        setTimeout(() => {
            if (data.findUserByUsername) {
                setError({ status: true, message: 'User already exists....' });
                setLoad(NOT_LOADING);
                setTimeout(() => setError(NO_ERROR), 2000);
                return;
            } else {
                setLoad(NOT_LOADING);
                //console.log('User can be created!');
                createNewUser({
                    variables: {
                        user: {
                            id: uuid(),
                            username: username.toLowerCase(),
                            password,
                        }
                    }
                }).then(({data}) => {
                    updateUserCreated(data.createNewUser);
                })

            }
        }, 2000);
    }

    const readyToSubmit = () => {
        return username.length >= 5 && password.length >= 10;

    }

    return (

        <div
            style={{ margin: "20px auto", width: "100%" }}
            id="user_signup_area"
        >
            <div
                className="row"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    margin: "0 auto",

                }}
            >


                <div className="col-md-4 col-md-pull-2 col-sm-12">
                    <h2 style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
                        Sign Up!
          </h2>
                    <h3 style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
                        (We don't need a lot of info)
          </h3>


                </div>
                <div className="col-md-4 col-md-push-2  col-sm-12">
                    <img
                        style={{ width: "100%", maxHeight: "250px" }}
                        src={`${URLS.images}/signup.svg`}
                    />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-col align-items-center">
                        <div className="col-auto">
                            <label className="sr-only" htmlFor="_signup_username">
                                Username
              </label>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><User /></div>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="_signup_username"
                                    placeholder="Username"
                                    onChange={(e) => handleUsername(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-auto">
                            <label className="sr-only" htmlFor="_signup_password">
                                Phone
              </label>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><Password /></div>
                                </div>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="_signup_password"
                                    placeholder="Password (min 10 chars)"
                                    onChange={(e) => handlePassword(e.target.value)}
                                />

                            </div>

                        </div>
                        <div className="col-auto">
                            <button
                                style={{ margin: "10px auto", width: "100%" }}
                                type="submit" className={readyToSubmit() ? "aw-btn" : "aw-btn-disabled"}
                                disabled={readyToSubmit() ? false : true}
                            >
                                Signup
              </button>

                        </div>
                    </div>
                </form>
            </div>

        </div>


    )
}

SignUp.propTypes = {

}

const mapStateToProps = state => {
    return {
        ...state
    };
};
const mapDispatchToProps = dispatch => {
    return {
        addNewUser: (user) => dispatch(actions.addNewUser(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

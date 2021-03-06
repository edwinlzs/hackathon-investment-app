import React, {useState} from 'react'
import {Modal, Button, Tabs} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'

const Loginmodal = (props) => {
    const router = useRouter()

    const [show, setShow] = useState(false);
    const [login, setStatus] = useState(false);
    const [namefield, setName] = useState("");
    const [emailfield, setEmail] = useState(""); 
    const [user, setUser] = useState(true);
    const [fieldcheck, setCheck] = useState(true);
    const [emailcheck, setEmailcheck] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const postSignup = async () => {
        if (emailfield == "" || namefield ==""){
            setCheck(false);
            return; 
        } else {
            setCheck(true);
        }
        await axios({
            method: 'post',
            url: 'http://flask-env.eba-za7sxm6n.ap-southeast-1.elasticbeanstalk.com/user', 
            headers: {},
            data: { 
                email: emailfield,
                name: namefield,
            }
        }).then(res => {}).then(() => {
            showToast("Registered!");
            Cookies.set('userEmail', emailfield);
            router.push("/profile");
        });
    }

    const getLogin = async () => {
        if (emailfield == "" || namefield == ""){
            setCheck(false);
            return;
        } else{
            setCheck(true);
        }
        const response = await axios.get('http://flask-env.eba-za7sxm6n.ap-southeast-1.elasticbeanstalk.com/user/' + emailfield);
        console.log(response);
        const data = response.data;
        if (data.result == "No such email"){
            setEmailcheck(false);
            return
        } else {
            setEmailcheck(true);
            setShow(false);
            Cookies.set('userEmail', emailfield);
            showToast("Logged In!");
        } 
            
    };

    const showToast = (message) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                {props.button}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    Get Started
                </Modal.Header>
                    <Modal.Body>   
                        <div>
                            <div>
                                <form>
                                    <div class='form-group'>
                                        <div class='email'><input placeholder='Email Address' name='email' type='email' id='email' class='s2 form-control' onChange={e =>setEmail(e.target.value)} required></input></div>
                                    </div>
                                    <div class='form-group'>
                                        <div class='name'><input placeholder='Name' name='name' type='text' id='text' class='s2 form-control' onChange={e =>setName(e.target.value)} required></input></div>
                                    </div>
                                    <div class='text-center mb-3'>
                                        <Button class='btn btn-primary btn-block'  onClick={postSignup}>Sign Up</Button>
                                    </div>
                                    <div class='text-center mb-3'>
                                    <Button class='btn btn-primary btn-block' onClick={getLogin} >Log In</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="alert alert-danger" role="alert" hidden={fieldcheck}>
                            Please fill up both Email and Name fields
                        </div>

                        <div class="alert alert-warning" role="alert" hidden={emailcheck}>
                            User does not exist
                        </div>
                    </Modal.Body>
                
            </Modal>
            <ToastContainer />
        </div>
    )
}
export default Loginmodal;
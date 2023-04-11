import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { MainContext } from './mainContext';
import { SocketContext } from './socketContext';
import { UsersContext } from './usersContext';
import "react-toastify/dist/ReactToastify.css";

function Login() {
    const socket = useContext(SocketContext);
    const { username, set_username, room, set_room } = useContext(MainContext);
    const { set_users } = useContext(UsersContext);
    const navigate = useNavigate();


    const joinRoom = () => {
        socket.emit("login", { username, room }, error => {
            if(error){
                return (toast.error(error));
            }
            navigate('/chat');
            return (toast.success(`Hey there, welcome to room ${room}`));
        });
    }

    return (
        <div className="login">
            <h2> Login </h2>
             <input placeholder="Enter Username" value={username} onChange={(e) => {
                set_username(e.target.value);
             }} />
             <input placeholder="Enter Group Name" value={room} onChange={(e) => {
                set_room(e.target.value);
             }}/>
             <button onClick={joinRoom}> Submit </button>

             <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
        </div>
    );
}
export default Login;
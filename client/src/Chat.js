import { useState, useEffect, useContext } from "react";
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { SocketContext } from "./socketContext";
import { MainContext } from "./mainContext";
import { UsersContext } from "./usersContext";
import "react-toastify/dist/ReactToastify.css";

function Chat() {
    const [currentMess, set_currentMess] = useState("");
    const [messageList, set_messageList] = useState([]);
    const socket = useContext(SocketContext);
    const { username, set_username, room, set_room } = useContext(MainContext);
    const { users, set_users } = useContext(UsersContext);

    const navigate = useNavigate();

    useEffect(() => {
        if(!username) {
            return navigate('/');
        }
    }, [username]);

    useEffect(() => {
        socket.on("message", msg => {
            set_messageList(messages => [...messages, msg]);
        });
        socket.on("notification", des => {
            toast.success(des.description);
        });
        socket.on("users", users => {
            set_users(users);
        });
    }, [socket]);

    const sendMessage = () => {
        socket.emit('send_message', currentMess, () => set_currentMess(''));
        set_currentMess('');
    }

    const leaveRoom = () => {
        set_username(""); 
        set_room("");
        navigate("/");
    }

    return (
        <div className="chat">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
            <div className="chat-head">
            <button onClick={() => {
                leaveRoom();
            }} className="leave"> Leave Chat Room</button>
            <h1> Room Code: {room} </h1>
        </div>
        <div className="chat-body">
            <div className="userlist">
                <h2> Users </h2>
                {users.map((user) => {
                    return (
                        <div className="user">
                            <p> {user.username} </p>
                        </div>
                    );
                })}
            </div>
            <div className="messages">
                <h2> Messages </h2>
                <div className="allmessages">
                {messageList.map((msg) => {
                    return (
                    <div className="load_message" id={username === msg.username ? "you" : "other"}>
                            <div className="my_message">
                                <div dangerouslySetInnerHTML={{
                                    __html: msg.text
                                }} className="msg"></div>
                                <div className="msgMeta">
                                    {username === msg.username ? <h6> You </h6> : <h6> {msg.username} </h6>}
                                </div>
                            </div>
                    </div> 
                    ); 
                })}
                </div>
                <div className="chat-foot">
            <Editor 
                apiKey="3umb7nhla3oooev8df3w8l1vd6orql4fjm3yhr10vjsm2fbo"
                value={currentMess}
                onEditorChange={(newValue) => {
                    set_currentMess(newValue);
                }}
                init={{
                    width: '100%',
                    skin: 'oxide-dark',
                    content_css: 'dark',
                    menubar: false,
                    statusbar: false,
                    autoresize_bottom_margin: 0,
                    plugins: 'link lists emoticons autoresize mentions image code',
                    mentions_fetch: (query, success) => {
                        console.log(users.map((val) => {
                            return val.username;
                        }));
                        var myusers = users.map((val) => {
                            return val.username;
                        }).filter(function(user) {
                            return user.indexOf(query.term.toLowerCase()) !== -1;
                        });
                        success(myusers);
                    },
                    toolbar:
                    'bold italic strikethrough | link | numlist bullist | blockquote | emoticons | image | code | sendBtn',
                  codesample_languages: [
                    { text: 'HTML/XML', value: 'markup' },
                    { text: 'JavaScript', value: 'javascript' },
                    { text: 'CSS', value: 'css' },
                    { text: 'PHP', value: 'php' },
                    { text: 'Ruby', value: 'ruby' },
                    { text: 'Python', value: 'python' },
                    { text: 'Java', value: 'java' },
                    { text: 'C', value: 'c' },
                    { text: 'C#', value: 'csharp' },
                    { text: 'C++', value: 'cpp' },
                  ],
                  content_style:
                    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
            />
            <button onClick={() => {
                sendMessage();
            }} className="send" disabled={currentMess === "" ? true : false}>&#9658;</button>
        </div>
        </div>
            </div>
        </div>
    );
}

export default Chat;
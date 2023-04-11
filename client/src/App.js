import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './Main';
import Login from './Login';
import Chat from './Chat';
import { MainProvider } from './mainContext';
import { UsersProvider } from './usersContext';
import { SocketProvider } from './socketContext';

function App() {
    return (
        <MainProvider>
            <UsersProvider>
                <SocketProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route exact path="/" element={<Main />} />
                            <Route exact path="/login" element={<Login />} />
                            <Route exact path="/chat" element={<Chat />} />
                        </Routes>
                    </BrowserRouter>
                </SocketProvider>
            </UsersProvider>
        </MainProvider>
    );
}

export default App;

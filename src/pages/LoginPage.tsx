import React, { useState } from 'react';
import { IonContent, IonInput, IonButton, IonPage, IonToast } from '@ionic/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './LoginPage.scss'; // Import stylesheet
import logo from '../assets/images/Flag_of_Japan.png';


const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');
    const history = useHistory();

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://api.haudy.my.id/api/login', {
                email,
                password,
            });

            if (response.data && response.data.token) {
                localStorage.setItem('jwtToken', response.data.token);
                setToastMessage('Login berhasil');
                setShowToast(true);
                setTimeout(() => {
                    history.push('/home');
                }, 1000);
            }
        } catch (error: any) {
            console.error('Login gagal', error.response?.data || error.message);
            setToastMessage('Login gagal, periksa email dan password Anda');
            setShowToast(true);
        }
    };

    return (
        <IonPage>
            <IonContent className="login-content"> {/* Apply custom class */}
                <div className="login-container">
                    <img src={logo} alt="Logo" className="app-logo" /> {/* Add your logo */}
                    <input
                        className="login-input"
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        className="login-input"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />


                    <button className="login-button" onClick={handleLogin} style={{ width: '100%' }}>
                        Login
                    </button>

                    <IonToast
                        isOpen={showToast}
                        onDidDismiss={() => setShowToast(false)}
                        message={toastMessage}
                        duration={2000}
                    ></IonToast>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default LoginPage;

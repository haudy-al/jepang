import React, { useState, useEffect } from 'react';
import { isPlatform, IonContent, IonInput, IonButton, IonPage, IonToast } from '@ionic/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './LoginPage.scss'; // Import stylesheet
import logo from '../assets/images/Flag_of_Japan.png';
import lockicon from '../assets/images/lock.png';
import { Capacitor } from '@capacitor/core';
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import googleLogo from '../assets/images/google-logo.png';
import vc1 from '../assets/images/vc-1.png';


const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');
    const history = useHistory();


    const GoogleLogin = async () => {
        try {
            const googleUser = await GoogleAuth.signIn();
           
            HandleGoogleLogin(googleUser);

           
        } catch (error) {
            const errorMessage = (error as Error).message;
            setToastMessage(`E1 ${errorMessage}`);
            setShowToast(true);
            console.error('Error during Google Auth:', error);
        }
    };

    const HandleGoogleLogin = async (googleUser: any) => {

        try {
            const response = await axios.post('https://api.haudy.my.id/api/auth/google', {
                email: googleUser.email,
                name: googleUser.name,
                image: googleUser.imageUrl,
            }, {
                headers: {
                    'x-api-key': 'dewa'
                }
            });

            console.log(googleUser);
            

            if (response.data && response.data.token) {
                localStorage.setItem('jwtToken', response.data.token);
                localStorage.setItem('userData', JSON.stringify(response.data.user));
                // console.log(JSON.parse(`${localStorage.getItem('userData')}`));

                console.log(response.data);
                
                setToastMessage('Login berhasil');
                setShowToast(true);
                setTimeout(() => {
                    window.location.href = '/home';
                }, 1000);
            }
        } catch (error: any) {
            console.error('Login gagal', error.response?.data || error.message);
            setToastMessage('Login gagal');
            setShowToast(true);
        }
    };


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

    useEffect(() => {
        GoogleAuth.initialize();
    }, []);

    return (
        <IonPage>
            <IonContent className="login-content"> {/* Apply custom class */}
                <div className='image-container'>
                    <img src={vc1} alt="" className="standing-image" />
                </div>
                <div className="login-container">
                    <img src={lockicon} alt="gambar" className="app-logo" /> {/* Add your logo */}
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

                    <button onClick={GoogleLogin} style={{ backgroundColor: 'white', color: 'black' }}>
                        <img src={googleLogo} alt="Google logo" style={{ marginRight: 8, height: 20, verticalAlign: 'middle' }} />
                        Login with Google
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

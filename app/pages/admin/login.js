import Image from 'next/image';
import Head from 'next/head';
import LoginComponent from '../../components/admin/login'; 
import Header from '../../components/header/header';
import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import AuthContext from '../../contexts/authContext';


export default function Login() {
    const router = useRouter();

    const Context = useContext(AuthContext);

    useEffect(() => {
        if (Context.user !== undefined && Context.user !== null) {
            router.push('/admin');
        }
    }, [Context.user]);

    return(
        <div className="Login">
            <Head>
                <title>NTIC Rabat - Connection Admin</title>
            </Head>

            <div className="Background">
                <div className="BackgroundImage">
                    <Image
                        src={"/image/background.png"}
                        alt="Background image"
                        layout='fill'
                        objectFit='cover'
                    />
                </div>
            </div>

            <div className="LoginContainer">
                <div className="wrapper">
                    <LoginComponent />
                </div>
            </div>

            <Header type='login'/>
        </div>
    )
} 
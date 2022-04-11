import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import Show from './Drill/Show';

export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <div className="fixed top-0 right-0 px-6 py-4 sm:block">
                    {props.auth.user ? (
                        <Link href={route('dashboard')} className="text-sm text-gray-700 underline">
                            会員ページ
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')} className="text-sm text-gray-700 underline">
                                ログイン
                            </Link>

                            <Link href={route('register')} className="ml-4 text-sm text-gray-700 underline">
                                会員登録
                            </Link>
                        </>
                    )}
                </div>

                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-center items-center pt-8 sm:justify-start sm:pt-0">
                        <img src="../img/app_logo.png" className="w-20	h-20"></img>
                        <h1 className="text-2xl">タイピングゲーム</h1>
                    </div>
                </div>
            </div>
        </>
    );
}

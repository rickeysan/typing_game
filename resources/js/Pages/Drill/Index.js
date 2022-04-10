import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import Button from '@/Components/Button';

const Index = (props) => {
    const { delete: destroy } = useForm();
    const handleDelete = (id) => {
        destroy(route('drill.destroy', id), {
            preserveScroll: true,
        })
    }

    console.log('DrillページのIndexコンポーネントです')
    console.log(props.drills)

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">練習問題一覧</h2>}
        >
            <Head title="練習問題一覧" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {props.drills.length === 0 &&
                                <p>登録された問題はありません</p>
                            }
                            <table className="w-9/12 mr-auto ml-auto">
                                <thead>
                                    <tr>
                                        <th className="w-6/12">タイトル</th>
                                        <th className="w-2/12">練習する</th>
                                        <th className="w-2/12">更新</th>
                                        <th className="w-2/12">削除</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.drills.map((drill) => {
                                        console.log('map関数です')
                                        return (
                                            <tr key={drill.id}>
                                                <td className="border px-4 py-2">
                                                    {drill.title}
                                                </td>
                                                <td className="border px-4 py-2 text-center">
                                                    <Link href={route('drill.show', drill.id)}>
                                                        <button className="bg-sky-500 px-4 py-2 bg-green-500 text-white rounded-lg text-xs font-semibold">
                                                            練習する
                                                        </button>
                                                    </Link>
                                                </td>
                                                <td className="border px-4 py-2 text-center">
                                                    <Link href={route('drill.edit', drill.id)}>
                                                        <button className="bg-emerald-500 px-4 py-2 bg-green-500 text-white rounded-lg text-xs font-semibold">
                                                            更新
                                                        </button>
                                                    </Link>
                                                </td>
                                                <td className="border px-4 py-2 text-center">
                                                    <button className="bg-rose-500 px-4 py-2 bg-red-500 text-white rounded-lg text-xs font-semibold"
                                                        onClick={() => handleDelete(drill.id)}
                                                    >
                                                        削除
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <div className="text-center mt-8">
                                <Link href={route('drill.create')}>
                                    <Button type="submit">新規作成</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

export default Index;

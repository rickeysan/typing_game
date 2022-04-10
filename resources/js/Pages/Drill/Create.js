import React, { useEffect, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import Button from '@/Components/Button';
import ValidationErrors from '@/Components/ValidationErrors';
import Label from '@/Components/Label';
import Input from '@/Components/Input';

const Create = (props) => {
    console.log('DrillページのCreateコンポーネントです')
    const [formNum, setFormNum] = useState(3)

    const { data, setData, post, processing, errors } = useForm({
        'title': '',
        'problem1': '',
        'problem2': '',
        'problem3': '',
    })

    useEffect(() => {
        console.log('formNum用のuseEffectです')
        const label = 'problem' + formNum
        data[label] = ''
        setData(data)
        console.log(data)
    }, [formNum])



    console.log('errorsの中身です')
    console.log(errors)


    const onHandleChagne = (e) => {
        setData(e.target.name, e.target.value)
    }

    const submit = (e) => {
        e.preventDefault()

        post(route('drill.store'))
    }

    const addForm = () => {
        console.log('addFormです')
        console.log(data)
        setFormNum((count) => count + 1)
    }

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
                            <h2 className="py-2.2 text-xl">新規作成ページ</h2>
                            <p className="py-1">問題は10個まで追加することができます</p>
                            <ValidationErrors errors={errors} />
                            <form onSubmit={submit}>
                                <div>
                                    <Label forIput="title" value="タイトル" />
                                    <Input type="text" name="title" value={data.title} className="mt-1 block w-full border-gray-700" isFocused={true} handleChange={onHandleChagne} />
                                </div>
                                {(() => {
                                    const items = []
                                    for (let i = 1; i <= formNum; i++) {
                                        const problem_label = 'problem' + i
                                        items.push(
                                            <div key={i} className="p-1.5">
                                                <Label forIput={problem_label} value={"問題" + i} />
                                                <Input type="text" name={problem_label} value={data[problem_label]} className="mt-1 block w-full" isFocused={true} handleChange={onHandleChagne} />
                                            </div>
                                        )
                                    }
                                    return items
                                })()}

                                <div className="flex items-center justify-between mt-4">
                                    <button type="button" className="text-left bg-zinc-200 ml-4 p-1" onClick={() => addForm()}>
                                        問題を追加する
                                    </button>
                                    <Button className="ml-4 px-4 py-3 text-lg" processing={processing}>
                                        作成する
                                    </Button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

export default Create;

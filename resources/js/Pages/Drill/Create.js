import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import Button from '@/Components/Button';
import ValidationErrors from '@/Components/ValidationErrors';
import Label from '@/Components/Label';
import Input from '@/Components/Input';

const Create = (props) => {
    console.log('DrillページのCreateこんぽーねんとです')
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        problem0: '',
        problem1: '',
        problem2: '',
    })

    const onHandleChagne = (e) => {
        setData(e.target.name, e.target.value)
    }

    const submit = (e) => {
        e.preventDefault()

        post(route('drill.store'))
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
                            新規作成ページ
                            <ValidationErrors errors={errors} />
                            <form onSubmit={submit}>
                                <div>
                                    <Label forIput="title" value="Title" />
                                    <Input type="text" name="title" value={data.title} className="mt-1 block w-full" isFocused={true} handleChange={onHandleChagne} />
                                </div>
                                <div>
                                    <Label forIput="problem0" value="Problem0" />
                                    <Input type="text" name="problem0" value={data.problem0} className="mt-1 block w-full" isFocused={true} handleChange={onHandleChagne} />
                                </div>
                                <div>
                                    <Label forIput="problem1" value="Problem1" />
                                    <Input type="text" name="problem1" value={data.problem1} className="mt-1 block w-full" isFocused={true} handleChange={onHandleChagne} />
                                </div>
                                <div>
                                    <Label forIput="problem2" value="Problem2" />
                                    <Input type="text" name="problem2" value={data.problem2} className="mt-1 block w-full" isFocused={true} handleChange={onHandleChagne} />
                                </div>
                                <div className="flex items-center justify-end mt-4">
                                    <Button className="ml-4" processing={processing}>
                                        作成
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

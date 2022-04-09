import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import Button from '@/Components/Button';
import ValidationErrors from '@/Components/ValidationErrors';
import Label from '@/Components/Label';
import Input from '@/Components/Input';

const Edit = (props) => {
    console.log('DrillページのEditコンポーネントです')
    console.log(props)

    const problems = props.problems

    const makeUseForm = (drill, problems) => {
        console.log('makeUseFormです')

        let data = {}
        for (let i = 0; i < drill.problem_num; i++) {
            const add_key = 'problem' + (i + 1)
            const add_value = problems[i].content
            const add_data = {
                [add_key]: add_value
            }
            data = { ...data, ...add_data }
        }
        data = { ...data, ...{ 'title': drill.title } }
        return data
    }
    const { data, setData, patch, processing, errors } = useForm(makeUseForm(props.drill, props.problems))


    const onHandleChagne = (e) => {
        console.log('onHandleChangeです')
        console.log(e.target.name, e.target.value)
        setData(e.target.name, e.target.value)
    }

    const submit = (e) => {
        e.preventDefault()

        patch(route('drill.update', props.drill.id))
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

                            練習の編集ページ
                            <ValidationErrors errors={errors} />
                            <form onSubmit={submit}>
                                <div>
                                    <Label forIput="title" value="Title" />
                                    <Input type="text" name="title" value={data.title} className="mt-1 block w-full" isFocused={true} handleChange={onHandleChagne} />
                                </div>
                                {problems.map((problem, index) => {
                                    const problem_label = 'problem' + problem.order_id
                                    return (
                                        <div key={index}>
                                            <Label forIput={problem_label} value={"Problem" + problem.order_id} />
                                            <Input type="text" name={problem_label} value={data[problem_label]} className="mt-1 block w-full" isFocused={true} handleChange={onHandleChagne} />
                                        </div>
                                    )
                                })}

                                <div className="flex items-center justify-end mt-4">
                                    <Button className="ml-4" processing={processing}>
                                        更新
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

export default Edit;

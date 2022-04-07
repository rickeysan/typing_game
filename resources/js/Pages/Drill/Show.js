import React, { useEffect, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import Button from '@/Components/Button';
import ValidationErrors from '@/Components/ValidationErrors';
import Label from '@/Components/Label';
import Input from '@/Components/Input';
import keyCodeMap from '../../master/keymap'

const Create = (props) => {
    console.log('DrillページのShowコンポーネントです')
    console.log(props)
    const { data, setData, post, processing, errors } = useForm({

    })
    const [currentProblemNum, setCurrentProblemNum] = useState(0);

    const makeProblemKeyCodes = () => {
        let problemKeyCodes = []
        const drill = props.drill
        console.log('makeProblemKeyCodesです')
        // console.log(keyCodeMap)
        // console.log(keyCodeMap.j)
        // console.log(currentProblemNum)
        // console.log(drill)
        // console.log(drill['problem' + currentProblemNum])
        console.log(Array.from(drill[['problem' + currentProblemNum]]))
        Array.from(drill['problem' + currentProblemNum]).forEach(
            (text) => {
                // console.log(keyCodeMap[text])
                problemKeyCodes.push(keyCodeMap[text])
            }
        )
        console.log(problemKeyCodes)
    }

    useEffect(() => {
        makeProblemKeyCodes()
    }, [currentProblemNum])



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
                            練習ページ
                            <div className="card w-9/12	h-80 bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="text-lg">第{currentProblemNum + 1}問</h2>
                                    <p className="text-2xl">If a dog chews shoes whose shoes does he choose?</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

export default Create;

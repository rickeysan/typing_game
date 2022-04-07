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
    const [currentProblemNum, setCurrentProblemNum] = useState(0)
    const [currentProbleKeyList, setCurrentProblemKeyList] = useState([])
    const [currentWordNum, setCurrentWordNum] = useState(0)
    const [countDownNum, setCountDownNum] = useState(3)
    const [isStart, setIsStart] = useState(false)
    const [isCountDown, setIsCountDown] = useState(false)
    const [timerNum, setTimerNum] = useState(0)

    const makeProblemKeyList = () => {
        const drill = props.drill
        console.log('makeProblemKeyCodesです')
        let problemKye = Array.from(drill[['problem' + currentProblemNum]])
        console.log(problemKye)
        setCurrentProblemKeyList(problemKye)
    }

    useEffect(() => {
        makeProblemKeyList()
    }, [currentProblemNum])

    const doDrill = () => {
        console.log('練習を開始します')
        countDown()
        setIsCountDown(true)
    }

    const countDown = () => {
        console.log('countDownです')
        let timer = window.setInterval(() => {
            setCountDownNum((count) => count - 1)
            setCountDownNum((count) => {
                console.log('2つ目のsetCountDownNumです')
                console.log(count)
                if (count <= 0) {
                    console.log('カウントダウン終了です')
                    setIsCountDown(false)
                    window.clearInterval(timer)
                    setIsStart(true)
                    window.clearInterval()
                    countTimer()
                }
                return count
            }
            )
        }, 1000)
    }

    // const judgeCountDown = () => {
    //     console.log('judgeCountDownです')
    //     if (countDownNum <= 0) {
    //         console.log('カウントダウン終了です')
    //         setIsCountDown(false)
    //         // window.clearInterval(timer)
    //         setIsStart(true)
    //         window.clearInterval()
    //         countTimer()
    //     }
    // }

    // useEffect(() => {
    //     console.log(countDownNum)
    //     judgeCountDown()
    // }, [countDown])


    const handleKeyPress = (e) => {
        console.log('handleKeyPressです');
        console.log(e.key, 'が押されました')
        console.log(currentProblemNum, '番目です')
        console.log(currentProbleKeyList[currentWordNum], 'が答えです')
        if (e.key === currentProbleKeyList[currentWordNum]) {
            console.log('正解です')
            // setCurrentWordNum((preCurrentWordNum) => preCurrentWordNum + 1)
            const newCurrentWordNum = currentWordNum + 1

            setCurrentWordNum(newCurrentWordNum)
            if (currentWordNum === currentProbleKeyList.length - 1) {
                console.log('問題クリアです')
                setCurrentProblemNum(currentProblemNum + 1)
                setCurrentWordNum(0)
            }
        } else {
            console.log('不正解です')
        }
    }

    const countTimer = () => {
        let timer = window.setInterval(() => {
            setTimerNum((count) => count + 1)
        }, 1000)
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
                            練習ページ
                            <div className="card w-9/12	h-80 bg-base-100 shadow-xl"
                                tabIndex={0}
                                onKeyPress={(e) => handleKeyPress(e)}
                            >
                                <div className="card-body">
                                    {isStart &&
                                        <>
                                            <h2 className="text-lg">第{currentProblemNum + 1}問</h2>
                                            <span>経過時間：{timerNum}秒</span>
                                            <p className="text-2xl">
                                                {currentProbleKeyList.map((key, index) => {
                                                    const style = index < currentWordNum ? 'text-red-500' : ''
                                                    return (
                                                        <span className={style} key={index}> {key}</span>
                                                    )
                                                })}
                                            </p>
                                        </>
                                    }
                                    {isCountDown &&
                                        <>
                                            <span>{countDownNum}</span>
                                        </>
                                    }
                                    {!isStart && !isCountDown &&
                                        <>
                                            <button className="btn btn-info w-28" onClick={() => doDrill()}>練習開始!!</button>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated >
    );
}

export default Create;

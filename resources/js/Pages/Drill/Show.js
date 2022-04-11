import React, { useEffect, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import Button from '@/Components/Button';
import ValidationErrors from '@/Components/ValidationErrors';
import Label from '@/Components/Label';
import Input from '@/Components/Input';
import keyCodeMap from '../../master/keymap'

const Show = (props) => {
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
    const [isEnd, setIsEnd] = useState(false)
    const [missNum, setMissNum] = useState(0)
    const [wpm, setWpm] = useState(0)
    const [score, setScore] = useState(0)
    const [finishTime, setFinishTime] = useState(0)

    const makeProblemKeyList = () => {
        const problems = props.problems
        let problemKye = Array.from(problems[currentProblemNum]['content'])
        setCurrentProblemKeyList(problemKye)
    }

    useEffect(() => {
        if (currentProblemNum === props.problems.length) {
            console.log('すべての問題に回答しました');
            typingScore()
            setIsEnd(true)
            setIsStart(false)
            setFinishTime(timerNum)
            window.clearInterval()
        } else {
            makeProblemKeyList()
        }
    }, [currentProblemNum])

    const doDrill = () => {
        countDown()
        setIsCountDown(true)
    }

    const countDown = () => {
        let timer = window.setInterval(() => {
            setCountDownNum((count) => count - 1)
            setCountDownNum((count) => {
                console.log(count)
                if (count <= 0) {
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


    const handleKeyPress = (e) => {
        console.log('handleKeyPressです')
        console.log(e.key)
        if (e.key === currentProbleKeyList[currentWordNum]) {
            console.log('正解です')
            const newCurrentWordNum = currentWordNum + 1

            setCurrentWordNum(newCurrentWordNum)
            if (currentWordNum === currentProbleKeyList.length - 1) {
                setCurrentProblemNum(currentProblemNum + 1)
                setWpm((count) => count + 1)
                setCurrentWordNum(0)
            }
        } else {
            console.log('不正解です')
            setMissNum((count) => count + 1)
        }
    }

    const countTimer = () => {
        let timer = window.setInterval(() => {
            setTimerNum((count) => count + 1)
        }, 1000)
    }

    const typingScore = () => {
        setScore((wpm * 2) * (1 - missNum / (wpm * 2)))
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
                            <h2 className="py-2.2 text-xl">練習ページ</h2>
                            <div className="card w-9/12	h-80 bg-base-100 shadow-xl mr-auto ml-auto"
                                tabIndex={0}
                                onKeyPress={(e) => handleKeyPress(e)}
                            >
                                <div className="card-body justify-center items-center p-5">
                                    {isStart &&
                                        <>
                                            <h2 className="text-xg">第{currentProblemNum + 1}問</h2>
                                            <span>経過時間：{timerNum}秒</span>
                                            <p className="text-3xl">
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
                                            <span className="text-5xl">{countDownNum}</span>
                                        </>
                                    }
                                    {!isStart && !isCountDown && !isEnd &&
                                        <>
                                            <button className="btn btn-info w-28" onClick={() => doDrill()}>練習開始!!</button>
                                            <Link href={route('drill.index')}>
                                                <button className="px-4 py-2 mt-16 bg-green-500 text-white rounded-lg text-xs font-semibold">
                                                    一覧画面へ
                                                </button>
                                            </Link>
                                        </>
                                    }
                                    {isEnd &&
                                        <>
                                            <span>お疲れ様でした</span>
                                            <span>時間：{finishTime}秒</span>
                                            <span>ミスタイプの数：{missNum}</span>
                                            <span>得点：{score}</span>
                                            <Link href={route('drill.index')}>
                                                <button className="px-4 py-2 mt-16 bg-green-500 text-white rounded-lg text-xs font-semibold">
                                                    一覧画面へ
                                                </button>
                                            </Link>
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

export default Show;

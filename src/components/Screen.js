import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {hide} from '../features/screen/screenSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import Modal from './Modal';
import BG from '../assets/bg.svg';

const Screen = ({visibleState}) => {
    const dispatch = useDispatch();
    const [modalState, setModalState] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isLastQuestion,setIsLastQuestion] = useState(false);
    const [isResult,setIsResult] = useState(false);
    const [questions, setQuestions] = useState(null);
    const [answers,setAnswers] = useState([])
    const [currentQuestion,setCurrentQuestion] = useState(0);
    const [selected,setSelected] = useState(null);
    const [time, setTime] = useState(30);
    const intervalRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setQuestions(response.data.slice(0,10))
        } catch (err) {
            setError(err);
            dispatch(hide());
            toast.error("Internet bağlantınızı kontrol ediniz.")
        } finally {
            setLoading(false);
            setIsActive(true);
        }
    }

    useEffect(() => {
        fetchData();
    },[]);

    const resetTime = async () => {
        try {
            await stopTimer();
        } 
        catch (error) {
            setError(error);
        }
        finally {
            startTimer();
        }
    }

    const getAnswer = (option) => {
        switch(option) {
            case "Option 1":
              return (questions[currentQuestion].body.split(" ")[0])
              break;
            case "Option 2":
                return (questions[currentQuestion].body.split(" ")[1])
              break;
            case "Option 3":
                return (questions[currentQuestion].body.split(" ")[2])
                break;
            case "Option 4":
                return (questions[currentQuestion].body.split(" ")[3])
              break;
            default:
              return ("Boş bırakıldı.")
          }
    }

    const nextQuestion = () => {
        setAnswers([...answers,{id:questions[currentQuestion].id,question:questions[currentQuestion].title,answer:getAnswer(selected)}])
        if (questions && questions.length>0) {
            if (currentQuestion===questions.length-1) {
                setIsLastQuestion(true);
            } else {
                setCurrentQuestion(prev => prev += 1);
                setSelected(null);
                toast.success('Soru başarıyla kaydedildi.')
                resetTime();
            }
        } else {
            setIsResult(true);
        }
    }
    

    useEffect(() => {
        if (loading) {

        } else {
            if (isActive) {
                intervalRef.current = setInterval(() => {
                    setTime((prev) => {
                    if (prev === 1) {
                        if (currentQuestion===9){
                            setAnswers([...answers,{id:questions[currentQuestion].id,question:questions[currentQuestion].title,answer:getAnswer(selected)}])
                            setIsResult(true);
                            return
                        } else {
                            clearInterval(intervalRef.current);
                            nextQuestion();
                            
                            return 30;       
                        }
                    } else {
                        return prev - 1;
                    }
                    })
                },1000)
            } 
        }

      return () => clearInterval(intervalRef.current);
      
    }, [isActive,loading])

    const startTimer = () => {
        setIsActive(true);
    }

    const stopTimer = () => {
        setIsActive(false);
        clearInterval(intervalRef.current);
        setTime(30);
    }

    const handleChange = (event) => {
        setSelected(event.target.value);
    };
    

  return (
    <>
    {
      visibleState && !loading ?  
      <div className='absolute w-full h-fit min-h-screen bg-slate-500 text-white flex items-center justify-center '>
        <div className='bg-custom-radial h-full min-h-screen w-full flex flex-col justify-start p-[80px] z-20'>

            {isResult ?
            
            <>
            <div className='w-full flex flex-col  justify-center items-center'>
                <div className='pb-10 flex items-center space-x-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-slate-200">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                    </svg>
                    <h1 className='text-slate-200 text-3xl'>Sınav bitti!</h1>
                </div>

                <table class="border-separate drop-shadow-lg border border-slate-500 bg-slate-300 rounded-lg border-spacing-2">
                    <thead>
                        <tr className='py-4 '>
                            <th className='py-4 px-6 border rounded-lg bg-slate-400 border-slate-200'>Soru Sırası</th>
                            <th className='py-4 px-6 border rounded-lg bg-slate-400 border-slate-200'>Soru</th>
                            <th className='py-4 px-6 border rounded-lg bg-slate-400 border-slate-200'>Verilen Cevap</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        answers.map((item) => {
                            return (
                                <tr>
                                    <th className='rounded-lg py-4 px-6 bg-slate-600 border border-slate-400'>{item.id}</th>
                                    <th className='rounded-lg py-4 px-6 bg-slate-600 border border-slate-400'>{item.question}</th>
                                    <th className='rounded-lg py-4 px-6 bg-slate-600 border border-slate-400'>{item.answer}</th>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                   
                </table>
                <div className='p-6'>
                    <button className='flex items-center space-x-1 py-4 px-6 font-bold bg-red-500 rounded-xl' onClick={() => dispatch(hide())}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                        </svg>
                        <h3>Sınavdan Çık</h3>
                    </button>
                </div>
            </div>
            </> 
            
            : <>
            <div className='flex flex-col items-center h-fit'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-20 text-slate-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <h1 className={`text-5xl font-bold ${time<10 ? 'text-red-500' : 'text-slate-300'} pb-4`}>{time}</h1>
                <h6>{isLastQuestion && "Sınav bittiğinde pencere otomatik olarak kapanacaktır."}</h6>
            </div>
            <div className={`flex drop-shadow-lg relative flex-col w-full z-20 h-fit justify-center items-center p-10 bg-slate-200 rounded-2xl overflow-hidden`}>
                <h1 className='text-xl font-bold text-slate-500 z-20'>{`Soru ${currentQuestion+1}`}</h1>
                <h1 className='font-bold text-xl py-4 text-center text-slate-700 z-20'>{questions && questions[currentQuestion].title}</h1>
                <div className='flex lg:space-x-8 py-8 z-10 flex-col lg:flex-row items-start text-slate-500 z-20'>
                    <div className='flex space-x-2 font-semibold text-lg'>
                        <input
                            type="radio"
                            name="site_name"
                            value="Option 1"
                            checked={selected === "Option 1"}
                            onChange={handleChange}
                            disabled={time>20 ? true : false}
                        />
                        <h3 className='cursor-pointer' onClick={() => setSelected("Option 1")}>{questions && questions[currentQuestion].body.split(" ")[0]}</h3>
                    </div>
                    <div className='flex space-x-2 font-semibold text-lg'>
                        <input
                            type="radio"
                            name="site_name"
                            value="Option 2"
                            checked={selected === "Option 2"}
                            onChange={handleChange}
                            disabled={time>20 ? true : false}
                        />
                        <h3 className='cursor-pointer' onClick={() => setSelected("Option 2")}>{questions && questions[currentQuestion].body.split(" ")[1]}</h3>
                    </div>
                    <div className='flex space-x-2 font-semibold text-lg'>
                        <input
                            type="radio"
                            name="site_name"
                            value="Option 3"
                            checked={selected === "Option 3"}
                            onChange={handleChange}
                            disabled={time>20 ? true : false}
                        />
                        <h3 className='cursor-pointer' onClick={() => setSelected("Option 3")}>{questions && questions[currentQuestion].body.split(" ")[2]}</h3>
                    </div>
                    <div className='flex space-x-2 font-semibold text-lg'>
                        <input
                            type="radio"
                            name="site_name"
                            value="Option 4"
                            checked={selected === "Option 4"}
                            onChange={handleChange}
                            disabled={time>20 ? true : false}
                        />
                        <h3 className='cursor-pointer' onClick={() => setSelected("Option 4")}>{questions && questions[currentQuestion].body.split(" ")[3]}</h3>
                    </div>
                    
                </div>
                {questions && questions.length-1!==currentQuestion ? 
                
                <button onClick={() => nextQuestion()} disabled={isLastQuestion || time>20 ? true : false} className='py-4 px-8 bg-slate-300 hover:bg-slate-400 text-slate-700 hover:text-slate-100 rounded-lg border-white border-2 z-20'>{time>20 ? `${time-20}`: "Sonraki Soru"}</button>
                : 
                <button onClick={() => setIsResult(true)}  className='py-4 px-8 bg-red-300 hover:bg-red-400 text-slate-700 hover:text-slate-100 rounded-lg border-white border-2 z-20'>Sınavı bitir</button>
                }
                <h1 className='font-semibold text-lg pt-6 z-20 text-slate-400'>{currentQuestion+1} / {questions && questions.length}</h1>
                <img className='absolute h-full right-0 object-cover z-10' src={BG} alt="bg" />
            </div>

            <div className='w-full h-fit items-center flex justify-center lg:justify-end pt-6 py-6 z-20'>
                <button onClick={() => setModalState(true)} className='px-4 py-2 bg-red-500 rounded-lg'>Sınavdan Çık</button>
            </div>
            <div className='z-20 flex flex-col'>
            </div>
            </>}
        </div>
        {modalState && <Modal title={"Sınavdan çıkmak üzeresiniz."} text={"Sınavdan çıkmak istediğinize emin misiniz? Sınavınız geçersiz olacaktır."} acceptTitle={"Sınavdan Çık"} declineTitle={"Kapat"} acceptButton={() => dispatch(hide())} declineButton={() => setModalState(false)}/>}
      </div>
      : 
      <div className='min-w-full min-h-screen flex justify-center items-center bg-custom-radial'>
        <h1 className='font-bold animate-ping'>Yükleniyor</h1>
      </div>
    }
    </>
  )
}

export default Screen
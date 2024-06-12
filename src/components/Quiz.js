import React, { useState } from 'react'
import Modal from './Modal'
import { useDispatch } from 'react-redux'
import {show,hide} from '../features/screen/screenSlice';
import BG from '../assets/bg2.png';

const InformationData = [
    {
        id:1,
        info:"Sınav 10 sorudan oluşmaktadır.",
    },
    {
        id:2,
        info:"Sorularda 4 şık bulunmaktadır.",
    },
    {
        id:3,
        info:"Her soruyu cevaplamanız için size ayrılan süre 30 saniyedir.",
    },
    {
        id:4,
        info:"Soru ekranda göründüğü süreden itibaren ilk 10 saniye cevaplama yapılamayacaktır.",
    },
    {
        id:5,
        info:"Soruya ayrılan süre dolduğu durumda yeni soruya geçilecektir.",
    },
    {
        id:6,
        info:"Geçmiş sorulara geri dönülemeyecektir.",
    },
    {
        id:7,
        info:"Sınav bitiminde verdiğiniz cevapları kontrol edebilirsiniz.",
    },
]

const MenuIcon = () =>{
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
    )
}

const ListInfo = () => {
    return (
        <ul className='space-y-2 pb-10'>
            {
                InformationData.map((item) => {
                    return (
                        <ul className='text-slate-700 font-semibold'>
                            <li className='flex items-center space-x-2' key={item.id}><MenuIcon/><h5>{item.info}</h5></li>
                        </ul>
                    )
                })
            }
        </ul>
    )
    
}

function Quiz() {
    const [modalState, setModalState] = useState(false);
    const dispatch = useDispatch();

  return (
    <>
    <div className='min-h-screen max-lg:px-8 w-full p-4 flex flex-col justify-start items-center relative '>
        <img className='absolute left-0 min-w-full min-h-full top-0 object-cover -z-10' src={BG} alt="bg" />
        <div>
            <h1 className='text-5xl font-semibold p-16 text-slate-700'>Lorem Ipsum Sınavına Hoşgeldiniz.</h1>
        </div>
        <div className='w-full  flex flex-col items-center justify-center space-y-6'>
            <h1 className='font-bold py-6 text-slate-700 text-xl'>Sınav Hakkında Bilgilendirme</h1>
            {ListInfo()}
            <button 
                className='flex z-10 px-4 py-2 bg-slate-300 hover:scale-105 transition-all hover:text-white rounded-lg font-medium items-center space-x-2 hover:border-slate-700 border-slate-400 border-2 hover:border-2 hover:bg-slate-700 hover-scale'
                onClick={() => setModalState(true)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                </svg>
                <h4>Sınava başla!</h4>
                
            </button>
            <svg className='absolute bottom-0 w-full z-0' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#334155" fill-opacity="1" d="M0,320L60,293.3C120,267,240,213,360,202.7C480,192,600,224,720,218.7C840,213,960,171,1080,133.3C1200,96,1320,64,1380,48L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
            </svg>

        </div>
        
        {modalState && <Modal title={"Sınava başlamak üzeresiniz."} text={"Lütfen internet bağlantınızın sorunsuz çalıştığından emin olarak sınava giriş yapınız. Başarılar dileriz."} acceptTitle={"Başla"} declineTitle={"Kapat"} acceptButton={() => dispatch(show())} declineButton={() => setModalState(false)}/>
    }
    </div>
    </>
  )
}

export default Quiz
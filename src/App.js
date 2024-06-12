import './App.css';
import Header from './components/Header';
import Quiz from './components/Quiz';
import Footer from './components/Footer';
import Screen from './components/Screen';
import { useSelector  } from 'react-redux'
import  { Toaster } from 'react-hot-toast';

function App() {
  const screen = useSelector((state) => state.screen.value);

  return (
    <div className="App">
      <Toaster />
      {
        screen ?
        <Screen visibleState={true}/>
        :
        <div className='w-full min-h-screen flex flex-col justify-between relative'>
        <Header/>
          <Quiz/>
        <Footer/>
      </div>

      }
    </div>
  );
}

export default App;

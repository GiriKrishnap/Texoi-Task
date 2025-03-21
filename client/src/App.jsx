import { lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'



//Pages...................................................................................
const OnBoarding = lazy(() => import('./pages/onBoarding'));
const Login = lazy(() => import('./pages/login'));
const Register = lazy(() => import('./pages/register'));
const Questions = lazy(() => import('./pages/question'));

//........................................................................................

function App() {

    return (

        <div className="App">
            <div><Toaster /></div>
            <Router>

                {/* <Suspense fallback={<Loading />}> */}

                <Routes>

                    {/* UserPart */}
                    <Route exact path={""} element={<OnBoarding />} />
                    <Route exact path={"/login"} element={<Login />} />
                    <Route exact path={"/register"} element={<Register />} />
                    <Route exact path={"/questions"} element={<Questions />} />

                    {/* <Route path='*' exact element={<NotFound404 />} /> */}

                </Routes>
                {/* </Suspense> */}
            </Router>

        </div >

    );

}

export default App;
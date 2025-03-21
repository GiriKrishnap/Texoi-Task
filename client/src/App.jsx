import { lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/routeProtect';
import PublicRoute from './components/publicRoute';
import { NotFound404 } from './pages/404page';



//Pages...................................................................................
const OnBoarding = lazy(() => import('./pages/onBoarding'));
const Login = lazy(() => import('./pages/login'));
const Register = lazy(() => import('./pages/register'));
const Questions = lazy(() => import('./pages/question'));
const Result = lazy(() => import('./pages/result'));

//........................................................................................

function App() {

    return (

        <div className="App">
            <div><Toaster /></div>
            <Router>

                {/* <Suspense fallback={<Loading />}> */}

                <Routes>

                    {/* UserPart */}

                    <Route element={<PublicRoute />}>
                        <Route exact path={""} element={<OnBoarding />} />
                        <Route exact path={"/login"} element={<Login />} />
                        <Route exact path={"/register"} element={<Register />} />
                    </Route>

                    <Route element={<ProtectedRoute />}>
                        <Route exact path={"/questions"} element={<Questions />} />
                        <Route exact path={"/result"} element={<Result />} />
                    </Route>

                    <Route path='*' element={<NotFound404 />} />

                </Routes>
                {/* </Suspense> */}
            </Router>

        </div >

    );

}

export default App;
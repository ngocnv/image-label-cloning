import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Crawling from "./Crawling";
import LabelSearch from "./LabelSearch";
import Menu from "./Menu";
import LabelSearchDetail from "./LabelSearchDetail";
import LabelSearchNew from "./LabelSearchNew";
import SampleLabel from "./SampleLabel";
import SampleLabelNew from "./SampleLabelNew";
import SampleLabelDetail from "./SampleLabelDetail";
import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";
import {useLoading} from "./LoadingContext";

function App() {

    const { setLoading } = useLoading();

    useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use(
            (config) => {
                setLoading(true);
                return config;
            },
            (error) => {
                setLoading(false);
                return Promise.reject(error);
            }
        );

        const responseInterceptor = axios.interceptors.response.use(
            (response) => {
                setLoading(false);
                return response;
            },
            (error) => {
                setLoading(false);
                return Promise.reject(error);
            }
        );

        // Cleanup interceptors on component unmount
        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, [setLoading]);



    return (
        <>
            <LoadingSpinner />
        <div className="App container-fluid">
            <div className="row">
                <div className="col-2">
                    <Menu/>
                </div>
                <div className="col-10 text-center"  >
                    <Routes>
                        <Route path="/" element={<Crawling/>} />
                        <Route path="/label-search" element={<LabelSearch/>} />
                        <Route path="/label-search/:id"  element={<LabelSearchDetail/>}/>
                        <Route path="/label-search/new" element={<LabelSearchNew/>}/>
                        <Route path="/label-search/:id/new" element={<LabelSearchNew/>}/>
                        <Route path="/label" element={<SampleLabel />}/>
                        <Route path="/label/:id" element={<SampleLabelDetail/>}/>
                        <Route path="/label/new" element={<SampleLabelNew />}/>
                    </Routes>
                </div>
            </div>
        </div>
        </>
    );
}

export default App;

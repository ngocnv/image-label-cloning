import './LabelSearchDetail.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate ,Link, useParams} from "react-router-dom";
import {Button, Modal} from "react-bootstrap";


const LabelSearchDetail = () =>{
    let navigate = useNavigate();
    const {id} = useParams();
    const [labelSearch,setLabelSearch] = useState(null);
    const [showPopup,setShowPopup]=useState(false);
    const fetchLabelSearch = async () => {
        try{
            let response = await axios.post(`http://localhost:8000/label-searches/${id}`)
            setLabelSearch(response.data);
        }catch (error){
            console.log('Error to fetch label search',error);
        }
    }

    const sendDeleteLabelSearch= async ()=>{
        try{
            let response = await axios.delete(`http://localhost:8000/label-searches/${id}`);
            navigate("/label-search");
        }catch (error){
            console.log('Error to delete label search',error);
        }
    }

    const handleCancel = ()=> {
        setShowPopup(false);
    }

    const handleClickDeleteBtn=()=>{
        setShowPopup(true);
    }

    const handleConfirmDelete = ()=> {
        sendDeleteLabelSearch().then(()=>{});
        setShowPopup(false);
    }


    useEffect( ()=>{
        fetchLabelSearch().then(()=>{});
    },[])

    return (
        <div className="Label-search-detail">
            <h5 className="m-2 text-black-50">Label search detail</h5>
            <hr/>
            <Link to="new">
                <button type="button"  className="btn btn-outline-primary m-1" >
                New
                </button>
            </Link>

            <button type="button" className="btn btn-outline-danger m-1" onClick={handleClickDeleteBtn} >Delete</button>
            <Modal show={showPopup} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancel}>
                        No
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="text-start m-3 p-3">
                <div>
                    <h6 className="fw-bold">General</h6>
                    <hr/>
                    <div className="row">
                        <div className="col-auto">
                            <span><text className="fw-semibold">Label search Id:</text>&nbsp;&nbsp;<text>{labelSearch?.labelSearchId}</text></span>
                        </div>
                    </div>
                    <div className="row">
                        <span><text className="fw-semibold">Name:</text>&nbsp;&nbsp;<text>{labelSearch?.name}</text></span>
                    </div>
                </div>
            </div>
            <div className="text-start m-3 p-3">
                <div>
                    <h6 className="fw-bold">Label</h6>
                    <hr/>
                    <div className="row">
                        <div className="col-auto">
                            <span><text className="fw-semibold">Label Id:</text>&nbsp;&nbsp;<text>{labelSearch?.label.labelId}</text></span>
                        </div>
                    </div>
                    <div className="row">
                        <span><text className="fw-semibold">Label Name:</text>&nbsp;&nbsp;<text>{labelSearch?.label.labelName}</text></span>
                    </div>
                </div>
            </div>
            <div className=" text-start m-3 p-3">
                <div>
                    <h6 className="fw-bold">Source</h6>
                    <hr/>
                    <div className="row">
                        <div className="col-auto">
                            <span><text className="fw-semibold">Source Id:</text>&nbsp;&nbsp;<text>{labelSearch?.source.sourceId}</text></span>
                        </div>

                    </div>
                    <div className="row">
                        <span><text className="fw-semibold">Source name:</text>&nbsp;&nbsp;<text>{labelSearch?.source.sourceName}</text></span>
                    </div>
                </div>
            </div>
            <div className="text-start m-3 p-3">
                <div>
                    <h6 className="fw-bold">Search Parameters</h6>
                    <hr/>
                    {labelSearch?.values.map(value=>
                        (
                            <div className="row">
                                <div className="col-auto">
                                    <span><text className="fw-semibold">{value.paramSearch.paramName}:</text>&nbsp;&nbsp;<text>
                                            {value.paramSearch.paramType === 1 ? `${value.paramSearchOptionValue.paramOptionValue}`
                                            :`${value.paramTextValue}`
                                        }
                                    </text></span>
                                </div>
                            </div>
                        ))}

                </div>
            </div>
        </div>
    )
}

export default LabelSearchDetail;
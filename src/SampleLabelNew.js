import './SampleLabelNew.css';
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const SampleLabelNew = ()=>{
    let navigate = useNavigate();
    const [formData,setFormData]=useState({
        name:''
    });
    const submit = async () => {
        let response = await axios.put("http://localhost:8000/labels",formData);
        navigate("/label");
    };
    const handleSubmit = (event) =>{
        event.preventDefault();
        submit().then(()=>{});
    }

    const handleNameChange = (event) => {
        formData.name=event.target.value
    };
    return (
        <div className="Sample-label-new">
            <h5 className="m-2 text-black-50">Create new label</h5>
            <hr/>
            <form onSubmit={handleSubmit}>
                <div className="card">
                    <div className="row m-2 p-2">
                        <label className="col-2" htmlFor="name">Name</label>
                        <input type="text" className="col-auto" id="name"
                               placeholder="Enter name" onChange={event => handleNameChange(event) }/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <button  type="button"  type="submit" className="btn btn-outline-primary mt-4 mb-5">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SampleLabelNew;
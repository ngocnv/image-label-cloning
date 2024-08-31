
import './LabelSearchNew.css'
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";



const LabelSearchNew = ()=>{
    let navigate = useNavigate();
    const [debug,setDebug] = useState(0)
    const [selectedSourceValue,setSelectedSourceValue] = useState('0');
    const [labelDropdownData,setLabelDropdownData] = useState([]);
    const [sourceDropdownData,setSourceDropdownData] = useState([]);
    const [listParam,setListParam]= useState([]);
    const [formData,setFormData] = useState({
        name:'',
        labelId:0,
        sourceId:0,
        paramValues:[ {key:'',value:''}
        ]
    })
    useEffect(()=>{
        fetchLabelData().then(() => {});
        fetchSourceData().then(()=>{});
    },[])
    const fetchLabelData = async ()=>{
        try{
            let response = await axios.get("http://localhost:8000/labels");
            //let response = {'data':[{'labelId':1,'labelName':'Vape'}]};
            setLabelDropdownData(response.data);
        }catch (error){
            console.error('Error fetching up label data',error);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (debug) {
            alert(formData.name);
            alert(formData.labelId);
            alert(formData.sourceId);
            formData.paramValues.map(param => {
                alert(param.key);
                alert(param.value);
            });
        }
        submit().then(()=>{});
    }

    const submit = async () => {
        try {
            let response = await axios.put("http://localhost:8000/label-searches", formData);
            navigate("/label-search");
        } catch (error) {
            console.log("Error post submit", error);
        }
    }

    const fetchSourceData = async ()=>{
        try{
            let response = await axios.get("http://localhost:8000/sources");
            setSourceDropdownData(response.data);
        }catch (error){
            console.error('Error fetching up label data',error);
        }
    }

    React.useEffect(()=>{
        fetchParamsFromSource().then(()=>{});
    },[selectedSourceValue]);

    const fetchParamsFromSource= async () => {
        try {
            let response = await axios.post(`http://localhost:8000/sources/${selectedSourceValue}/param-searches`);
            setListParam(response.data);
            formData.paramValues=[];
            response.data.map( param=>{
                if(param.paramType ===1){
                    formData.paramValues =[...formData.paramValues,{key:param.paramName,value:0}]
                }else {
                    formData.paramValues =[...formData.paramValues,{key:param.paramName,value:''}]
                }
                setFormData(formData);
            })
        } catch (error) {
            console.error("Error to fetch params ", error);
        }
    }

    const handleNameChange = (event) =>{
        formData.name=event.target.value;
        setFormData(formData);
    }

    const handleLabelChange = (event) =>{
        formData.labelId = event.target.value;
        setFormData(formData);
    }

    const handleSourceChange = (event) =>{
        setSelectedSourceValue(event.target.value);
        formData.sourceId = event.target.value;
        setFormData(formData);
    }

    const handleParamChange = (key,event) =>{
        formData.paramValues[key].key=event.target.id;
        formData.paramValues[key].value = event.target.value;
        setFormData(formData);
    }

    return (
        <div className="Label-search-new">
            <h5 className="m-2 text-black-50">Create label search</h5>
            <hr/>
            <form onSubmit ={handleSubmit}>
                <div className="card">
                    <div className="row m-2 p-2">
                            <label className="col-2" htmlFor="name">Name</label>
                            <input type="text" className="col-auto" id="name"
                                   placeholder="Enter name" onChange={event => handleNameChange(event)}/>
                    </div>
                    <div className="row m-2 p-2">
                            <label className="col-2" htmlFor="label">Label</label>
                            <select id="label"
                                    className="col-auto"
                                    aria-label="Default select label"
                                    onChange={event =>handleLabelChange(event)}
                                    >
                                <option key="0" selected value='0'>Select option</option>
                                {
                                    labelDropdownData?.map( (item)=>
                                        ( <option value={item.labelId} key={item.labelId}>{item.labelName}</option>)
                                    )
                                }
                            </select>
                        </div>
                    <div className="row m-2 p-2">
                            <label className="col-2" htmlFor="source">Source</label>
                            <select id="label"
                                    className="col-auto"
                                    aria-label="Default select source"
                                    value={selectedSourceValue}
                                    onChange={handleSourceChange}
                            >
                                <option key="0" selected value='0'>Select option</option>
                                {
                                    sourceDropdownData?.map( (item)=>
                                        ( <option value={item.sourceId} key={item.sourceId}>{item.sourceName}</option>)
                                    )
                                }
                            </select>
                        </div>
                </div>
                <div className="card mt-2">
                    {
                        listParam?.map( (param,index) =>(
                            <div key={index} className="row m-2 p-2">
                                <label className="col-2" htmlFor={param.paramName}>{param.paramName}</label>
                                {param.paramType === 1 ?
                                    <select id={param.paramName}
                                            className="col-auto"
                                            aria-label={`Default select ${param.paramName}`}
                                            onChange={event=>handleParamChange(index,event)}
                                    >
                                        <option selected value='0'>Select option</option>
                                        {param?.optionValues?.map(option =>
                                            <option value={option.paramSearchOptionId} >{option.paramOptionValue}</option>
                                        )}
                                    </select>
                                : <input type="text"
                                         className="col-auto"
                                         id={param.paramName}
                                         placeholder={`Enter ${param.paramName}`}
                                         onChange={event => handleParamChange(index,event)}
                                    />
                                }
                            </div>
                        ))
                    }
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

export default LabelSearchNew;
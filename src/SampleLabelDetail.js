
import './SampleLabelDetail.css'
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ImagePopover from "./ImagePopover";
import axios from "axios";
import GoogleDriveView from "./GoogleDriveView";
const SampleLabelDetail = () =>{

    const {id} = useParams();
    const [label,setLabel] = useState(null);

    const fetchLabel = async () =>{
        let response = await axios.get(`http://localhost:8000/labels/${id}`);
        setLabel(response.data);
    }

    useEffect( ()=>{
      fetchLabel().then(() =>{}) ;
    },[])

    return (
        <div className="Sample-label-detail">
            <h5 className="m-2 text-black-50">Label detail</h5>
            <hr/>
            <div className="text-start m-3 p-3">
                <div>
                    <h6 className="fw-bold">General</h6>
                    <hr/>
                    <div className="row">
                        <div className="col-auto">
                            <span><text className="fw-semibold">Name:</text>&nbsp;&nbsp;<text>{label?.labelName}</text></span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-auto">
                            <span><text className="fw-semibold">Path:</text>&nbsp;&nbsp;<text>{label?.labelPath}</text></span>
                        </div>
                    </div>
                </div>
                <h6 className="fw-bold mt-5">Labeled images</h6>
                <hr/>
                <div className="Sample-label-detail-sample-view">
                    <div className="row">
                        {
                            label?.samples?.map(s =>(
                                <div className="col-auto border p-2 m-2">
                                    <ImagePopover
                                        imageId={s.imageId}
                                        name={s.name}
                                        md5={s.md5}
                                        sourceUrl={s.sourceUrl}
                                        size={s.size}
                                        width={s.width}
                                        height={s.height}
                                        status={s.status}
                                    ></ImagePopover>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mt-5">
                        <GoogleDriveView  labelId={id} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SampleLabelDetail;
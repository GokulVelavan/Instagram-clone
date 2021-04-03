import { Button } from '@material-ui/core'
import "./ImageUpload.css"
import React, { useState } from 'react'
import {storage, db} from "./Firebase"
import firebase from "firebase";

function ImageUpload({username}) {
    const[caption,setCaption]=useState("");
    const[image,setImage]=useState(null);
    const[progras,setProgras]=useState(0);

    const handleChange=(e)=>{
        if(e.target.files[0])
        {setImage(e.target.files[0])}
    };
    
    const handleUpload=()=>{
        const uploadTask=storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
                (snapshot)=>{
                    //progres function...
                     const progras=Math.round(
                         (snapshot.bytesTransferred/snapshot.totalBytes)*100
                     );
                     setProgras(progras);
                },
                (error)=>{
                    //Error function...
                    console.log(error);
                    alert(error.message)
                },
                ()=>{
                    //complete function..
                    storage.ref("images").child(image.name).getDownloadURL().then(url=>{
                        db.collection("posts").add({
                            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                            caption:caption,
                            url:url,
                            username:username
                        })
                        setProgras(0);
                        setImage(null);
                        setCaption("");
                    })
                }
            )
    }
    return (
        <div className="upload_form">
            {/* caption */}
            {/* file picker */}
            {/* upload button */}
            <progress className="progras" value={progras} max="100"/>
            <input type="text" placeholder="Add a caption in here" onChange={(event)=>setCaption(event.target.value)}/>
            <input type="file" onChange={handleChange}/>
            <Button onClick={handleUpload}>
                Upload
            </Button >
        </div>
    )
}

export default ImageUpload


import styles from './Notes.module.css'
import LeftArrow from './../../assets/left-arrow.png'
import SendIcon from './../../assets/send.png'
import { useState } from 'react'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { useRef } from 'react'


const Notes = ({groups,groupDetails,setOpenNote,notes,setNotes,currentGroupId}) => {
  const [note,setNote] = useState({group_id: null, data: {date: '', time: '', content: ''}});
  const textAreaRef = useRef(null);

  useEffect(() => {
      if(note && note.group_id !== null) {
        setNotes(prev => ([...prev,note]));
        const allNotes = [...notes,note];
        localStorage.setItem("notes",JSON.stringify(allNotes));
      }
  },[note]);

  

  const setDate = (dateObj) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August","September", "October", "November", "December"];
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    const day = dateObj.getUTCDate();
    const date = `${day} ${month} ${year}`;
    setNote(prev => ({...prev,data: {...prev.data,date}}));
  }

  const setTime = (dateObj) => {
    let hours = dateObj.getHours();
    let timeZone;
    if(hours > 12) {
      hours -= 12;
      timeZone = 'PM';
    } else {
      timeZone = 'AM';
    }
    let minutes = dateObj.getMinutes();
    if(String(hours).length < 2) {
      hours = '0'+ hours;
    }
    if(String(minutes).length < 2) {
      minutes = '0'+ minutes;
    }
    const time = `${hours}:${minutes} ${timeZone}`;
    setNote(prev => ({...prev,data: {...prev.data,time}}));
  }

  const setDateAndTime = () => {
    const dateObj = new Date();
    setDate(dateObj);
    setTime(dateObj);
  }

  const setId = () => {
    setNote(prev => ({...prev,group_id: currentGroupId}));
  }


  const addNote = (e,clickEvent) => {
    const text = textAreaRef.current.value;
    const value = text?.trim();
    if(!clickEvent) {
      if(e.key === "Enter") {
        if(value) {
          setNote(prev => ({...prev,data: {...prev.data,content: e.target.value}}));
          setId();
          setDateAndTime();
        }
      }
    } else { 
      if(value) {
        setNote(prev => ({...prev,data: {...prev.data,content: value}}));
        setId();
        setDateAndTime();
      }
    }
  }

  const backOperation = () => {
    setOpenNote(false);
    for(const group of groups) {
      group.background = false;
    }
  }

  const filterNotes = useMemo(() => {
    let filteredNotes;
    filteredNotes = notes?.filter(note => note.group_id === currentGroupId);
    return filteredNotes;
  },[notes,currentGroupId]);
  

  const displayNotes = filterNotes?.map((note,index) => (
    <div key = {index} className= {styles.note}>
        <div className= {styles.date}>
          <p>{note?.data.time}</p>
          <p>{note?.data.date}</p>
        </div>
        <div className= {styles.text}>
          <p>{note?.data.content}</p>
        </div>
    </div>
  ))
  
  return (
    <div className= {styles.notes}>
      <div className= {styles["open-note"]}>
          <div className= {styles["arrow-box"]}>
            <img src = {LeftArrow} alt="Left Arrow" onClick={backOperation}/>
          </div>
          <p className= {styles.icon} style = {{backgroundColor: `${groupDetails?.colour}`}}>
            {groupDetails?.acronymn}
          </p>
          <p className= {styles["note-heading"]}>{groupDetails?.title}</p>
      </div>
      <div className= {styles["main-content"]}>
        {displayNotes}
      </div>
      <div className= {styles["write-note"]}>
        <textarea placeholder='Enter your text here...........' ref = {textAreaRef} onKeyDown={(e)=> addNote(e,false)}></textarea>
        <img src= {SendIcon} alt="Send" className= {styles.send} onClick={(e) => addNote(e,true)}/>
      </div>
    </div>
  )
}

export default Notes

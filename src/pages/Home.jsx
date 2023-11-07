import { useState,useEffect } from 'react'
import styles from './../App.module.css'
import CreateNotesGroup from './../components/createNotesGroup/CreateNotesGroup'
import Notes from './../components/notes/Notes'
import NotesGroup from './../components/groups/NotesGroup'
import HeroSection from './../components/hero/HeroSection'


const Home = () => {
  const [openModal,setOpenModal] = useState(false);
  const [openNote,setOpenNote] = useState(false);
  const [groups,setGroups] = useState(JSON.parse(localStorage.getItem("groups")) || []);
  const [groupDetails,setGroupDetails] = useState({colour: '', title: '',acronymn: '',background: false});
  const [notes,setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || []);
  const [currentGroupId,setCurrentGroupId] = useState(null);


  useEffect(() => {
    setGroupDetails(prev => ({...prev,background: false}));
  },[]);


  return (
    <main className= {styles["main-app"]}>
        <div className= {styles["mobile-view"]}>
          {!openNote ? 
          <>
            <CreateNotesGroup 
              openModal = {openModal}
              setOpenModal = {setOpenModal}
              groups = {groups} 
              setGroups = {setGroups} 
              setGroupDetails = {setGroupDetails} 
            />
            <NotesGroup 
              setOpenNote = {setOpenNote} 
              groups = {groups} 
              setGroupDetails = {setGroupDetails} 
              setCurrentGroupId={setCurrentGroupId}
            />
          </> : 
          <Notes 
            groups = {groups}
            groupDetails = {groupDetails} 
            setOpenNote = {setOpenNote} 
            notes = {notes} 
            setNotes = {setNotes} 
            currentGroupId = {currentGroupId}
          />}
        </div>
        <div className= {styles["desktop-view"]}>
          <div className= {styles["create-notes"]}>
            <CreateNotesGroup 
              openModal = {openModal}
              setOpenModal = {setOpenModal}
              groups = {groups}
              setGroups = {setGroups} 
              setGroupDetails = {setGroupDetails} />
            <NotesGroup 
              setOpenNote = {setOpenNote} 
              setGroupDetails={setGroupDetails}
              groups = {groups}  
              setCurrentGroupId={setCurrentGroupId}
            />
          </div>
          <div className = {styles["my-notes"]}>
            {openNote ? 
              <Notes 
                groups = {groups}
                groupDetails = {groupDetails} 
                setOpenNote = {setOpenNote} 
                notes = {notes} 
                setNotes = {setNotes} 
                currentGroupId = {currentGroupId}
              /> 
              : 
              <HeroSection />
            }
          </div>
        </div>  
    </main>
  )
}

export default Home

import Group from './Group';
import styles from './NotesGroup.module.css';

const NotesGroup = ({setOpenNote,groups,setGroupDetails,setCurrentGroupId}) => {
  const allGroups = groups?.map((group,index) => (
    <Group 
      key = {index} 
      group = {group} 
      groups = {groups}
      setOpenNote = {setOpenNote} 
      setGroupDetails = {setGroupDetails}
      index = {index}
      setCurrentGroupId = {setCurrentGroupId}
    />
  ))
  return (
    <div className = {styles["all-notes"]}>
      {allGroups}
    </div>
  )
}

export default NotesGroup

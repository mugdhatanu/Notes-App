import styles from './CreateNotesGroup.module.css'
import Modal from './Modal';


const CreateNotes = ({openModal,setOpenModal,groups,setGroups,setGroupDetails}) => {
  
  return (
    <section className= {styles["create-notes"]}>
        <h1 className= {styles.title}>Pocket Notes</h1>
        <button className= {styles["create-group"]} onClick={() => setOpenModal(true)}>
          <span>+</span>
          <span>Create Notes group</span>
        </button>
        {openModal && <Modal setOpenModal = {setOpenModal} groups = {groups} setGroups = {setGroups} setGroupDetails = {setGroupDetails}/> }
    </section>  
  )
}

export default CreateNotes

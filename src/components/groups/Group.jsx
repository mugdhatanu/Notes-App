
import styles from './NotesGroup.module.css';

const Group = ({group,groups,setOpenNote,setGroupDetails,index,setCurrentGroupId}) => {
    const getHeaderAndIcon = (group) => {
        setGroupDetails(prev => ({...prev,title: group.title,colour: group.colour,acronymn: group.acronymn,background:true}));
        if(group) {
            group.background = true;
        }

        for(let i = 0; i<= groups.length; i++) {
            if(i !== index) {
                if(groups[i]) {
                    groups[i].background = false;
                }
            }
        }
       
        
        setOpenNote(true)
    }

    return (
        <section onClick = {() => setCurrentGroupId(index)}>
            <div className= {`${styles["open-note"]} ${group.background && styles["add-background"]}`} onClick = {() => getHeaderAndIcon(group)}>
                <p className= {styles.icon} style = {{backgroundColor: `${group.colour}`}}>
                {group.acronymn}
                </p>
                <p className= {styles.note}>{group.title}</p>
            </div>
        </section>
    )
}

export default Group

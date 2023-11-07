import { useState } from 'react'
import styles from './Modal.module.css'






const Modal = ({setOpenModal,groups,setGroups,setGroupDetails}) => {
  const [error,setError] = useState({title: false, colour: false});
  const [details,setDetials] = useState({title: '', acronymn: '', colour: '', });
 
  

  const changeTitle = (e) => {
    setDetials(prev => ({...prev,title: String(e.target.value).trim()}));
    setError(prev => ({...prev,title:false}));
  }

  const colorPicker = (e,colour) => {
    const parent = e.target.parentElement;
    const allColors = parent.children;
    for(const colorBtn of allColors) {
      colorBtn.classList.remove(`${styles["add-border"]}`);
    }
    const colorBtn = e.target.classList;
    colorBtn.add(`${styles["add-border"]}`);
    setDetials(prev => ({...prev,colour}));
    setError(prev => ({...prev,colour:false}));
  }

  const createGroup = () => {
    let flag = true;
    if(!details.title) {
      setError(prev=> ({...prev,title: true}));
      flag = false;
    } 
    if(!details.colour) {
      setError(prev=> ({...prev,colour: true}));
      flag = false;
    } 
    if(flag) {
      const title = details.title;
      const titleArr = title.split(" ");
      let acronymn;
      if(titleArr.length === 1) {
        acronymn = titleArr[0].charAt(0).toUpperCase();
      } else {
        acronymn = titleArr[0].charAt(0).toUpperCase() + titleArr[1].charAt(0).toUpperCase();
      }
      const currentDetails = {...details,acronymn}
      setDetials(currentDetails);
      setGroupDetails(prev => ({...prev,...currentDetails}));
      setGroups(prev=> ([...prev,currentDetails]));
      setOpenModal(false);
      localStorage.setItem("groups",JSON.stringify([...groups,currentDetails]));
    }  
  }

  return (
    <div className= {styles["group-options"]}>
          <div className= {styles.overlay} onClick={() => setOpenModal(false)}></div>
          <div className= {styles.container}>
            <h3>Create New Notes group</h3>
            <div className= {styles["options"]}>
              <p className= {styles["group-name"]}>Group Name</p>
              <div className= {`${styles["input-section"]} ${styles["input-error"]} ${error.title && styles["add-margin"]}`}>
                <input 
                type="text" 
                placeholder='Enter your group name' 
                onChange={(e) => changeTitle(e)}/>
                {error.title && <p className= {styles["error-msg"]}>Please enter a valid name</p>}
              </div> 
            </div>
            <div className= {styles["options"]}>
              <p className= {styles["group-color"]}>Choose colour</p>
              <div className= {`${styles["input-error"]} ${error.colour && styles["add-margin"]}`}>
                <div className= {styles["color-circles"]}>
                  <div className= {`${styles.circle} ${styles.violet}`} onClick={(e) => colorPicker(e,'var(--violet)')}></div>
                  <div className= {`${styles.circle} ${styles.pink}`} onClick={(e) => colorPicker(e,'var(--pink)')}></div>
                  <div className= {`${styles.circle} ${styles.teal}`} onClick={(e) =>colorPicker(e,'var(--teal)')}></div>
                  <div className= {`${styles.circle} ${styles.orange}`} onClick={(e) => colorPicker(e,'var(--orange)')}></div>
                  <div className= {`${styles.circle} ${styles["blue-dark"]}`} onClick={(e) => colorPicker(e,'var(--dark-blue')}></div>
                  <div className= {`${styles.circle} ${styles["blue-fade"]}`} onClick={(e) => colorPicker(e,'var(--fade-blue')}></div>
                </div>
                {error.colour && <p className= {`${styles["error-msg"]} ${styles["color-error"]}`}>Please select a colour</p>}
              </div>
            </div>
            <button onClick={createGroup}>Create</button>
          </div>
        </div>
  )
}

export default Modal

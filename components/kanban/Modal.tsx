import React, { ChangeEvent } from 'react';
import Calendar from './calendar/Calendar2';
import { useState,useEffect } from 'react';
import { useKanban } from '../context/Kanbancontext';
import { UserQuestionDTO } from '../types';


const Modal = ({ isOpen, closeModal, cardData,updatefunction,calendar }:any) => {

  const {update} = useKanban()
  const [calendaropen,setCalendar] = useState<boolean>(false)
  const [currprops, setModalData] = useState<UserQuestionDTO >(cardData);
  



  useEffect(() => {
    // Use the useEffect hook to update currprops when cardData changes
    setModalData(cardData);
  }, [cardData]);

  const handleAttributeChange = (attribute: string, value: any) => {
    console.log(attribute,value)
    setModalData((prevData: UserQuestionDTO) => ({
      ...prevData,
      [attribute]: value,
    }) as UserQuestionDTO);
  };
  
  function handleCalendarClick() {
    setCalendar(!calendaropen)
  }
  const handleTimeRangeSelection = (timeRange:string) => {
    handleAttributeChange("timeTaken", timeRange); // Update the "timeTaken" attribute
  };


  const handleDateSelection = (date:string) => {
    handleAttributeChange("date", date);
    setCalendar(!calendaropen)
  }


  const handledeletecard = async () => {
    try {
      await handleDelete();
      if (calendar) {
        update()
      } else {
        // Use the updatefunction passed in as a prop
        updatefunction();

      }


    } catch (error) {
      // Handle any errors that may occur during deletion or update
      console.error('Error during deletion or update:', error);
    }
    closeModal()
  };

  const handleDelete = async () => {
    try {
      // Send a DELETE request to delete the data
      const response = await fetch(`/api/userquestions/delete?id=${currprops.id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Handle the response, e.g., show a success message
        console.log('Data deleted successfully');
      } else {
        // Handle errors if the response is not OK
        console.error('Error deleting data:', response.statusText);
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error deleting data:', error);
    }
  };


  const handleClose = async () => {
    try {
      // Send a PUT request to update the data
      const response = await fetch(`/api/userquestions/update?id=${currprops.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currprops),
      });
  
      if (response.ok) {
        // Handle the response, e.g., show a success message
        console.log('Data updated successfully');
  
        // After a successful update, you can call the update function
        updatefunction();
  
        // Close the modal
        closeModal();
      } else {
        // Handle errors if the response is not OK
        console.error('Error updating data:', response.statusText);
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error updating data:', error);
    }
  };
  


  
  return (
    <>
    <div className={`${isOpen? 'z-20' : 'hidden'}`}>
<div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true"></div>
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div id="authentication-modal" className=" bg-white rounded-lg shadow text-sm w-[600px]">  

                        <div className="px-6 py-4  rounded-t text-gray-400">
                            <h3 className="text-base font-semibold text-gray-600 lg:text-xl  mb-5">
                                {currprops.questionId + ' . ' + currprops.title}
                            </h3>
                            <div className='flex flex-col gap-5'>
                            <div className='flex solved'>
                              <div className='flex gap-5 items-center w-1/2'>
                                <div className='logo'><svg xmlns="http://www.w3.org/2000/svg" className = "w-5 h-5" width="512" height="512" viewBox="0 0 512 512"><path fill="currentColor" d="m199.066 456l-7.379-7.514l-3.94-3.9l-86.2-86.2l.053-.055l-83.664-83.666l97.614-97.613l83.565 83.565L398.388 61.344L496 158.958L296.729 358.229l-11.26 11.371ZM146.6 358.183l52.459 52.46l.1-.1l.054.054l52.311-52.311l11.259-11.368l187.963-187.96l-52.358-52.358l-199.273 199.271l-83.565-83.565l-52.359 52.359l83.464 83.463Z"/></svg></div>
                                <div className=''>Solved</div>
                              </div>
                              <div className="flex items-center rounded pl-1 ">
                                  <input
                                    id="bordered-checkbox-1"
                                    type="checkbox"
                                    value=""
                                    name="bordered-checkbox"
                                    className="w-4 h-4 text-green-400 bg-gray-100 border-gray-300 rounded   outline-none hover:shadow-lg"
                                    onChange={(e) => handleAttributeChange("completionStatus", e.target.checked)}
                                    checked={currprops.completionStatus}
                                  />
                                </div>
                            </div>
                            <div className='flex difficulty'>
                              <div className='flex gap-5 items-center w-1/2'>
                                <div className='logo'><svg xmlns="http://www.w3.org/2000/svg" className = "w-5 h-5"width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z"/></svg></div>
                                <div className=''>Difficulty</div>
                              </div>
                              <div className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getColorClasses(currprops.difficulty)}`}>{currprops.difficulty}</div>

                            </div>
                            <div className='flex topics'>
                              <div className='flex gap-5 items-center w-1/2'>
                                <div className='logo'><svg xmlns="http://www.w3.org/2000/svg" className = "w-5 h-5" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h3a1 1 0 0 0 1-1V5a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-1a2 2 0 0 0-4 0v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a2 2 0 0 0 0-4H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1"/></svg></div>
                                <div className=''>Topics</div>
                              </div>
                              <div className={`flex  flex-wrap gap-2  w-1/2 text-xs`}> 
                              {currprops.topicTags.map((topic:any, index:any) => (
                                        <span
                                          key={index}
                                          className={`px-2  text-xs leading-5 font-semibold rounded-full bg-gray-100 ${topic}`}
                                        >
                                          {topic}
                                        </span>
                                      ))}
                              </div>
                            </div>
                            <div className='flex '>
        <div className='flex gap-5 items-center w-1/2'>
          <div className='logo'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10Zm0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16Zm1-8h4v2h-6V7h2v5Z"
              />
            </svg>
          </div>
          <div className=''>Time Taken</div>
        </div>
        <div className="flex  flex-wrap gap-2  w-1/2 text-xs">
        <button
            className={`${ 
              currprops.timeTaken === '' ? 'bg-gray-50 border font-semibold' : 'bg-gray-200'
            } rounded px-2 py-1 `}
            onClick={() => handleTimeRangeSelection('')}
          >
            Not solved
          </button>
          <button
            className={`${ 
              currprops.timeTaken === '0-15' ? 'bg-gray-50 border font-semibold' : 'bg-gray-200'
            } rounded px-2 py-1 `}
            onClick={() => handleTimeRangeSelection('0-15')}
          >
            0-15 mins
          </button>
          <button
            className={`${
              currprops.timeTaken === '15-30' ? 'bg-gray-50 border font-semibold' : 'bg-gray-200'
            } rounded px-2 py-1  `}
            onClick={() => handleTimeRangeSelection('15-30')}
          >
            15-30 mins
          </button>
          <button
            className={`${
              currprops.timeTaken === '30-45' ? 'bg-gray-50 border font-semibold' : 'bg-gray-200'
            } rounded px-2 py-1   `}
            onClick={() => handleTimeRangeSelection('30-45')}
          >
            30-45 mins
          </button>
          <button
            className={`${
              currprops.timeTaken === '45-60' ? 'bg-gray-50 border font-semibold' : 'bg-gray-200'
            } rounded px-2 py-1  `}
            onClick={() => handleTimeRangeSelection('45-60')}
          >
            45-60 mins
          </button>

        </div>
    </div>
                            <div className='flex'>
                              <div className='flex gap-5 items-center w-1/2'>
                                <div className='logo'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12h5v5h-5v-5m7-9h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 2v2H5V5h14M5 19V9h14v10H5Z"/></svg></div>
                                <div className=''>Date</div>
                              </div>
                              <div className='p-2 hover:bg-gray-100 rounded-sm' onClick={handleCalendarClick} >{extractIsoDate(currprops.date)}
                              {calendaropen && <Calendar handleDateClick = {handleDateSelection} value = {extractIsoDate(currprops.date)}/>}
                              </div>


                            </div>
                            <div className='border'></div>
                            <div className='flex'>
                              <div className='flex gap-5 items-center w-1/2'>
                                <div className='logo'><svg xmlns="http://www.w3.org/2000/svg" className = "w-5 h-5" width="16" height="16" viewBox="0 0 16 16"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.75 1.75h10.5v12.5H2.75zm3 6h4.5m-4.5 3h2.5m-2.5-6h4.5"/></svg></div>
                                <div className=''>Code/Notes</div>
                              </div>
                            </div>
                            <div className="p-2 codesegment">
                                  <textarea
                                    className="py-3 px-4 w-full rounded-md text-sm h-[300px] focus:border-gray-300 focus:border resize-none focus:ring-0"
                                    value={currprops.notes}
                                    onChange={(e) => handleAttributeChange("notes", e.target.value)}
                                    style={{ outline: 'none' }}
                                  />
                                </div>
                                </div>
                                <div className='flex justify-center mt-3'>
                                <div className='delete section '>
                                  <button className='flex items-center hover:bg-gray-200 rounded p-2 mx-auto' onClick={handledeletecard}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12M8 9h8v10H8V9m7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5Z"/></svg>

                                  <span className='  text-gray-400 '>
                                    Delete </span></button>   </div>
                                    <div className='delete section '>
                                  <button className='flex items-center hover:bg-gray-200 rounded p-2 mx-auto' onClick={handleClose} >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6.414A2 2 0 0 0 19.414 5L17 2.586A2 2 0 0 0 15.586 2H6Zm0 2h9.586L18 6.414V20H6V4Zm10.238 6.793a1 1 0 1 0-1.414-1.414l-4.242 4.242l-1.415-1.414a1 1 0 0 0-1.414 1.414l2.05 2.051a1.1 1.1 0 0 0 1.556 0l4.88-4.879Z"/></g></svg>

                                  <span className='  text-gray-400 '>
                                    Done </span></button>   </div>
                        </div>

                        </div>
                    </div>
                </div>
            </div>

</div>
</>
  );
};



export default Modal;


function getColorClasses(difficulty : String) {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Hard':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return ''; 
  }
}



function extractIsoDate(dateString:string) {
  const dateObject = new Date(dateString);
  const isoDate = dateObject.toISOString().split('T')[0];
  return isoDate;
}



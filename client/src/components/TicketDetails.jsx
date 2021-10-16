import React, { useState } from 'react';
import StatusDropDown from './StatusDropDown.jsx';
import axios from 'axios';
import API from './utils.jsx'

const TicketDetails = ({ activeTicket, ticketStatusChoices, getProjectList }) => {

  const [ notesClicked, toggleNotesClicked ] = useState(false);
  const [ notesUpdated, toggleNotesUpdated ] = useState(false);
  const [ descriptionClicked, toggleDescriptionClicked ] = useState(false);
  const [ descriptionUpdated, toggleDescriptionUpdated ] = useState(false);
  const [ ticketDescription, setTicketDescription ] = useState(activeTicket.description)
  const [ ticketNotes, setTicketNotes ] = useState(activeTicket.notes);
  const [ className, setClassName] = useState(activeTicket.status)

  let newClassName = className;
  if (newClassName === 'in progress') newClassName = 'in-progress'

  const handleNotesClick = () => {
    toggleNotesClicked(true);
  }

  const handleSubmitDescriptionClick = async () => {
    await API.updateTicketDescription(activeTicket._id, ticketDescription);
    toggleDescriptionClicked(false);
    toggleDescriptionUpdated(false);
    getProjectList();
  }

  const handleDescriptionClicked = () => {
    toggleDescriptionClicked(true);
  }

  const handleDescriptionChanged = (e) => {
    toggleDescriptionUpdated(true);
    if (e.target.value === activeTicket.description) toggleDescriptionUpdated(false);
    setTicketDescription(e.target.value)
  }

  const handleTicketStatusUpdate = async (ticketId, newStatus) => {
    await API.updateTicketStatus(ticketId, newStatus);
    getProjectList();
    setClassName(newStatus);
  }

  const handleNotesInput = (e) => {
    if (!notesUpdated) toggleNotesUpdated(true);
    setTicketNotes(e.target.value);
  }

  const handleSubmitNotesClick = async () => {
    await API.updateTicketNotes(activeTicket._id, ticketNotes);
    toggleNotesClicked(false);
    toggleNotesUpdated(false);
    getProjectList();
  }

  const handleNotesCancelButtonClick = () => {
    setTicketNotes(activeTicket.notes)
    toggleNotesClicked(false);
    toggleNotesUpdated(false);
  }

  const handleDescriptionCancelButtonClick = () => {
    setTicketDescription(activeTicket.description)
    toggleDescriptionClicked(false);
    toggleDescriptionUpdated(false);
  }

  return (
    <div id="ticket-details">
      <table>
        <tbody>
          <tr>
            <td>Description:</td>
            {!descriptionClicked &&
              <td onClick={handleDescriptionClicked}>{ticketDescription}</td>
            }
            {descriptionClicked &&
              <td>
                <form>
                  <div>
                    <input id="description-input" type="text" onChange={handleDescriptionChanged} defaultValue={ticketDescription}></input>
                  </div>
                  <div>
                    {descriptionUpdated &&
                      <button onClick={handleSubmitDescriptionClick} type="button" className="button submit-button">Submit</button>
                    }
                    <button type="button" className="button cancel-button" onClick={handleDescriptionCancelButtonClick}>Cancel</button>
                  </div>
                </form>
              </td>
            }
          </tr>
          <tr>
            <td>Status:</td>
            <td>
              <select
                className={newClassName}
                defaultValue={activeTicket.status}
                onChange={(e) => handleTicketStatusUpdate(activeTicket._id, e.target.value)}
              >
                <StatusDropDown ticketStatusChoices={ticketStatusChoices}/>
              </select>
            </td>
          </tr>
          <tr>
            <td>Notes:</td>
            {!notesClicked &&
              <td className="ticket-notes" onClick={handleNotesClick}>
                {!ticketNotes &&
                  <p className="click-to-add">Click to add notes...</p>
                }
                {ticketNotes &&
                <pre>
                  {ticketNotes}
                </pre>
                }
                </td>
            }
            {notesClicked &&
              <td>
                <form>
                  <textarea onChange={handleNotesInput} rows="25" defaultValue={ticketNotes}></textarea>
                    <div>
                      {notesUpdated &&
                        <button type="button" className="submit-button" onClick={handleSubmitNotesClick}>Submit</button>
                      }
                      <button
                        type="button"
                        className="cancel-button"
                        onClick={handleNotesCancelButtonClick}
                      >Cancel
                      </button>
                    </div>
                </form>
              </td>
            }
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TicketDetails;

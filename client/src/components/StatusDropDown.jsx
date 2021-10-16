import React from 'react';

const StatusDropDown = ({ ticketStatusChoices }) => {
  const statusDropDown = ticketStatusChoices.map(choice => {
    return <option key={choice} value={choice}>{choice}</option>
  })

  return statusDropDown;
}


export default StatusDropDown;

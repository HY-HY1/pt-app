import React from 'react'

interface InfoTypes {
  label: string,
  field: string,
  action: any
}

const AccountInfoCard = ( props  : InfoTypes) => {
  return (
    <div className="w-full h-20 p-2 grid grid-cols-2 items-center  border-b">
      <div className='w-full'>
        <p>{props.label}</p>
        <p>{props.field}</p>
      </div>
      <div className='w-full flex justify-end items-center'>
        <span className=''>{props.action}</span>
      </div>
    </div>
  );
}

export default AccountInfoCard
'use client'
import React from 'react'
import {TextField,TextArea,Button} from '@radix-ui/themes'

const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-3'>
       <TextField.Root placeholder="Whats the issue">
      </TextField.Root>   
      <TextArea placeholder="Describe Issue" />
      <Button>Submit New Issue</Button>
    </div>
  )
}

export default NewIssuePage
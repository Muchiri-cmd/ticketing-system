'use client'
import React from 'react'
import {TextField,Button} from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css"
import { useForm,Controller } from 'react-hook-form'
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm {
  title:string;
  description:string;
}

const NewIssuePage = () => {  
  const router = useRouter()
  const {register,control,handleSubmit} = useForm<IssueForm>();
  console.log(register('title'))


  return (
    <form className='max-w-xl space-y-3' onSubmit={handleSubmit(async (data) => {
      await axios.post('/api/issues', data)
      router.push('/issues')
    })}>
        <p>Submit a ticket with a title and a description </p>
       <TextField.Root placeholder="Whats the issue" {...register('title')}>
      </TextField.Root> 
      <Controller
        name='description'
        control={control}
        render={({ field }) => 
          <SimpleMDE
              value={field.value}  
              placeholder="Describe the issue"
              onChange={field.onChange} 
          />
      }
      >  
      </Controller>  
      <Button>Submit New Issue</Button>
    </form>
  )
}

export default NewIssuePage
'use client'
import React from 'react'
import {TextField,Button,Callout} from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css"
import { useForm,Controller } from 'react-hook-form'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface IssueForm {
  title:string;
  description:string;
}

const NewIssuePage = () => {  
  const router = useRouter()
  const {register,control,handleSubmit} = useForm<IssueForm>();
  const [error,setError] = useState('')
 
  return (
    <>
      {error && 
        <Callout.Root color="red" className='max-w-xl mb-5'>
        <Callout.Text>
          {error}
        </Callout.Text>
      </Callout.Root>
      
      }
      <form className='max-w-xl space-y-3' onSubmit={handleSubmit(async (data) => {
        try {
          await axios.post('/api/issues', data)
          router.push('/issues')
        } catch(e){
          setError('Oooops,an unexpected error occured. Please try again.')
        }
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
    </>
   
  )
}

export default NewIssuePage
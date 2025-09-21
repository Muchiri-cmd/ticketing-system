'use client'
import React from 'react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import { useState,useEffect } from 'react'
import axios from 'axios'


interface Issue {
  id: number;
  title: string;
  createdAt: string;
}

const IssuesPage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
 
  useEffect(() => {
    const fetchIssues = async () => {
    try {
      const response = await axios.get('/api/issues')
      console.log("Response",response.data)
      setIssues(response.data)
    } catch (e) {
      console.error('Error fetching issues', e)
    }}

    fetchIssues();
  },[])

  return (
    <>
      <h1 className='text-2xl font-bold mb-5'>All Issues</h1>
      <table>
        <thead>
          <tr>
            <th className='text-left p-2 border-b'>Title</th>
            <th className='text-left p-2 border-b'>Created At</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue:Issue) => (
            <tr key={issue.id}>
              <td className='p-2 border-b'>
                <Link href={`/issues/${issue.id}`} className='text-blue-600 hover:underline'>
                  {issue.title}
                </Link>
              </td>
              <td className='p-2 border-b'>{new Date(issue.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button>
        <Link href='/issues/new'>
          New Issue
        </Link>
      </Button>
    </>
   
  )
}

export default IssuesPage
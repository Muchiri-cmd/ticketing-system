'use client'
import axios from 'axios'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'

interface IssueDetailsProps {
  id: string;
  title: string;
  description: string;
  status:string;
}

const IssueDetails = ({ params }: { params: { id: string } }) => {
  const [issue, setIssue] = React.useState<IssueDetailsProps | null>(null);
  
  const router = useRouter();

  useEffect(() => {
    const fetchIssueDetails = async () => {
      try {
        const response = await axios.get(`/api/issues/${params.id}`);
        setIssue(response.data);
      } catch (error) {
        console.error('There was an error fetching the issue details!', error);
      }
    }
    fetchIssueDetails();
  }, []);

  const handleDeleteIssue = async (id:number) => {
    try {
      const res = await axios.delete(`/api/issues/${id}`);

      if (res.status === 200) {
        router.push("/");      
        router.refresh();     
      }
    } catch (err: any) {
      console.error("Error deleting issue:", err);
      alert(err.response?.data?.message || "Failed to delete issue");
    }
  };

  return (
    <div>
      <h1>Issue Details</h1>
      {issue ? (
        <div>
          <h2>{issue.title}</h2>
          <p>{issue.description}</p>
          <p>Status: {issue.status}</p>
          <Button color='red'
            onClick={() => handleDeleteIssue(Number(issue.id))}
          >
            <Link href='/'>Delete Issue</Link>
          </Button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default IssueDetails
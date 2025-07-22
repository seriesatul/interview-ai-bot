import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { dummyInterviews } from '../../constants'
import InterviewCard from '../components/InterviewCard'
import { getInterviewByUserId } from '@/lib/actions/auth.action'
import { getCurrentuser } from '@/lib/actions/auth.action'
import { getLatestInterviews } from '@/lib/actions/auth.action'

const page = async () => {

  const user = await getCurrentuser();

  const [userInterviews, latestInterviews] = await Promise.all([
    getInterviewByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! })
  ]);

  const hasPastInterviews = (userInterviews?.length ?? 0) > 0;
  const hasUpcomingInterviews = (latestInterviews?.length ?? 0) > 0;

  return (
    <>
    <section className='card-cta'>
      <div className='flex flex-col gap-6 max-w-lg'>
        <h2>We Don&apos;t Just Help You Prepare — We Make Sure You&apos;re Ready.</h2>
        <p className='text-lg'>From Topic to Interview — Your <span className='text-primary-200'>PrepMate</span> Has You Covered.</p>
        <Button asChild className='btn-primary max-sm:w-full'>
          <Link href="/interview">Start an Interview</Link>
        </Button>
      </div>
      <Image src="/robot.png" alt="robot-dude" width={400} height={400} className='max-sm:hidden'/>
    </section>

    <section className='flex flex-col gap-6 mt-8'>
      <h2>Your Interviews</h2>

      <div className='interview-section flex flex-row gap-4 flex-wrap'>

       {
          hasPastInterviews ? (userInterviews ?? []).map((interview) => (
            <InterviewCard {...interview} type={interview.type ?? 'General'} key={interview.id} />
          )) : <p>You haven&apos;t taken any interviews yet</p>
}

        {/* <p>You haven&apos;t taken any interviews yet</p> */}
      </div>

    </section>

    <section className='flex flex-col gap-6 mt-8 '> 
      <h2>Your Courses</h2>
      <div className='w-full flex flex-row gap-4 mb-10'>
         {
          hasUpcomingInterviews ? (latestInterviews ?? []).map((interview) => (
            <InterviewCard {...interview} type={interview.type ?? 'General'} key={interview.id} />
          )) : <p>There are No Interview yet</p>
}

      </div>
      <div className='interviews-section'>
        <p>There are no interviews available</p>
      </div>
      </section>


    </>
  )
}

export default page
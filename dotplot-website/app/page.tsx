"use client";

import Typography from '@/app/components/typography'
import Image from 'next/image'
import Feature from '@/app/components/feature'
import { ArrowUpDown, Timer, Workflow } from 'lucide-react'
import Link from 'next/link'
import Redirect from './lib/Redirect'
import './globals.css'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs'

export default function Home() {
    const router = useRouter();
    const { isLoaded, isSignedIn } = useUser();
  
    useEffect(() => {
      if (isLoaded && isSignedIn) {
        router.push('/dashboard');
      }
    }, [isLoaded, isSignedIn, router]);

  return (
    <div
      className="flex flex-col h-full md:py-36 md:px-32 pt-11 pb-24 px-8 w-full
         items-center text-center gap-12"
    >
      <div className="flex flex-col gap-6 items-center w-full">
        <Typography className="max-w-2xl" variant="h1">
          Vital data when it matters most
        </Typography>
        <Typography className="max-w-2xl" variant="h5">
        Quickly add, find, and update patient records with accurate 3D tumor models 
          for effective emergency response.
        </Typography>
        <Link
          href="/signup"
          target="_blank"
        >
          <button className='btn bg-secondary text-primary'>
            {`Get Started`}
          </button>
        </Link>
        <Image
          className='rounded-2xl'
          width={1024}
          height={632}
          alt="tt.dev hero image"
          src="/Green_tt.png"
        />
      </div>
      <div className="flex flex-col md:pt-24 md:gap-36 gap-24 items-center w-full md:w-4/5">
    <div className="flex flex-col gap-12 items-center w-full">

          <Typography className="max-w-2xl" variant="h1">
            Quick solutions, less stress
          </Typography>
          <div className="flex md:flex-row flex-col gap-20 ">
            <Feature
              icon={<Timer size={24} />}
              headline="Fix emergencies fast" 
              description="Save 10-20 minutes per patient - no more searching through paper records or outdated systems"
            />
            <Feature
              icon={<ArrowUpDown size={24} />}
              headline= "Universally compatible"
              description="Works with PagerDuty, Jira, or custom Slack alerts—Pandem integrates with any system"
            />
            <Feature
              icon={<Workflow size={24} />}
              headline="Secure and reliable"
              description="We keep your data safe by taking top security measures."
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 max-w-4xl items-center">
          <Typography className="max-w-2xl" variant="h1">
            About us
          </Typography>
          <div>
          At TumorTracker, we specialize in developing advanced 3D models tailored 
          for healthcare professionals, providing detailed and intuitive visualizations 
          of patient data. Our innovative solutions enable doctors to effortlessly access 
          and interpret patient information by simply searching for their names, enhancing 
          diagnostic accuracy and improving patient care.
          </div>
        </div>
        <div className="flex flex-col gap-6 items-center">
          <Typography className="max-w-2xl" variant="h1">
            Get in touch
          </Typography>
          <div>Book a demo, or hop on a call</div>
          <Link
            href="https://dotplot.co/"
            target="_blank"
          >
            <button className='btn bg-secondary text-primary'>
              {`Book now`}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

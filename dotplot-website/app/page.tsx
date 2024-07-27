import Typography from '@/app/components/typography'
import Image from 'next/image'
import Feature from '@/app/components/feature'
import { ArrowUpDown, Timer, Workflow } from 'lucide-react'
import Link from 'next/link'
import './globals.css'

export default function Home() {
  return (
    <div
      className="flex flex-col h-full md:py-36 md:px-32 pt-11 pb-24 px-8
        w-full items-center text-center gap-12"
    >
      <div className="flex flex-col gap-6 items-center">
        <Typography className="max-w-2xl" variant="h1">
          Vital data when it matters most
        </Typography>
        <Typography className="max-w-2xl" variant="h5">
        Quickly find, update, and retrieve patient records with accurate 3D tumor models 
          for effective emergency response.
        </Typography>
        <Link
          href="https://map.sistilli.dev/public/coding/SaaS+Boilerplate"
          target="_blank"
        >
          <button className='btn bg-secondary text-primary'>
            {`Get Started`}
          </button>
        </Link>
        <Image
          width={1024}
          height={632}
          alt="/hero_tt.jpg "
          src="/hero_tt.jpg"
        />
      </div>
      <div className="flex flex-col md:pt-24 md:gap-36 gap-24 items-center">
        <div className="flex flex-col gap-12 items-center" >
          <Typography className="max-w-2xl" variant="h1">
            Quick solutions, less stress
          </Typography>
          <div className="flex md:flex-row flex-col gap-12" >
            <Feature
              icon={<Timer size={24} />}
              headline="Fix emergencies fast" 
              description="Save 20-30 minutes per on-call ticket - no more searching for relevant issues and runbooks"
            />
            <Feature
              icon={<ArrowUpDown size={24} />}
              headline= "Universally compatible"
              description="Works with PagerDuty, Jira, or custom Slack alerts—Pandem integrates with any system"
            />
            <Feature
              icon={<Workflow size={24} />}
              headline="Secure for your org"
              description="We keep your data safe by taking top security measures."
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 max-w-2xl items-center">
          <Typography className="max-w-2xl" variant="h1">
            Instant setup, no custom code
          </Typography>
          <Typography className="max-w-2xl" variant="p">
            Quickly link new on-call tickets to similar past
            incidents and their solutions. All directly in
            Slack the moment an incident happens.
          </Typography>
          <Image
            width={1024}
            height={632}
            alt="Pandem.dev hero image"
            src="/tt_aboutUs.png"
          />
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

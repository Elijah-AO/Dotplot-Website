'use client'
import Link from 'next/link'
import Typography from '@/app/components/typography'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="flex h-12 items-center justify-center w-full border-t">
      <div className="w-full max-w-full md:px-8 px-4 flex place-content-center">
        <div className="gap-x-11 md:flex flex-1 hidden">
          <Link
            href="/"
            className="pointer flex items-center"
          >
            <Image
                className='rounded-full'
                src="/tt_logo.png"
                alt="Dotplot Logo"
                width={30}
                height={30}
            />
            <Typography className="!text-white !text-base font-medium ">
              TumorTracker
            </Typography>
          </Link>
        </div>
        <div className="flex max-w-fit items-center gap-x-4">
          <Link
            href="https://dotplot.co"
            target="_blank"
            className="pointer block w-fit flex-1"
          >
            <Typography variant="p" className="w-max">
              Book a demo
            </Typography>
          </Link>
          <Link
            href="/dotplot.co"
            className="pointer block w-fit flex-1"
          >
            <Typography variant="p" className="w-max">
              Terms of service
            </Typography>
          </Link>
          <Link
            href="/dotplot.co"
            className="pointer block w-fit"
          >
            <Typography variant="p">
              Privacy Policy
            </Typography>
          </Link>
        </div>
      </div>
    </footer>
  )
}

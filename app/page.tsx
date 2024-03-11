'use client'
import { unstable_noStore as noStore } from 'next/cache'
import dynamic from 'next/dynamic'
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import CalculateTime from "./components/CalculateTime";
import Spinner from './components/Spinner';
const Clock = dynamic(() => import('react-live-clock'), { ssr: false })

export default function Home() {
  noStore();
  const session = useSession()
  const router = useRouter()


  if (session.status === 'loading') {
    return (<Spinner />)
  }


  if (session.status === 'unauthenticated') {
    return router.push('/login')
  }

  let date = new Date().toLocaleDateString("fa-IR-u-nu-latn");
  const d = new Date();
  let day = d.getDay();

  function farsiDay(day: number) {
    if (day === 1) {
      return "دوشنبه";
    }
    if (day === 2) {
      return "سه شنبه";
    }
    if (day === 3) {
      return "چهارشنبه";
    }
    if (day === 4) {
      return "پنج شنبه";
    }
    if (day === 5) {
      return "جمعه";
    }
    if (day === 6) {
      return "شنبه";
    }
    if (day === 0) {
      return "یکشنبه";
    }
  }

  return (
    <div className="container p-4 mx-auto">
      <p className='text-slate-300 text-[13px] IRANSansBold'>{farsiDay(day)} {date} -  <Clock className='IRANSansBold' format={'HH:mm:ss'} ticking={true} />
      </p>
      <div className="flex justify-center items-center">
        <CalculateTime />
      </div>
    </div>
  );
}

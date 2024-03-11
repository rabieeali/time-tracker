'use client';

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginForm() {


    const GmailLogo = () => {
        return (
            <>
                <Image src={'gmail.svg'} alt="gmail-logo" width={25} height={25} />
            </>
        )
    }

    return (
        <div className="glass w-[320px] h-[300px] px-3 mt-10 flex flex-col justify-center items-center gap-7">
            <p className="text-[14px] text-center">برای استفاده از سیستم Time Tracker ابتدا با اکانت Gmail خود لاگین کنید</p>
            <strong className="text-[14px] text-center">ما هیچگونه ایمیل تبلیغاتی برای شما نخواهیم فرستاد</strong>
            <button className="flex justify-center items-center gap-4 bg-white text-red-500 hover:bg-red-100 transition font-semibold px-4 py-2 rounded-md" onClick={() => signIn('google', { callbackUrl: '/' })}>
                ورود با 
                <GmailLogo />
            </button>
        </div>
    )
}

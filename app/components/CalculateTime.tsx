'use client';

import { useEffect, useState } from "react";
const HR_REGEX = /^([01][0-9]|2[0-3])$/
const MIN_REGEX = /^([0-5][0-9])$/

export default function CalculateTime() {
    const [hr, setHr] = useState('')
    const [min, setMin] = useState('')
    const [isValid, setIsValid] = useState(false)
    const [isRange, setIsRange] = useState(false)
    const [leaveTime, setLeaveTime] = useState('')

    const calculateLeaveTime = (hr: string, min: string) => {
        const totalEntranceMinutes = (+hr * 60) + (+min);
        const fixedWorkingTime = 9 * 60 + 20;
        const totalLeaveMinutes = totalEntranceMinutes + fixedWorkingTime;

        const leaveHours = Math.floor(totalLeaveMinutes / 60);
        const leaveMinutes = totalLeaveMinutes % 60;
        const leaveTime = `${String(leaveHours).padStart(2, '0')}:${String(leaveMinutes).padStart(2, '0')}`;

        return leaveTime;
    }

    const handleCalculate = () => {
        if (!HR_REGEX.test(hr) || !MIN_REGEX.test(min)) {
            return setIsValid(true)
        }

        if (['00', '01', '02', '03', '04', '05', '06', '07', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'].includes(hr)) {
            return setIsRange(true)
        }

        const leave = calculateLeaveTime(hr, min)

        return setLeaveTime(leave)
    }

    useEffect(() => {
        setIsValid(false)
        setIsRange(false)
    }, [hr, min])

    useEffect(() => {
        if (isValid || isRange) {
            setLeaveTime('')
        }
    }, [leaveTime, isValid, isRange])

    return (
        <div className="glass w-[320px] h-[300px] px-3 mt-10 pt-10 flex flex-col">
            <p className="IRANSansBold text-sm text-center my-5 pb-4">زمان ورود امروز را وارد کنید</p>
            <div className="flex justify-center items-center gap-4">
                <input value={min} onChange={e => setMin(e.target.value)} className="w-[60px] text-[13px] text-center p-1 rounded-md focus:outline-0" placeholder="دقیقه" />
                :
                <input value={hr} onChange={e => setHr(e.target.value)} className="w-[60px] text-[13px] text-center p-1 rounded-md focus:outline-0" placeholder="ساعت" />
            </div>
            <p className="text-red-600 text-[12px] text-center mt-4">{isValid && 'زمان بصورت ۲۴ ساعته مثل 08:45 نوشته شود'}</p>
            <p className="text-red-600 text-[12px] text-center mt-4">{isRange && 'ساعت باید بین 08 تا 15 باشد'}</p>
            {leaveTime && <p className="flex justify-center items-baseline gap-2 IRANSansBold text-red-500 text-[18px] text-center py-5">
                <span className="text-[13px]">
                    زمان خروج شما
                </span>
                {leaveTime}
                <span className="text-[13px]">
                    می‌باشد
                </span>
            </p>}
            <button
                onClick={handleCalculate}
                className="text-[13px] block mx-auto mt-auto mb-5 gap-4 bg-blue-500 text-white hover:bg-blue-200 hover:text-blue-500 transition px-4 py-2 rounded-md">
                محاسبه زمان خروج
            </button>
        </div>
    )
}

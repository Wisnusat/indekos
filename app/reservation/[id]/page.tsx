'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { toast } from 'sonner'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { IRoom } from '@/app/room-list/page'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Loading from '@/components/ui/loading'

export default function ReservationPage() {
    const [room, setRoom] = useState<IRoom | null>(null)
    const [date, setDate] = useState<DateRange | undefined>()
    const router = useRouter()

    useEffect(() => {
        const storedRoom = localStorage.getItem('selectedRoom')
        if (storedRoom) {
            setRoom(JSON.parse(storedRoom))
        } else {
            router.push('/room-list')
        }
    }, [router])

    const calculateTotalPrice = () => {
        if (!date?.from || !date?.to || !room) return 0
        const days = Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 3600 * 24))
        return room.price * days
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!date?.from || !date?.to) {
            toast.error('Please select a date range')
            return
        }

        // Here you would typically send the reservation data to your backend
        // For now, we'll just simulate a successful reservation
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulating API call

        toast.success('Reservation successful!', {
            duration: 3000,
            onAutoClose: () => router.push('/room-list')
        })
    }

    if (!room) {
        return <Loading />
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/room-list">Room List</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/room/${room.id}`}>{room.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="#">Reservation</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-3xl font-bold mb-6 mt-4">Reserve Your Room</h1>
            <Card>
                <form onSubmit={onSubmit}>
                    <CardContent className="p-6 space-y-4">
                        <div>
                            <h2 className="text-2xl font-semibold">{room.name}</h2>
                            <p className="text-gray-600">{room.location}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Select your stay period
                            </label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date?.from ? (
                                            date.to ? (
                                                <>
                                                    {format(date.from, "LLL dd, y")} -{" "}
                                                    {format(date.to, "LLL dd, y")}
                                                </>
                                            ) : (
                                                format(date.from, "LLL dd, y")
                                            )
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        initialFocus
                                        mode="range"
                                        defaultMonth={date?.from}
                                        selected={date}
                                        onSelect={setDate}
                                        numberOfMonths={2}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Price Details</h3>
                            <p className="mb-2">Daily Rate: Rp {room.price.toLocaleString('id-ID')}</p>
                            <p className="mb-2">Total Days: {date?.from && date?.to ? Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 3600 * 24)) : 0}</p>
                            <p className="text-xl font-bold mt-2">
                                Total: Rp {calculateTotalPrice().toLocaleString('id-ID')}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Additional Information</h3>
                            <ul className="list-disc list-inside text-gray-600">
                                <li>Free cancellation up to 48 hours before check-in</li>
                                <li>Security deposit of Rp 500,000 required</li>
                                <li>Utilities included in the price</li>
                                <li>Monthly cleaning service available for an additional fee</li>
                            </ul>
                        </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50 p-6">
                        <Button type="submit" className="w-full bg-[#5046E5]">
                            Ajukan Sewa
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}


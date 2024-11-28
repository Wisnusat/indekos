'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, MapPin, Home, Users, Calendar, Wifi, Tv, ShirtIcon, CookingPot } from 'lucide-react'
import { IRoom } from '@/app/room-list/page'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Loading from '@/components/ui/loading'

export default function RoomDetailPage() {
    const [room, setRoom] = useState<IRoom | null>(null)
    const router = useRouter()

    const handleBookNow = () => {
        localStorage.setItem('selectedRoom', JSON.stringify(room))
        router.push(`/reservation/${room?.id || 0}`)
    }

    useEffect(() => {
        const storedRoom = localStorage.getItem('selectedRoom')
        if (storedRoom) {
            setRoom(JSON.parse(storedRoom))
        } else {
            router.push('/room-list')
        }
    }, [router])

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
                        <BreadcrumbLink href="#">{room.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-3xl font-bold mb-6 mt-4">{room.name}</h1>

            <div className="w-full">
                <div className="flex gap-4 md:mb-2 mb-6 md:flex-row flex-col">
                    <img src={room.image} alt={room.name} className="w-full h-[400px] object-cover rounded-lg mb-6" />
                    <div className="md:w-[40%] w-full">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="text-2xl font-bold">
                                        Rp {room.price.toLocaleString('id-ID')} <span className="text-sm font-normal text-gray-500">/ month</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Star className="w-5 h-5 text-yellow-400 mr-1" />
                                        <span className="font-semibold">{room.rating}</span>
                                    </div>
                                </div>

                                <Separator className="my-4" />

                                <div className="space-y-4 mb-6">
                                    <div className="flex items-center">
                                        <MapPin className="w-5 h-5 mr-2" />
                                        <span>{room.location}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Home className="w-5 h-5 mr-2" />
                                        <span>{room.type}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Users className="w-5 h-5 mr-2" />
                                        <span>Max 2 guests</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="w-5 h-5 mr-2" />
                                        <span>Minimum stay: 1 month</span>
                                    </div>
                                </div>

                                <Button variant="default" className='bg-indigo-600 w-full mb-4' onClick={handleBookNow}>Book Now</Button>
                                <Button variant="outline" className="w-full">Contact Host</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <Card>
                    <CardContent className="p-6">
                        <h2 className="text-2xl font-semibold mb-4">About this space</h2>
                        <p className="text-gray-600 mb-4">
                            This {room.type} is located in the heart of {room.location}. It offers a comfortable living space with modern amenities and easy access to local attractions.
                        </p>

                        <Separator className="my-6" />

                        <h3 className="text-xl font-semibold mb-4">What this place offers</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center">
                                <Wifi className="w-5 h-5 mr-2" />
                                <span>Free WiFi</span>
                            </div>
                            <div className="flex items-center">
                                <Tv className="w-5 h-5 mr-2" />
                                <span>TV</span>
                            </div>
                            <div className="flex items-center">
                                <ShirtIcon className="w-5 h-5 mr-2" />
                                <span>Laundry facilities</span>
                            </div>
                            <div className="flex items-center">
                                <CookingPot className="w-5 h-5 mr-2" />
                                <span>Kitchen</span>
                            </div>
                        </div>

                        <Separator className="my-6" />

                        <h3 className="text-xl font-semibold mb-4">Location</h3>
                        <div className="aspect-video w-full mb-6">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.320270923128!2d107.62848277414226!3d-6.9714907682613045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e9adaf2f99a3%3A0xaefd20f00bdb096d!2sTelkom%20University%20Convention%20Hall!5e0!3m2!1sen!2sid!4v1732744891995!5m2!1sen!2sid" width="100%" height="100%" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}


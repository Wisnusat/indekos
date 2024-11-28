'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star, MapPin, Bookmark } from 'lucide-react'
import { toast } from 'sonner'
import { IRoom } from '../room-list/page'

const rooms = [
    {
        id: 1,
        name: "Cozy Studio in Downtown",
        image: "/placeholder.svg?height=200&width=300",
        price: 500000,
        rating: 4.5,
        location: "Jakarta Pusat",
        type: "Studio"
    },
    {
        id: 2,
        name: "Spacious 2BR Apartment",
        image: "/placeholder.svg?height=200&width=300",
        price: 800000,
        rating: 4.8,
        location: "Bandung",
        type: "2BR"
    },
    {
        id: 3,
        name: "Modern Loft near University",
        image: "/placeholder.svg?height=200&width=300",
        price: 600000,
        rating: 4.2,
        location: "Yogyakarta",
        type: "Loft"
    },
    {
        id: 4,
        name: "Beachfront Bungalow",
        image: "/placeholder.svg?height=200&width=300",
        price: 1000000,
        rating: 4.9,
        location: "Bali",
        type: "Bungalow"
    },
    {
        id: 5,
        name: "City View Studio",
        image: "/placeholder.svg?height=200&width=300",
        price: 550000,
        rating: 4.3,
        location: "Surabaya",
        type: "Studio"
    },
    {
        id: 6,
        name: "Cozy 1BR near Mall",
        image: "/placeholder.svg?height=200&width=300",
        price: 700000,
        rating: 4.6,
        location: "Jakarta Selatan",
        type: "1BR"
    },
]

export default function BookmarksPage() {
    const [bookmarkedRooms, setBookmarkedRooms] = useState<number[]>([])
    const router = useRouter()

    useEffect(() => {
        const storedBookmarks = localStorage.getItem('bookmarkedRooms')
        if (storedBookmarks) {
            setBookmarkedRooms(JSON.parse(storedBookmarks))
        }
    }, [])

    const handleViewDetails = (room: IRoom) => {
        localStorage.setItem('selectedRoom', JSON.stringify(room))
        router.push(`/room/${room.id}`)
    }

    const toggleBookmark = (roomId: number) => {
        const updatedBookmarks = bookmarkedRooms.filter(id => id !== roomId)
        setBookmarkedRooms(updatedBookmarks)
        localStorage.setItem('bookmarkedRooms', JSON.stringify(updatedBookmarks))
        toast.success('Room removed from bookmarks')
    }

    const bookmarkedRoomData = rooms.filter(room => bookmarkedRooms.includes(room.id))

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Your Bookmarked Rooms</h1>

            {bookmarkedRoomData.length === 0 ? (
                <div className="text-center text-gray-500">
                    <p>You haven't bookmarked any rooms yet.</p>
                    <Button className="mt-4 bg-indigo-600" onClick={() => router.push('/room-list')}>Explore Rooms</Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookmarkedRoomData.map(room => (
                        <Card key={room.id} className="overflow-hidden">
                            <div className="relative">
                                <img src={room.image} alt={room.name} className="w-full h-48 object-cover" />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-2 right-2 bg-white/50 hover:bg-white/75"
                                    onClick={() => toggleBookmark(room.id)}
                                >
                                    <Bookmark className={`w-8 h-8 ${bookmarkedRooms.includes(room.id) ? 'fill-indigo-600 text-indigo-600' : 'text-gray-600'}`} />
                                </Button>
                            </div>
                            <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h2 className="text-lg font-semibold">{room.name}</h2>
                                    <div className="flex items-center">
                                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                        <span>{room.rating}</span>
                                    </div>
                                </div>
                                <div className="flex items-center text-gray-500 mb-2">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    <span>{room.location}</span>
                                </div>
                                <div className="text-sm text-gray-500">{room.type}</div>
                            </CardContent>
                            <CardFooter className="p-4 border-t flex justify-between items-center">
                                <div className="text-lg font-bold">
                                    Rp {room.price.toLocaleString('id-ID')} <span className="text-sm font-normal text-gray-500">/ month</span>
                                </div>
                                <Button variant="default" className='bg-indigo-600' onClick={() => handleViewDetails(room)}>View Details</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}


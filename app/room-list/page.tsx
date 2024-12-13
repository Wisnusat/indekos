'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star, MapPin, Heart, Bookmark } from 'lucide-react'
import { toast } from 'sonner'
import axiosInstance from '@/lib/axios'
import Loading from '@/components/ui/loading'

export interface IRoom {
    id_kos: number;
    id_pemilik: number;
    nama_kos: string;
    harga_sewa: number;
    deskripsi: number;
    fasilitas: string;
    status_kos: string;
    alamat_kos: string;
}

export default function RoomListPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [bookmarkedRooms, setBookmarkedRooms] = useState<number[]>([])
    const [roomsData, setRoomData] = useState<IRoom[]>([])
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const router = useRouter()

    const filteredRooms = roomsData.filter(room =>
        room.nama_kos.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.alamat_kos.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.status_kos.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleViewDetails = (data: IRoom) => {
        localStorage.setItem('selectedRoom', JSON.stringify(data))
        router.push(`/room/${data.id_kos}`)
    }

    const toggleBookmark = (roomId: number) => {
        const updatedBookmarks = bookmarkedRooms.includes(roomId)
            ? bookmarkedRooms.filter(id => id !== roomId)
            : [...bookmarkedRooms, roomId]

        setBookmarkedRooms(updatedBookmarks)
        localStorage.setItem('bookmarkedRooms', JSON.stringify(updatedBookmarks))

        toast.success(
            bookmarkedRooms.includes(roomId) ? 'Room removed from bookmarks' : 'Room added to bookmarks'
        )
    }

    const fetchRoomData = async () => {
        setIsFetching(true)
        const response = await axiosInstance.get("/kos")
        if (response.status === 200) {
            setRoomData(response.data)
        } else {
            toast.error("Error fetching room data")
        }
        setIsFetching(false)
    }

    useEffect(() => {
        const storedBookmarks = localStorage.getItem('bookmarkedRooms')
        if (storedBookmarks) {
            setBookmarkedRooms(JSON.parse(storedBookmarks))
        }
    }, [])

    useEffect(() => {
        fetchRoomData()
    }, [])

    if (isFetching) return <Loading />

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Find Your Perfect Room</h1>

            {/* Search Bar */}
            <div className="mb-8 flex gap-4">
                <Input
                    type="text"
                    placeholder="Search by name, location, or room type"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow"
                />
                <Button>Search</Button>
            </div>

            {/* Room Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRooms.map(room => (
                    <Card key={room.id_kos} className="overflow-hidden">
                        <div className="relative">
                            <img src="https://images.unsplash.com/photo-1725399103001-200ce2bb5350?q=80&w=1370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt={room.nama_kos} className="w-full h-48 object-cover" />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 bg-white/50 hover:bg-white/75"
                                onClick={() => toggleBookmark(room.id_kos)}
                            >
                                <Bookmark className={`w-8 h-8 ${bookmarkedRooms.includes(room.id_kos) ? 'fill-indigo-600 text-indigo-600' : 'text-gray-600'}`} />
                            </Button>
                        </div>
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-lg font-semibold">{room.nama_kos}</h2>
                                <div className="flex items-center">
                                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                    <span>{(Math.random() * 5.0).toFixed(1)}</span>
                                </div>
                            </div>
                            <div className="flex items-center text-gray-500 mb-2">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span>{room.alamat_kos}</span>
                            </div>
                            <div className="text-sm text-gray-500">{room.status_kos}</div>
                        </CardContent>
                        <CardFooter className="p-4 border-t flex justify-between items-center">
                            <div className="text-lg font-bold">
                                Rp {room.harga_sewa.toLocaleString('id-ID')} <span className="text-sm font-normal text-gray-500">/ month</span>
                            </div>
                            <Button variant="default" className='bg-indigo-600' onClick={() => handleViewDetails(room)}>View Details</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}


'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, Mail, Phone, Share2, QrCode } from 'lucide-react'

// This type definition can be moved to a separate types file later
type UserProfile = {
  id_penyewa: number;
  nama: string;
  email: string;
  no_telepon: string;
  alamat: string;
  total_sewa: number;
  ulasan: number;
}

// Dummy data (replace this with actual data fetching logic later)
const dummyUserProfile: UserProfile = {
  id_penyewa: 9,
  nama: "Testing Wisnu",
  email: "testingwisnu@test.com",
  no_telepon: "08123456",
  alamat: "Jalan Raya No. 123, Jakarta Selatan",
  total_sewa: 5,
  ulasan: 4.7,
}

export default function ProfilePage() {
  const user = dummyUserProfile;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="">
          {/* Left column - User info */}
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="w-24 h-24 border-4 border-white -mt-12 shadow-lg">
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.nama}`} alt={user.nama} />
                <AvatarFallback>{user.nama.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-2xl">{user.nama}</CardTitle>
                <Badge variant={"default"}>Active</Badge>
              </div>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="info" className="w-full">
                <TabsList>
                  <TabsTrigger value="info">Info</TabsTrigger>
                  <TabsTrigger value="stats">Stats</TabsTrigger>
                </TabsList>
                <TabsContent value="info">
                  <dl className="space-y-4">
                    <div className="flex items-center">
                      <dt className="text-sm font-medium text-gray-500 w-24 flex items-center">
                        <Mail className="h-4 w-4 mr-2" /> Email
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                    </div>
                    <div className="flex items-center">
                      <dt className="text-sm font-medium text-gray-500 w-24 flex items-center">
                        <Phone className="h-4 w-4 mr-2" /> Telepon
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">{user.no_telepon}</dd>
                    </div>
                    <div className="flex items-center">
                      <dt className="text-sm font-medium text-gray-500 w-24 flex items-center">
                        <MapPin className="h-4 w-4 mr-2" /> Alamat
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">{user.alamat}</dd>
                    </div>
                  </dl>
                </TabsContent>
                <TabsContent value="stats">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Sewa</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{user.total_sewa}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rating Ulasan</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{user.ulasan.toFixed(1)}/5</div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


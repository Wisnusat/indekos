import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Calendar, Clock, CreditCard, Home, MapPin, Phone, User } from 'lucide-react'

export default function RequestDetailPage() {
  return (
    <div className="container mx-auto py-8 md:px-0 px-2">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Reservation Request Details</CardTitle>
            <CardDescription>Review tenant and booking information</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Room Information</h3>
                <div className="flex items-start gap-3">
                  <img
                    src="/placeholder.svg?height=200&width=200"
                    alt="Room"
                    className="w-full max-w-[200px] aspect-square object-cover rounded-lg"
                  />
                  <div className="space-y-2">
                    <div className="font-medium">Cozy Studio in Downtown</div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1" />
                      Jakarta Pusat
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Home className="w-4 h-4 mr-1" />
                      Studio
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Tenant Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>John Doe</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>+62 812-3456-7890</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    <span>KTP: 3171XXXXXXXXXX</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Booking Duration</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Jan 15, 2024 - Jul 15, 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>6 months</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Payment Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monthly Rent</span>
                    <span>Rp 500.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Security Deposit</span>
                    <span>Rp 500.000</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total Initial Payment</span>
                    <span>Rp 1.000.000</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 justify-end">
            <Button variant="outline">Reject</Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700">Approve</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}


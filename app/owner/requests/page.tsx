import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Calendar, Clock, MapPin, User } from 'lucide-react'

export default function RequestsPage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Reservation Requests</CardTitle>
          <CardDescription>
            Manage and review incoming reservation requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Room</TableHead>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request: any) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <img
                          src={request.roomImage}
                          alt={request.roomName}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <div className="font-medium">{request.roomName}</div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 mr-1" />
                            {request.location}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {request.tenantName}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Calendar className="w-4 h-4 mr-1" />
                          {request.startDate} - {request.endDate}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 mr-1" />
                          {request.duration} months
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          request?.status === "Pending"
                            ? "default"
                            : request.status === "Approved"
                            ? "outline"
                            : "destructive"
                        }
                      >
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end sm:justify-start">
                        <Button
                          variant="default"
                          size="sm"
                          className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto"
                          asChild
                        >
                          <a href={`/owner/requests/${request.id}`}>Review</a>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const requests = [
  {
    id: 1,
    roomName: "Cozy Studio in Downtown",
    roomImage: "/placeholder.svg?height=64&width=64",
    location: "Jakarta Pusat",
    tenantName: "John Doe",
    startDate: "2024-01-15",
    endDate: "2024-07-15",
    duration: 6,
    status: "Pending"
  },
  {
    id: 2,
    roomName: "Spacious 2BR Apartment",
    roomImage: "/placeholder.svg?height=64&width=64",
    location: "Bandung",
    tenantName: "Jane Smith",
    startDate: "2024-02-01",
    endDate: "2024-08-01",
    duration: 6,
    status: "Approved"
  },
]


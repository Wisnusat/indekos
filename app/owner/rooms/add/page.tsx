"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"
import Image from "next/image"
import { X } from 'lucide-react'

const formSchema = z.object({
  images: z.array(z.instanceof(File)).min(1, "At least one image is required"),
  name: z.string().min(2, {
    message: "Room name must be at least 2 characters.",
  }),
  type: z.string({
    required_error: "Please select a room type.",
  }),
  price: z.string().min(1, {
    message: "Price is required.",
  }),
  location: z.string().min(2, {
    message: "Location is required.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  facilities: z.string().min(2, {
    message: "Please list some facilities.",
  }),
})

export default function AddRoomPage() {
  const [imagePreviews, setImagePreviews] = useState<{ file: File; preview: string }[]>([])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      facilities: "",
      images: [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ ...values, imageCount: values.images.length })
  }

  const handleImageDelete = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
    const currentImages = form.getValues("images")
    form.setValue("images", currentImages.filter((_, i) => i !== index))
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Add New Room</CardTitle>
          <CardDescription>
            Enter the details of your new room listing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Images</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          field.onChange([...field.value, ...files]);
                          const newPreviews = files.map((file) => ({
                            file,
                            preview: URL.createObjectURL(file),
                          }));
                          setImagePreviews((prev) => [...prev, ...newPreviews]);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Upload clear images of the room. You can select multiple files.
                    </FormDescription>
                    <FormMessage />
                    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <Image
                            src={preview.preview}
                            alt={`Room preview ${index + 1}`}
                            width={200}
                            height={150}
                            className="rounded-lg object-cover w-full h-[150px]"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6"
                            onClick={() => handleImageDelete(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </FormItem>
                )}
              />
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Cozy Studio in Downtown" {...field} />
                      </FormControl>
                      <FormDescription>
                        Choose a descriptive name for your room.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select room type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="studio">Studio</SelectItem>
                          <SelectItem value="1br">1 Bedroom</SelectItem>
                          <SelectItem value="2br">2 Bedroom</SelectItem>
                          <SelectItem value="loft">Loft</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Price (Rp)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="500000"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Jakarta Pusat" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your room and its surroundings..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="facilities"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facilities</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="AC, WiFi, Water Heater, etc..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Add Room
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

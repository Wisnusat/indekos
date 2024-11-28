import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
      <h2 className="mt-4 text-2xl font-semibold text-gray-700">Loading...</h2>
      <p className="mt-2 text-gray-500">Please wait while we fetch your content.</p>
    </div>
  )
}

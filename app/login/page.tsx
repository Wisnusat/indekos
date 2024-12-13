'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import axiosInstance from '@/lib/axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const loginSchema = z.object({
    email: z.string().email({ message: "Email tidak valid" }),
    no_telepon: z.string().regex(/^(\+62|62|0)/, { message: "Nomor telepon tidak valid" }),
    password: z.string(),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
    const router = useRouter()
    const [step, setStep] = useState<'role' | 'login'>('role')
    const [selectedRole, setSelectedRole] = useState<'seeker' | 'owner' | null>(null)
    const [isSubmitting, setIsSubmit] = useState<boolean>(false)

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            no_telepon: '',
            password: '',
        },
    })

    const onSubmit = async (values: LoginFormValues) => {
        setIsSubmit(true)
        const endpoint = selectedRole == 'seeker' ? '/login-penyewa' : '/login-pemilik-kos'
        const response = await axiosInstance.post(endpoint, values)
        if (response.status === 200) {
            localStorage.setItem("isLogged", `true-${selectedRole}-${values?.email}`)
            toast.success(response?.data?.message, {
                duration: 1000,
                onAutoClose: () => selectedRole === 'seeker' ? router.push('/') : router.push('/owner/requests')
            })
        } else {
            toast.error(response?.data?.message || "Error ocurred, please try again", {
                duration: 1000,
            })
        }
        setIsSubmit(false)
    }

    return (
        <>
            <div className="min-h-screen flex">
                {/* Left side - Illustration */}
                <div className="hidden lg:flex lg:w-1/2 bg-gray-100 items-center justify-center p-12">
                    <img
                        src="/login.svg"
                        alt="Login illustration"
                        className="max-w-md w-full"
                    />
                </div>

                {/* Right side - Login form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                    <Card className="w-full max-w-md">
                        <CardContent className="p-6">
                            <AnimatePresence mode="wait">
                                {step === 'role' ? (
                                    <motion.div
                                        key="role"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-6"
                                    >
                                        <h1 className="text-2xl font-bold text-center">Masuk Sebagai</h1>
                                        <div className="space-y-4">
                                            <Button
                                                variant="outline"
                                                size="lg"
                                                className="w-full h-12 text-lg"
                                                onClick={() => {
                                                    setSelectedRole('seeker')
                                                    setStep('login')
                                                }}
                                            >
                                                Pencari Kos
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="lg"
                                                className="w-full h-12 text-lg"
                                                onClick={() => {
                                                    setSelectedRole('owner')
                                                    setStep('login')
                                                }}
                                            >
                                                Pemilik kos
                                            </Button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="login"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <button
                                                onClick={() => setStep('role')}
                                                className="text-gray-500 hover:text-gray-700 transition-colors"
                                            >
                                                <ArrowLeft size={20} />
                                            </button>
                                            <h1 className="text-2xl font-bold">
                                                {selectedRole === 'seeker' ? 'Pencari Kos' : 'Pemilik Kos'} Login
                                            </h1>
                                        </div>
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input
                                                                    type="email"
                                                                    placeholder="Masukkan email"
                                                                    className="h-12"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="no_telepon"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input
                                                                    type="tel"
                                                                    placeholder="Masukkan nomor telepon"
                                                                    className="h-12"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="password"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input
                                                                    type="password"
                                                                    placeholder="Masukan password"
                                                                    className="h-12"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <Button
                                                    disabled={isSubmitting}
                                                    type="submit"
                                                    className="w-full h-12 text-lg bg-[#5046E5]"
                                                >
                                                    {isSubmitting ? <Loader2 className="animate-spin text-primary" /> : "Login"}
                                                </Button>
                                            </form>
                                        </Form>
                                        <div className="text-center space-y-2">
                                            <p className="text-gray-600">Belum punya akun?</p>
                                            <Link href="/signup">
                                                <Button
                                                    variant="link"
                                                    className="text-primary hover:text-primary/80"
                                                >
                                                    Daftar sekarang
                                                </Button>
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}


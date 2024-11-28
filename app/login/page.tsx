'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
    const [step, setStep] = useState<'role' | 'login'>('role')
    const [selectedRole, setSelectedRole] = useState<'seeker' | 'owner' | null>(null)

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
                                        <div className="space-y-4">
                                            <Input
                                                type="email"
                                                placeholder="Masukkan email"
                                                className="h-12"
                                            />
                                            <Input
                                                type="password"
                                                placeholder="Masukan password"
                                                className="h-12"
                                            />
                                            <Button
                                                className="w-full h-12 text-lg bg-[#5046E5]"
                                            >
                                                Login
                                            </Button>
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


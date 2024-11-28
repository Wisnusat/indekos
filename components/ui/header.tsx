'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, User, LogOut, LayoutDashboard, Home, Bookmark } from 'lucide-react'

function Header() {
    const router = useRouter()
    const pathname = usePathname()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState('')

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token')
        if (accessToken) {
            setIsLoggedIn(true)
            setUsername('John Doe')
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        setIsLoggedIn(false)
        setUsername('')
        router.push('/')
    }

    const isActive = (path: string) => {
        if (path === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(path) && pathname !== '/';
    };

    const menuItems = [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard },
        { name: 'Room List', path: '/room-list', icon: Home },
        { name: 'Bookmarks', path: '/bookmarks', icon: Bookmark },
    ]

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-[#5046E5]">
            <div className="text-white text-2xl font-bold cursor-pointer" onClick={() => router.push("/")}>Indekos</div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-4">
                {menuItems.map((item) => (
                    <Link href={item.path} key={item.name}>
                        <Button
                            variant="ghost"
                            className={`text-white hover:text-white hover:bg-[#6357FF] ${isActive(item.path) ? 'bg-[#6357FF]' : ''}`}
                        >
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.name}
                        </Button>
                    </Link>
                ))}
                {isLoggedIn ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/placeholder.svg" alt={username} />
                                    <AvatarFallback>{username.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuItem className="font-normal">
                                <span>{username}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => router.push('/profile')}>
                                <User className="mr-2 h-4 w-4" />
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <>
                        <Link href="/login">
                            <Button className="bg-[#F5F7FF] text-[#5046E5] px-4 py-1 rounded-full hover:text-white">
                                Log In
                            </Button>
                        </Link>
                        <Link href="/signup">
                            <Button className="bg-[#5046E5] text-white px-4 py-1 rounded-full border border-white">
                                Sign Up
                            </Button>
                        </Link>
                    </>
                )}
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" className="px-0 text-white">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                        <nav className="flex flex-col gap-4">
                            {menuItems.map((item) => (
                                <Link href={item.path} key={item.name}>
                                    <Button
                                        variant="ghost"
                                        className={`w-full justify-start ${isActive(item.path) ? 'bg-[#6357FF] text-white' : ''}`}
                                    >
                                        <item.icon className="mr-2 h-4 w-4" />
                                        {item.name}
                                    </Button>
                                </Link>
                            ))}
                            {isLoggedIn ? (
                                <>
                                    <div className="flex items-center gap-4 mb-4">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src="/placeholder.svg" alt={username} />
                                            <AvatarFallback>{username.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span>{username}</span>
                                    </div>
                                    <Link href="/profile">
                                        <Button variant="ghost" className="w-full justify-start">
                                            <User className="mr-2 h-4 w-4" />
                                            Profile
                                        </Button>
                                    </Link>
                                    <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Log out
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login">
                                        <Button className="w-full bg-[#F5F7FF] text-[#5046E5] hover:text-white">
                                            Log In
                                        </Button>
                                    </Link>
                                    <Link href="/signup">
                                        <Button className="w-full bg-[#5046E5] text-white border border-white">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    )
}

export default Header


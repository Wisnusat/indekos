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
import { toast } from 'sonner'

function Header() {
    const router = useRouter()
    const pathname = usePathname()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState('')
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
    const [role, setRole] = useState('seeker')

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isLogged = localStorage.getItem('isLogged')
            if (isLogged) {
                setIsLoggedIn(true)
                setUsername(isLogged.split("-")[2] || "John Doe")
                setRole(isLogged.split("-")[1])
            }
        }
    }, [pathname])

    const handleLogout = () => {
        toast.success("Logout Success", {
            duration: 1000,
            onAutoClose: () => {
                localStorage.removeItem('isLogged')
                setIsLoggedIn(false)
                setUsername('')
                router.push('/')
                setRole('seeker')
                setIsMobileNavOpen(false)
            }
        })
    }

    const handleNavigation = (path: string) => {
        router.push(path)
        setIsMobileNavOpen(false)
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

    const menuItemsOwner = [
        { name: 'Requests List', path: '/owner/requests', icon: LayoutDashboard },
        { name: 'Add Room', path: '/owner/rooms/add', icon: Home },
    ]

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-[#5046E5]">
            <div className="text-white text-2xl font-bold cursor-pointer" onClick={() => router.push("/")}>Indekos</div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-4">
                {role === 'seeker' ? menuItems.map((item) => (
                    <Link href={item.path} key={item.name}>
                        <Button
                            variant="ghost"
                            className={`text-white hover:text-white hover:bg-[#6357FF] ${isActive(item.path) ? 'bg-[#6357FF]' : ''}`}
                        >
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.name}
                        </Button>
                    </Link>
                )) : menuItemsOwner.map((item) => (
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
                <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" className="px-0 text-white">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                        {isLoggedIn && (
                            <>
                                <div className="flex items-center gap-4 mb-4">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="/placeholder.svg" alt={username} />
                                        <AvatarFallback>{username.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span>{username}</span>
                                </div>
                                <Link href="/profile">
                                    <Button variant="ghost" className="w-full justify-start mb-4">
                                        <User className="mr-2 h-4 w-4" />
                                        Profile
                                    </Button>
                                </Link>
                            </>
                        )}
                        <nav className="flex flex-col gap-4">
                            {menuItems.map((item, index) => (
                                <Button
                                    key={index}
                                    variant="ghost"
                                    className={`w-full justify-start ${isActive(item.path) ? 'bg-[#6357FF] text-white' : ''}`}
                                    onClick={() => handleNavigation(item.path)}
                                >
                                    <item.icon className="mr-2 h-4 w-4" />
                                    {item.name}
                                </Button>
                            ))}
                            {isLoggedIn && (
                                <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </Button>
                            )}
                            {!isLoggedIn &&
                                <>

                                    <Button className="w-full bg-[#F5F7FF] text-[#5046E5] hover:text-white" onClick={() => handleNavigation("/login")}>
                                        Log In
                                    </Button>
                                    <Button className="w-full bg-[#5046E5] text-white border border-white" onClick={() => handleNavigation("/signup")}>
                                        Sign Up
                                    </Button>
                                </>
                            }
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    )
}

export default Header


"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
  const pathname = usePathname()

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Expenses', href: '/expense', icon: '💸' },
    { name: 'Income', href: '/income', icon: '💰' },
    { name: 'Settings', href: '/settings', icon: '⚙️' },
  ]

  return (
    <aside className="w-64 bg-card-background shadow-sm ">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-foreground">Menu</h2>
      </div>
      <nav className="px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-full transition-colors ${
                  pathname === item.href
                    ? 'bg-paper-background text-secondary  '
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
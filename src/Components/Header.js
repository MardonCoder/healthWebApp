import React from 'react'

export default function Header() {
  return (
    <header>
        <div>
            <span className='logo'>SafeBite</span>
            <ul className='nav'>
                <li>Notifications</li>
                <li>Profile</li>
            </ul>
        </div>
        <div className='presentation'></div>
    </header>
  )
}

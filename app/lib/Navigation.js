"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [setLogin, setIsLogin] = useState(false);
  const [setRegister, setIsRegister] = useState(false);
  const [setHome, setIsHome] = useState(false);

  const styleLogin = {
    textDecoration: 'none',
    color: setLogin ? '#90EE90' : 'white', // Change color on hover
  };

  const styleRegister = {
    textDecoration: 'none',
    color: setRegister ? '#90EE90' : 'white', // Change color on hover
  };

  const styleHome = {
    fontSize: '1.5rem',
    textDecoration: 'none',
    color: setHome ? '#90EE90' : 'white', // Change color on hover
  };



  return (
    <div className="w-full h-12 bg-emerald-800 sticky top-0">
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full text-white">

          <ul>
            <li>
              <Link href="/" style={styleHome} 
                  onMouseEnter={() => setIsHome(true)}
                  onMouseLeave={() => setIsHome(false)}
                  className={`link ${pathname === '/' ? 'active' : ''}`}>
                Support Worker
              </Link>
            </li>
          </ul>


          <ul className="hidden md:flex pt-2 gap-x-10">
            <li>
              <Link href="/login" style={styleLogin}  
               onMouseEnter={() => setIsLogin(true)}
               onMouseLeave={() => setIsLogin(false)}>
                Login
              </Link>
            </li>
            <li>
              <Link href="/registeruser" style={styleRegister} 
               onMouseEnter={() => setIsRegister(true)}
               onMouseLeave={() => setIsRegister(false)}>
                Register
              </Link>
            </li>
          </ul>


        </div>
      </div>
    </div>
  );
}
// pages/logout.js
"use client"
import { useEffect } from 'react';
import {useRouter} from 'next/navigation';
import { destroyCookie } from 'nookies';

export default function Logout() {
    const router = useRouter();
    const onConfirm = () => {
        destroyCookie(null, 'authToken');
        router.push('/login');
    }
    const onClose = () => {
    // const redirectPath = router.back() || '/';
    // alert(JSON.stringify(router.back()));
    router.push("/dashboard");
    }
  // Render a message or loader while waiting for the confirmation
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <p>Are you sure you want to logout?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 rounded text-white bg-gray-500">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded text-white bg-red-500">Logout</button>
        </div>
      </div>
    </div>
  );
}

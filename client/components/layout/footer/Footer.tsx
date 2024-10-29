"use client"
import { Button } from '@/components/ui/button';
import React from 'react';
import { ArrowUp } from 'lucide-react';

const toTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const Footer = () => {
  return (
    <footer className='w-full h-[500px]'>
        <div className='w-[80vw] m-auto'>
            <div className='w-full h-16 '>
                <div className='m-auto flex justify-center items-center py-3'>
                    <Button variant="ghost" onClick={toTop}>
                        Back to top <span><ArrowUp /></span>
                    </Button>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;

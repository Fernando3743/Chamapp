'use client'

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute w-[600px] h-[600px] -top-[300px] -right-[200px] rounded-full bg-primary-gradient opacity-50 blur-[100px] animate-float"></div>
      <div className="absolute w-[400px] h-[400px] -bottom-[200px] -left-[100px] rounded-full bg-secondary-gradient opacity-50 blur-[100px] animate-float delay-[5s]"></div>
      <div className="absolute w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-tertiary-gradient opacity-50 blur-[100px] animate-float delay-[10s]"></div>
    </div>
  )
}
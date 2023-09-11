"use client";

import { useRTCProvider } from "~/app/_components/providers/RTCProvider";
import { useEffect, useMemo, useRef } from "react";

export default function Room({ params }: { params: { roomId: string } }) {
  const { startCapture, localStream } = useRTCProvider();
  const streamRef = useRef<HTMLVideoElement | null>(null);

  useMemo(() => {
    console.log("Starting Capture");
    if (startCapture) {
      startCapture();
    }
  }, []);
  useEffect(() => {
    console.log("localStream", localStream);
    if (!streamRef?.current) return;
    streamRef.current.srcObject = localStream;
  }, [localStream]);
  return (
    <div className="flex-col h-full">
      <video className="w-full h-full" autoPlay ref={streamRef} />
      <div className="flex flex-col h-full justify-between"></div>
    </div>
  );
}

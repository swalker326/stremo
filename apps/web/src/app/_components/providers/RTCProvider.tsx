"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback
} from "react";
import { useSocket } from "./socketProvider";

type RTCContextType = {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  startCapture: () => void;
};

const RTCProviderContext = createContext<RTCContextType>({} as RTCContextType);

export const useRTCProvider = (): RTCContextType => {
  const context = useContext(RTCProviderContext);
  if (!context) {
    throw new Error("useRTCProvider must be used within a RTCProvider");
  }
  return context;
};

const RTCProvider = ({ children }: { children: React.ReactNode }) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);

  const { socket } = useSocket();
  const createOffer = async () => {
    if (!peerConnection.current) throw new Error("Peer connection is null");
    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);
    if (!offer) throw new Error("Offer is null");
    // Send offer to remote peer via the socket
    socket.emit("send-offer", offer);
  };

  const startCapture = useCallback(async () => {
    console.log("!!Starting local capture");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      setLocalStream(stream);
      console.log("set local stream", stream);
      // TODO: Normally you'd pass this stream to an RTCPeerConnection here
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  }, []);
  useEffect(() => {
    console.log("socket connected");
    if (!socket?.on) return;
    // Creating a new peer connection instance
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" } // using Google's public STUN server
      ]
    });

    // Handle tracks: when a remote user adds a track to the peer connection, this will trigger
    pc.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };

    // TODO: Add other event listeners like handling ICE candidate events

    // Setting the state variable
    peerConnection.current = pc;

    return () => {
      // Close the peer connection when component is unmounted
      pc.close();
    };
  }, [socket]);

  useEffect(() => {
    if (!socket?.on) return;
    console.log("socket connected");
    const handleRemoteOffer = async (offer: RTCSessionDescriptionInit) => {
      if (!peerConnection?.current) throw new Error("Peer connection is null");
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      if (!answer) throw new Error("Answer is null");
      // Send answer back to the remote peer via the socket
      socket.emit("send-answer", answer);
    };

    const handleRemoteAnswer = async (answer: RTCSessionDescriptionInit) => {
      if (!peerConnection?.current) throw new Error("Peer connection is null");
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
    };
    // When an offer is received
    socket.on("receive-offer", async (offer: RTCSessionDescriptionInit) => {
      handleRemoteOffer(offer);
    });

    // When an answer is received
    socket.on("receive-answer", async (answer) => {
      handleRemoteAnswer(answer);
    });

    // Cleanup listeners on unmount
    return () => {
      socket.off("receive-offer");
      socket.off("receive-answer");
    };
  }, [socket, peerConnection]);

  return (
    <RTCProviderContext.Provider
      value={{ localStream, remoteStream, startCapture }}
    >
      {children}
    </RTCProviderContext.Provider>
  );
};

export default RTCProvider;

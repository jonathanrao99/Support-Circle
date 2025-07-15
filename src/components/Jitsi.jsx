import React, { useState, useEffect } from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export const Jitsi = ({ room }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use environment variable for domain or fallback to a secure default
  const jitsiDomain = process.env.REACT_APP_JITSI_DOMAIN || "meet.jit.si";
  const displayName = localStorage.getItem("userDisplayName") || "Anonymous";

  useEffect(() => {
    // Validate room parameter
    if (!room && !id) {
      setError("Invalid room configuration");
      toast.error("Unable to join meeting room");
      return;
    }

    setIsLoading(false);
  }, [room, id]);

  const handleApiReady = (externalApi) => {
    console.log("Jitsi API is ready");
    // Store API reference for potential future use
    window.jitsiApi = externalApi;
  };

  const handleReadyToClose = () => {
    toast.success("Meeting ended successfully");
    navigate("/");
  };

  const handleError = (error) => {
    console.error("Jitsi error:", error);
    setError("Failed to load video conference");
    toast.error("Unable to load video conference");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <span className="ml-3 text-gray-600">Loading video conference...</span>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8"
      >
        <div className="text-error-600 mb-4">
          <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Connection Error</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          Try Again
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="jitsi-container bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <JitsiMeeting
        domain={jitsiDomain}
        roomName={room || `support-circle-${id}`}
        configOverwrite={{
          startWithAudioMuted: true,
          startWithVideoMuted: false,
          disableModeratorIndicator: true,
          startScreenSharing: true,
          enableEmailInStats: false,
          prejoinPageEnabled: true,
          prejoinConfig: {
            enabled: true,
            hideGuestDialOut: true,
            hideDialOutEnabled: true,
          },
          toolbarButtons: [
            'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
            'fodeviceselection', 'hangup', 'chat', 'recording',
            'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
            'videoquality', 'filmstrip', 'feedback', 'stats', 'shortcuts',
            'tileview', 'videobackgroundblur', 'download', 'mute-everyone', 'security'
          ],
        }}
        interfaceConfigOverwrite={{
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          SHOW_POWERED_BY: false,
          TOOLBAR_BUTTONS: [
            'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
            'fodeviceselection', 'hangup', 'chat', 'recording',
            'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
            'videoquality', 'filmstrip', 'feedback', 'stats', 'shortcuts',
            'tileview', 'videobackgroundblur', 'download', 'mute-everyone', 'security'
          ],
        }}
        userInfo={{
          displayName,
          email: localStorage.getItem("userEmail") || "",
        }}
        onReadyToClose={handleReadyToClose}
        onApiReady={handleApiReady}
        onError={handleError}
        getIFrameRef={(iframeRef) => {
          if (iframeRef) {
            iframeRef.style.height = "70vh";
            iframeRef.style.width = "100%";
            iframeRef.style.borderRadius = "0.5rem";
          }
        }}
      />
    </motion.div>
  );
};

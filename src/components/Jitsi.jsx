import React from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { useNavigate, useParams } from "react-router-dom";

export const Jitsi = ({ room }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const displayName = "Anonymous";

  return (
    <div className="jitsi-container">
      <JitsiMeeting
        domain={"jitsi.zoheb.me"}
        roomName={room}
        configOverwrite={{
          startWithAudioMuted: true,
          disableModeratorIndicator: true,
          startScreenSharing: true,
          enableEmailInStats: false,
        }}
        interfaceConfigOverwrite={{
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,
        }}
        userInfo={{
          displayName,
        }}
        onReadyToClose={() => navigate("/")}
        onApiReady={(externalApi) => {
          // here you can attach custom event listeners to the Jitsi Meet External API
          // you can also store it locally to execute commands
        }}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = "55.5vh";
          iframeRef.style.width = "70vw";
        }}
      />
    </div>
  );
};

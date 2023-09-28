import React from 'react';
import { Jitsi } from "./Jitsi";

function Video() {
  const urlParams = new
  URLSearchParams(window.location.search);
  const roomParam = urlParams.get('room')
  return (
    <div className="confirmation-page">
  <h1>Booking Confirmed</h1>
  <p>Your appointment has been scheduled.</p>
  <Jitsi room={roomParam} />
  </div>
  );
}

export default Video;


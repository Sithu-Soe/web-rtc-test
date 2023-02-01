// const iceConfiguration = {
//     iceServers: [{
//         urls:
//             'turn: turnserver.company.com:3478',
//         username: 'optional-username',
//         credentials: 'auth-token'
//     },
//     {
//         urls: "stun: stun.services.mozilla.com",
//         username: "test@mozilla.com",
//         credential: "webrtcdemo"
//     }
//     ]
// }
// const pc = new RTCPeerConnection(configuration);

const lc = new RTCPeerConnection()

const dc = lc.createDataChannel("channel")

dc.onmessage = e => {
    console.log("Just got a message " + e.data)
}

dc.onopen = e => {
    console.log("Connection opened!")
}

lc.onicecandidate = e => {
    console.log("New Ice Candidate! reprinting SDP" + JSON.stringify(lc.localDescription))
}

lc.createOffer().then(o => lc.setLocalDescription(o)).then(a => console.log("set successfully!"))


// SIgnaling Part 2

const answer = { "type": "answer", "sdp": "v=0\r\no=- 5064034765766831102 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 38562 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 172.21.0.1\r\na=candidate:2320208683 1 udp 2122260223 172.21.0.1 38562 typ host generation 0 network-id 1\r\na=candidate:4132884386 1 udp 2122194687 172.16.20.21 43688 typ host generation 0 network-id 2\r\na=ice-ufrag:B/yG\r\na=ice-pwd:wWX4TKP5EDfcmxJcJ/6kUAS0\r\na=ice-options:trickle\r\na=fingerprint:sha-256 4F:3C:A1:4F:99:B8:1A:8C:9E:4A:57:77:3D:3E:5E:7E:F3:AE:00:74:DB:69:C3:A3:2C:4A:BA:B2:84:14:E6:AC\r\na=setup:active\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n" }

lc.setRemoteDescription(answer)


// Send message PART 3
dc.send("Yo waht up, dude")


// For video use like that
localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

localStream.getTracks().forEach((track) => {
    lc.addTrack(track, localStream)
})
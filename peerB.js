const offer = {"type":"offer","sdp":"v=0\r\no=- 2125673376928414527 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 51647 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 172.21.0.1\r\na=candidate:4136606486 1 udp 2122260223 172.21.0.1 51647 typ host generation 0 network-id 1\r\na=candidate:2324875167 1 udp 2122194687 172.16.20.21 37934 typ host generation 0 network-id 2\r\na=candidate:136662914 1 tcp 1518280447 172.21.0.1 9 typ host tcptype active generation 0 network-id 1\r\na=candidate:1949831947 1 tcp 1518214911 172.16.20.21 9 typ host tcptype active generation 0 network-id 2\r\na=ice-ufrag:ZUir\r\na=ice-pwd:br997Y2h3p530PYT/oGbCRb1\r\na=ice-options:trickle\r\na=fingerprint:sha-256 BE:2B:E4:A4:B0:51:4C:5B:7B:B1:16:C0:CB:20:75:FC:89:AF:EA:70:D7:5B:CE:9E:C7:E6:8E:B3:F5:ED:B3:D7\r\na=setup:actpass\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n"}

const rc = new RTCPeerConnection()

rc.onicecandidate = e => {
    console.log("New Ice Candidate! reprinting SDP" + JSON.stringify(rc.localDescription))
}

rc.ondatachannel = e => {
    rc.dc = e.channel;
    rc.dc.onmessage = e => console.log("new message from client! " + e.data)
    rc.dc.onopen = e => console.log("Connection OPENED!!!!!")
}

rc.setRemoteDescription(offer).then(a => console.log("offer set!"))

rc.createAnswer().then(a => rc.setLocalDescription(a)).then(a => console.log("answer created!"))

// sending message PART 2
rc.dc.send("I'm good, homie")

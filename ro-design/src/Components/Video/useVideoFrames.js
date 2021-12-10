import React, { useEffect, useRef, useState } from "react";



const useVideoFrames = (frameCallback = (videoTime, frameId) => { console.log(frameId) } ) => {
    const [video, setVideo] = useState(null);

    const callbackRef = useRef(frameCallback);
    callbackRef.current = frameCallback;

    useEffect(() => {
        if (!video) {console.log('there is no vid');return};
        setVideo(video)
        let frameId;
        let requestFrame = requestAnimationFrame;
        let cancelFrame = cancelAnimationFrame;
        if ("requestVideoFrameCallback" in HTMLVideoElement.prototype) {
            // https://web.dev/requestvideoframecallback-rvfc/

            requestFrame = video.requestVideoFrameCallback.bind(video);
            cancelFrame = video.cancelVideoFrameCallback.bind(video);
        }

        const callbackFrame = (now, metadata) => {
            const videoTime = metadata?.mediaTime ?? video.currentTime;
            // This line used to be here but i moved it to get the current frame
            // callbackRef.current(videoTime);
            frameId = requestFrame(callbackFrame);
            callbackRef.current(videoTime, frameId);
        };

        const eventListeners = {
            loadeddata() {
                requestAnimationFrame(() => callbackRef.current(video.currentTime));
            },
            play() {
                frameId = requestFrame(callbackFrame);
            },
            pause() {
                cancelFrame(frameId ?? 0);
                frameId = null;
            },
            timeupdate() {
                if (!frameId) {
                    requestAnimationFrame(() => callbackRef.current(video.currentTime));
                }
            },
        };

        Object.keys(eventListeners).forEach((eventName) => {
            const eventListener =
                eventListeners[eventName];
            if (eventListener != null) {
                video.addEventListener(eventName, eventListener);
            }
        });

        return () => {
            cancelFrame(frameId ?? 0);

            Object.keys(eventListeners).forEach((eventName) => {
                const eventListener =
                    eventListeners[eventName];
                if (eventListener != null) {
                    video.removeEventListener(eventName, eventListener);
                }
            });
        };
    }, [video]);

    return [video, setVideo];
};

export default useVideoFrames;